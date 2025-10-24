/**
 * Enhanced file upload hook using GitHub storage with 100kb limit
 */

import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { uploadMultipleFiles, deleteMultipleFiles } from '../lib/github.jsx';
import { useErrorHandler } from './useErrorHandler';
import { ApiError } from '../types';

interface FileUploadState {
  loading: boolean;
  progress: number;
  error: ApiError | null;
  uploadedFiles: UploadedFile[];
}

interface UploadedFile {
  name: string;
  url: string;
  githubPath: string;
  size: number;
  type: string;
}

interface UseFileUploadOptions {
  maxSizeKB?: number;
  allowedTypes?: string[];
  category?: string;
  showErrorToast?: boolean;
  onSuccess?: (files: UploadedFile[]) => void;
  onError?: (error: ApiError) => void;
  onProgress?: (progress: number) => void;
}

const DEFAULT_MAX_SIZE_KB = 100; // 100kb limit
const DEFAULT_ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
  'text/plain',
  'application/json'
];

export const useFileUpload = (options: UseFileUploadOptions = {}) => {
  const {
    maxSizeKB = DEFAULT_MAX_SIZE_KB,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
    category = 'uploads',
    showErrorToast = true,
    onSuccess,
    onError,
    onProgress
  } = options;

  const [state, setState] = useState<FileUploadState>({
    loading: false,
    progress: 0,
    error: null,
    uploadedFiles: [],
  });

  const { handleError } = useErrorHandler({
    toastType: showErrorToast ? 'always' : 'never',
    onError,
  });

  const validateFile = useCallback((file: File): string | null => {
    // Check file size (convert KB to bytes)
    const maxSizeBytes = maxSizeKB * 1024;
    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxSizeKB}KB. Current size: ${Math.round(file.size / 1024)}KB`;
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`;
    }

    return null;
  }, [maxSizeKB, allowedTypes]);

  const validateFiles = useCallback((files: File[]): { valid: File[]; errors: string[] } => {
    const valid: File[] = [];
    const errors: string[] = [];

    files.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        valid.push(file);
      }
    });

    return { valid, errors };
  }, [validateFile]);

  const uploadFiles = useCallback(async (files: File[]): Promise<UploadedFile[]> => {
    setState(prev => ({ ...prev, loading: true, progress: 0, error: null }));

    try {
      // Validate files
      const { valid, errors } = validateFiles(files);
      
      if (errors.length > 0) {
        const errorMessage = `File validation failed:\n${errors.join('\n')}`;
        throw new Error(errorMessage);
      }

      if (valid.length === 0) {
        throw new Error('No valid files to upload');
      }

      // Upload files using GitHub
      const results = await uploadMultipleFiles(valid, category);
      
      // Process results
      const uploadedFiles: UploadedFile[] = [];
      const uploadErrors: string[] = [];

      results.forEach((result, index) => {
        if (result.error) {
          uploadErrors.push(`${result.name}: ${result.error}`);
        } else if (result.url) {
          uploadedFiles.push({
            name: result.name,
            url: result.url,
            githubPath: result.githubPath || '',
            size: valid[index]?.size || 0,
            type: valid[index]?.type || '',
          });
        }
      });

      if (uploadErrors.length > 0) {
        const errorMessage = `Some files failed to upload:\n${uploadErrors.join('\n')}`;
        throw new Error(errorMessage);
      }

      setState({
        loading: false,
        progress: 100,
        error: null,
        uploadedFiles,
      });

      if (onSuccess) {
        onSuccess(uploadedFiles);
      }

      if (showErrorToast) {
        toast.success(`Successfully uploaded ${uploadedFiles.length} file(s)`);
      }

      return uploadedFiles;

    } catch (error: unknown) {
      const apiError = handleError(error);
      
      setState({
        loading: false,
        progress: 0,
        error: apiError,
        uploadedFiles: [],
      });

      return [];
    }
  }, [category, validateFiles, handleError, onSuccess, showErrorToast]);

  const uploadSingleFile = useCallback(async (file: File): Promise<UploadedFile | null> => {
    const results = await uploadFiles([file]);
    return results[0] || null;
  }, [uploadFiles]);

  const deleteFiles = useCallback(async (filePaths: Array<{ githubPath: string }>): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const results = await deleteMultipleFiles(filePaths);
      
      const failures = results.filter(r => !r.success);
      if (failures.length > 0) {
        const errorMessage = `Failed to delete some files:\n${failures.map(f => f.filePath).join('\n')}`;
        throw new Error(errorMessage);
      }

      setState(prev => ({
        ...prev,
        loading: false,
        uploadedFiles: prev.uploadedFiles.filter(
          file => !filePaths.some(path => path.githubPath === file.githubPath)
        ),
      }));

      if (showErrorToast) {
        toast.success(`Successfully deleted ${results.length} file(s)`);
      }

      return true;

    } catch (error: unknown) {
      const apiError = handleError(error);
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: apiError,
      }));

      return false;
    }
  }, [handleError, showErrorToast]);

  const reset = useCallback(() => {
    setState({
      loading: false,
      progress: 0,
      error: null,
      uploadedFiles: [],
    });
  }, []);

  const getFileUrl = useCallback((githubPath: string): string => {
    const owner = import.meta.env.VITE_GITHUB_OWNER || 'your-username';
    const repo = import.meta.env.VITE_GITHUB_REPO || 'your-repo';
    const branch = import.meta.env.VITE_GITHUB_BRANCH || 'main';
    return `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${githubPath}`;
  }, []);

  return {
    ...state,
    uploadFiles,
    uploadSingleFile,
    deleteFiles,
    reset,
    validateFile,
    validateFiles,
    getFileUrl,
    // Utility functions
    maxSizeKB,
    allowedTypes,
    category,
  };
};

// Utility function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Utility function to check if file is an image
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

// Utility function to create file preview URL
export const createFilePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

// Cleanup function for file preview URLs
export const cleanupFilePreview = (url: string): void => {
  URL.revokeObjectURL(url);
};

export default useFileUpload;