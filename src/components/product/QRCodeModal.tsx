import React, { useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { QrCodeIcon, DownloadIcon, ShareIcon, XIcon } from 'lucide-react';

interface QRCodeModalProps {
  data: string;
  size?: number;
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  data,
  size = 200,
  title = 'QR Code',
  description,
  isOpen,
  onClose,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple QR code generation (you might want to use a library like 'qrcode' for production)
  const generateQRCode = useCallback((text: string, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Simple pattern generation (placeholder - use a real QR library in production)
    const moduleSize = size / 25; // 25x25 grid
    ctx.fillStyle = '#000000';

    // Generate a simple pattern based on the text
    const hash = text.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);

    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        const shouldFill = (hash + i * j) % 3 === 0;
        if (shouldFill) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
        }
      }
    }

    // Add corner squares (QR code markers)
    const markerSize = moduleSize * 7;
    const positions = [
      [0, 0],
      [size - markerSize, 0],
      [0, size - markerSize],
    ];

    positions.forEach(([x, y]) => {
      // Outer square
      ctx.fillStyle = '#000000';
      ctx.fillRect(x, y, markerSize, markerSize);
      // Inner white square
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + moduleSize, y + moduleSize, markerSize - 2 * moduleSize, markerSize - 2 * moduleSize);
      // Center black square
      ctx.fillStyle = '#000000';
      ctx.fillRect(x + 2 * moduleSize, y + 2 * moduleSize, markerSize - 4 * moduleSize, markerSize - 4 * moduleSize);
    });
  }, [size]);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      generateQRCode(data, canvasRef.current);
    }
  }, [data, size, isOpen]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `qr-code-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const handleShare = async () => {
    if (navigator.share && canvasRef.current) {
      try {
        canvasRef.current.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], 'qr-code.png', { type: 'image/png' });
            await navigator.share({
              title: title,
              text: description || 'Check out this QR code',
              files: [file],
            });
          }
        });
      } catch (error) {
        console.error('Error sharing QR code:', error);
      }
    } else {
      // Fallback: copy to clipboard
      if (canvasRef.current) {
        canvasRef.current.toBlob(async (blob) => {
          if (blob) {
            try {
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
              ]);
              alert('QR code copied to clipboard!');
            } catch (error) {
              console.error('Error copying to clipboard:', error);
            }
          }
        });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={`bg-white rounded-lg p-6 max-w-sm w-full ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <QrCodeIcon size={24} className="text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm mb-4">{description}</p>
        )}

        {/* QR Code */}
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
            <canvas
              ref={canvasRef}
              className="block"
              style={{ width: size, height: size }}
            />
          </div>
        </div>

        {/* Data Display */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Data:</p>
          <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded break-all">
            {data}
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            <DownloadIcon size={16} />
            <span>Download</span>
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            <ShareIcon size={16} />
            <span>Share</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};