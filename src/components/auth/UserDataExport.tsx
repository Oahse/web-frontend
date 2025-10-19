import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { DownloadIcon, FileTextIcon, TableIcon, CodeIcon } from 'lucide-react';

interface UserDataExportProps {
  onExport: (format: 'csv' | 'excel' | 'json') => Promise<void>;
  loading?: boolean;
}

const exportFormats = [
  {
    value: 'csv',
    label: 'CSV (Comma Separated Values)',
    description: 'Best for spreadsheet applications like Excel or Google Sheets',
    icon: <TableIcon size={20} />
  },
  {
    value: 'excel',
    label: 'Excel (.xlsx)',
    description: 'Native Excel format with formatting support',
    icon: <FileTextIcon size={20} />
  },
  {
    value: 'json',
    label: 'JSON (JavaScript Object Notation)',
    description: 'Machine-readable format for developers and APIs',
    icon: <CodeIcon size={20} />
  }
];

export const UserDataExport: React.FC<UserDataExportProps> = ({
  onExport,
  loading = false
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'excel' | 'json'>('csv');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport(selectedFormat);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const selectedFormatInfo = exportFormats.find(f => f.value === selectedFormat);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Export Your Data
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Download a copy of your personal data in your preferred format. This includes your profile information, addresses, preferences, and account history.
        </p>
      </div>

      <div className="space-y-6">
        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Export Format
          </label>
          <div className="space-y-3">
            {exportFormats.map((format) => (
              <div
                key={format.value}
                className={`relative rounded-lg border p-4 cursor-pointer transition-colors ${
                  selectedFormat === format.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => setSelectedFormat(format.value)}
              >
                <div className="flex items-start">
                  <input
                    type="radio"
                    name="format"
                    value={format.value}
                    checked={selectedFormat === format.value}
                    onChange={() => setSelectedFormat(format.value)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {format.icon}
                      <span className="font-medium text-gray-900 dark:text-white">
                        {format.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {format.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Included */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Data Included in Export
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Personal information (name, email, phone)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Account preferences and settings
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Saved addresses (billing and shipping)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Social media account connections
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Account creation and update timestamps
              </li>
            </ul>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Privacy Notice
              </h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <p>
                  Your exported data contains sensitive personal information. Please store it securely and avoid sharing it with unauthorized parties. The download link will expire after 24 hours for security purposes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleExport}
            disabled={loading || isExporting}
            className="flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Preparing Export...
              </>
            ) : (
              <>
                <DownloadIcon size={16} />
                Export as {selectedFormatInfo?.label.split(' ')[0]}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};