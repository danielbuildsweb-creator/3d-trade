import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { VideoBackground } from './VideoBackground';
import { Network, TrendingUp, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 3D Mouse Parallax Effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { innerWidth, innerHeight } = window;
      const xAxis = (innerWidth / 2 - e.pageX) / 25;
      const yAxis = (innerHeight / 2 - e.pageY) / 25;
      
      if (textRef.current) {
        textRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      }
      if (cardRef.current) {
        cardRef.current.style.transform = `rotateY(${xAxis * 1.5}deg) rotateX(${yAxis * 1.5}deg) translateZ(50px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial Text Reveal Animation
    if (textRef.current) {
      const chars = textRef.current.innerText.split('');
      textRef.current.innerText = '';
      chars.forEach((char, i) => {
        const span = document.createElement('span');
        span.innerText = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateZ(-200px) scale(0.5)';
        textRef.current?.appendChild(span);
        
        gsap.to(span, {
          opacity: 1,
          z: 0,
          scale: 1,
          duration: 1.5,
          delay: 0.5 + i * 0.05,
          ease: "back.out(1.7)",
        });
      });
    }

    // Typewriter effect fallback
    const typeWriter = document.getElementById('typewriter');
    if (typeWriter) {
       typeWriter.style.opacity = '0';
       gsap.to(typeWriter, { opacity: 1, y: 0, duration: 1, delay: 1.5 });
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden preserve-3d" ref={containerRef}>
      {/* Background Video (Upload to public/video1.mp4) */}
      <VideoBackground src="/video1.mp4" opacity={1} start="top top" end="bottom top" />
      
      <div className="container mx-auto px-6 z-10 flex flex-col lg:flex-row items-center justify-between pt-24">
        
        <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left mb-16 lg:mb-0 perspective-1000">
          <h1 
            ref={textRef}
            className="text-6xl lg:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-emerald-green to-soft-neon transition-transform duration-100 ease-out"
            style={{ transformStyle: 'preserve-3d' }}
          >
            Trade the Future
          </h1>
          
          <p id="typewriter" className="text-xl lg:text-2xl font-sans text-gray-300 transform translate-y-4">
            Empowering the next generation of digital asset trading through AI-driven analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
            <button className="relative group px-8 py-4 bg-transparent font-medium text-white transition-all duration-300">
              <span className="absolute inset-0 bg-gradient-to-r from-neon-green to-emerald-green rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300 neon-border"></span>
              <span className="absolute inset-0 bg-primary-bg border border-neon-green/30 rounded-lg"></span>
              <span className="relative flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                Start Trading <Network className="w-5 h-5 text-neon-green" />
              </span>
            </button>
            <button className="relative group px-8 py-4 bg-transparent font-medium text-white transition-all duration-300">
              <span className="absolute inset-0 bg-emerald-green rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-300"></span>
              <span className="absolute inset-0 bg-transparent border border-emerald-green/50 rounded-lg group-hover:bg-[#111122]"></span>
              <span className="relative flex items-center gap-2 transition-transform duration-300">
                View Markets <TrendingUp className="w-5 h-5 text-emerald-green" />
              </span>
            </button>
          </div>
        </div>
        
        {/* 3D Dashboard Mockup */}
        <div className="w-full lg:w-1/2 perspective-1000 flex justify-center">
          <div 
            ref={cardRef} 
            className="w-full max-w-lg aspect-video glass-panel rounded-2xl p-6 flex flex-col gap-4 transform transition-transform duration-100 ease-out relative group"
            style={{ transformStyle: 'preserve-3d', boxShadow: '0 25px 50px -12px rgba(57, 255, 20, 0.4)' }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent"></div>
            
            <div className="flex justify-between items-center transform translate-z-10 shadow-sm">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-error"></div>
                 <div className="w-3 h-3 rounded-full bg-warning"></div>
                 <div className="w-3 h-3 rounded-full bg-success"></div>
               </div>
               <span className="font-mono text-xs text-neon-green/70 px-3 py-1 bg-neon-green/10 rounded-full border border-neon-green/20">LIVE_TRADE_VM</span>
            </div>
            
            <div className="flex-1 flex items-end gap-3 translate-z-20 border-b border-white/5 pb-2">
              {[40, 65, 45, 90, 75, 100, 85].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-emerald-green via-neon-green to-transparent rounded-t-sm group-hover:scale-y-110 transition-transform duration-500 origin-bottom" style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }}></div>
              ))}
            </div>
            
            <div className="flex justify-between items-center text-xs font-mono text-gray-400 translate-z-30">
               <div>BTC/USD <span className="text-neon-green">+4.20%</span></div>
               <div>ETH/USD <span className="text-neon-green">+1.15%</span></div>
               <div>SOL/USD <span className="text-crimson-red">-0.8%</span></div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};
