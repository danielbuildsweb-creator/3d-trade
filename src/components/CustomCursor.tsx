import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth <= 768) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0,
      });
    };

    const render = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      gsap.set(follower, {
        x: cursorX,
        y: cursorY,
      });
      requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    const rafId = requestAnimationFrame(render);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .cursor-pointer');
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1.5, opacity: 0 });
        gsap.to(follower, {
          scale: 1.5,
          borderColor: '#00FF88',
          backgroundColor: 'rgba(0, 255, 136, 0.1)',
          duration: 0.3
        });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, opacity: 1 });
        gsap.to(follower, {
          scale: 1,
          borderColor: 'rgba(0, 212, 255, 0.5)',
          backgroundColor: 'transparent',
          duration: 0.3
        });
      });
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="hidden md:block">
      {/* Dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-neon-green rounded-full pointer-events-none z-[9999] opacity-100"
        style={{ transform: 'translate(-50%, -50%)', mixBlendMode: 'screen' }}
      ></div>
      {/* Ring Follower */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border border-electric-blue/50 flex items-center justify-center transition-colors duration-300"
        style={{ transform: 'translate(-50%, -50%)', mixBlendMode: 'screen' }}
      >
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-neon-green/20 h-full" style={{ transform: 'translateX(-50%)' }} />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-neon-green/20 w-full" style={{ transform: 'translateY(-50%)' }} />
      </div>
    </div>
  );
};
