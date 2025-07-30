// src/components/common/AdvertisementBlock.tsx
import React from 'react';

const AdvertisementBlock: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`bg-app-surface rounded-card shadow-md p-6 text-center text-app-text-muted ${className}`}>
      <p className="text-sm italic">Advertisement</p>
      <div className="w-full h-40 bg-app-border/50 flex items-center justify-center mt-2 rounded">
        <span className="text-xs">Ad Placeholder</span>
      </div>
    </div>
  );
};

export default AdvertisementBlock;