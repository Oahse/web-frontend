import React, { useState } from 'react';
import { ScanIcon, DownloadIcon, PrinterIcon, CopyIcon, CheckIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BarcodeDisplayProps {
  barcode: string; // base64 encoded barcode
  variant: {
    id: string;
    name: string;
    sku: string;
    product_name?: string;
  };
  format?: 'CODE128' | 'EAN13' | 'UPC';
  size?: 'sm' | 'md' | 'lg';
  showControls?: boolean;
  showSKU?: boolean;
  className?: string;
}

export const BarcodeDisplay: React.FC<BarcodeDisplayProps> = ({
  barcode,
  variant,
  format = 'CODE128',
  size = 'md',
  showControls = true,
  showSKU = true,
  className
}) => {
  const [copied, setCopied] = useState(false);

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  const downloadBarcode = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${barcode}`;
    link.download = `barcode-${variant.sku}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printBarcode = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Barcode - ${variant.name}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 20px; 
              }
              .barcode-container { 
                display: inline-block; 
  border: '1px solid var(--color-border)'; 
                padding: 20px; 
                margin: 20px; 
              }
              .barcode-info { 
                margin-top: 10px; 
                font-size: 14px; 
              }
              img { 
                max-width: 300px; 
                height: auto; 
              }
            </style>
          </head>
          <body>
            <div className="barcode-container">
              <h2>${variant.product_name || 'Product'}</h2>
              <h3>${variant.name}</h3>
              <img src="data:image/png;base64,${barcode}" alt="Barcode" />
              <div className="barcode-info">
                <p><strong>SKU:</strong> ${variant.sku}</p>
                <p><strong>Format:</strong> ${format}</p>
                <p><strong>Variant ID:</strong> ${variant.id}</p>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const copyToClipboard = async () => {
    try {
      // Convert base64 to blob and copy to clipboard
      const response = await fetch(`data:image/png;base64,${barcode}`);
      const blob = await response.blob();
      
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy barcode:', error);
      // Fallback: copy the base64 string
      try {
        await navigator.clipboard.writeText(`data:image/png;base64,${barcode}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackError) {
        console.error('Failed to copy base64 string:', fallbackError);
      }
    }
  };

  if (!barcode) {
    return (
      <div className={cn(
        'flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 p-4',
        className
      )}>
        <div className="text-center">
          <ScanIcon size={24} className="text-gray-400 mx-auto mb-2" />
          <span className="text-xs text-gray-500">No Barcode</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {/* Barcode Image */}
      <div className="relative group bg-white border border-gray-200 rounded-lg p-3">
        <img
          src={`data:image/png;base64,${barcode}`}
          alt={`Barcode for ${variant.name}`}
          className={cn('w-full object-contain', sizeClasses[size])}
        />
        
        {/* SKU Text */}
        {showSKU && (
          <div className="text-center mt-2">
            <span className="text-xs font-mono text-gray-600">{variant.sku}</span>
          </div>
        )}
        
        {/* Hover overlay with info */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
          <div className="text-white text-center text-xs">
            <ScanIcon size={16} className="mx-auto mb-1" />
            <div>{format} Barcode</div>
            <div className="font-mono">{variant.sku}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={downloadBarcode}
            className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-md transition-colors"
            title="Download Barcode"
          >
            <DownloadIcon size={16} />
          </button>
          
          <button
            onClick={printBarcode}
            className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-md transition-colors"
            title="Print Barcode"
          >
            <PrinterIcon size={16} />
          </button>
          
          <button
            onClick={copyToClipboard}
            className={cn(
              'p-2 rounded-md transition-colors',
              copied
                ? 'text-green-600 bg-green-100'
                : 'text-gray-600 hover:text-primary hover:bg-gray-100'
            )}
            title="Copy Barcode"
          >
            {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
          </button>
        </div>
      )}

      {/* Format Info */}
      {size !== 'sm' && (
        <div className="text-center text-xs text-gray-500">
          <div>{format} Format</div>
        </div>
      )}
    </div>
  );
};