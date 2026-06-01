import React, { useState } from 'react';

interface VideoBackgroundProps {
  src: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ src }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#02040A] pointer-events-none">
      {!hasError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          onError={() => setHasError(true)}
          className="w-full h-full object-cover relative z-0 opacity-100"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 z-10 section-bg-layer" />
    </div>
  );
};
