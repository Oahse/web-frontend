import React from 'react';
import { DownloadIcon, FileTextIcon, TableIcon, ImageIcon } from 'lucide-react';

export interface ExportOptions {
  formats: ('csv' | 'excel' | 'pdf' | 'png' | 'json')[];
  onExport: (format: string, data?: unknown) => void;
  data?: unknown;
  filename?: string;
}

export const ExportButton: React.FC<ExportOptions> = ({
  formats,
  onExport,
  data
}) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'csv':
      case 'excel':
        return <TableIcon size={14} />;
      case 'pdf':
        return <FileTextIcon size={14} />;
      case 'png':
        return <ImageIcon size={14} />;
      default:
        return <DownloadIcon size={14} />;
    }
  };

  const getFormatLabel = (format: string) => {
    switch (format) {
      case 'csv':
        return 'CSV';
      case 'excel':
        return 'Excel';
      case 'pdf':
        return 'PDF';
      case 'png':
        return 'PNG';
      case 'json':
        return 'JSON';
      default:
        return format.toUpperCase();
    }
  };

  const handleExport = (format: string) => {
    onExport(format, data);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
        title="Export"
      >
        <DownloadIcon size={16} />
      </button>
      
      {showMenu && (
        <div className="absolute right-0 top-10 bg-white shadow-lg rounded-md py-2 z-10 min-w-32 border border-gray-200">
          {formats.map(format => (
            <button
              key={format}
              onClick={() => handleExport(format)}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {getFormatIcon(format)}
              <span>Export {getFormatLabel(format)}</span>
            </button>
          ))}
        </div>
      )}
      
      {showMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};