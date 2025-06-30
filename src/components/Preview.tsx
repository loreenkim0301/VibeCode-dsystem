import React from 'react';

interface PreviewProps {
  className?: string;
}

export const Preview: React.FC<PreviewProps> = ({ className = '' }) => {
  return (
    <div className={`preview-container ${className}`}>
      <div className="p-6 bg-white rounded-lg shadow-sm border">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Preview Component</h2>
        <p className="text-gray-600">
          This is a placeholder Preview component. You can customize this component
          to display whatever content you need for your application.
        </p>
      </div>
    </div>
  );
};

export default Preview;