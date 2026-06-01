import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VideoBackgroundProps {
  src: string;
  opacity?: number;
  start?: string;
  end?: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  src, 
  opacity = 1,
  start = 'top bottom',
  end = 'bottom top'
}) => {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    
    if (!video || !container) return;

    // Use GSAP ScrollTrigger to sync video playback with scroll
    const ctx = gsap.context(() => {
      // Pause video so we can scrub it
      video.pause();

      ScrollTrigger.create({
        trigger: container,
        start,
        end,
        scrub: 1, // Smooth scrub
        onUpdate: (self) => {
          if (video.readyState >= 2 && video.duration && isFinite(video.duration)) {
            try {
              video.currentTime = video.duration * self.progress;
            } catch (e) {
              console.warn("Video currentTime update failed:", e);
            }
          }
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [start, end]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none">
      {!hasError && (
        <video
          ref={videoRef}
          muted
          playsInline
          onError={() => setHasError(true)}
          className="w-full h-full object-cover relative z-0"
          style={{ opacity }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      {/* Fallback gradient if video fails to load */}
      {hasError && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(57, 255, 20, 0.15) 0%, rgba(3, 7, 18, 1) 100%)',
            opacity
          }}
        />
      )}
    </div>
  );
};
