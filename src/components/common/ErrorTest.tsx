import React from 'react';

// This component is for testing error boundaries - DO NOT USE IN PRODUCTION
export const ErrorTest: React.FC = () => {
  const [shouldError, setShouldError] = React.useState(false);

  if (shouldError) {
    throw new Error('Test error for error boundary');
  }

  return (
    <div className="p-4 border border-red-300 bg-red-50 rounded-md">
      <h3 className="text-red-800 font-semibold mb-2">Error Boundary Test</h3>
      <p className="text-red-700 text-sm mb-3">
        This component is for testing error boundaries in development.
      </p>
      <button
        onClick={() => setShouldError(true)}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
      >
        Trigger Error
      </button>
    </div>
  );
};

export default ErrorTest;