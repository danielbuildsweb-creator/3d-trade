import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { VideoBackground } from './VideoBackground';
import { LiveTrades } from './LiveTrades';
import { Network, TrendingUp, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 3D Mouse Parallax Effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (window.innerWidth < 768) return;
      
      const { innerWidth, innerHeight } = window;
      const xAxis = (innerWidth / 2 - e.pageX) / 100;
      const yAxis = (innerHeight / 2 - e.pageY) / 100;
      
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateY(${xAxis * 1.5}deg) rotateX(${yAxis * 1.5}deg) translateZ(10px)`;
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
        span.style.transform = 'translateZ(-50px) scale(0.9)';
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

    const typeWriter = document.getElementById('typewriter');
    if (typeWriter) {
       typeWriter.style.opacity = '0';
       gsap.to(typeWriter, { opacity: 1, y: 0, duration: 1, delay: 1.5 });
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" ref={containerRef}>
      <VideoBackground src="/video1.mp4" />
      <LiveTrades />
      
      <div className="container mx-auto px-6 z-10 flex flex-col lg:flex-row items-center justify-between pt-24 pb-12">
        
        <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left mb-16 lg:mb-0 transform-style-3d">
          <h1 
            ref={textRef}
            className="text-5xl md:text-6xl lg:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-electric-blue transition-transform duration-100 ease-out headline-text glitch-hover"
            style={{ transformStyle: 'preserve-3d' }}
          >
            Trade the Future
          </h1>
          
          <p id="typewriter" className="text-sm md:text-base lg:text-lg font-mono text-gray-300 max-w-[65ch] mx-auto lg:mx-0 leading-relaxed text-scrim">
            Advanced cryptographic asset management platform. Leverage AI-driven insights, sub-millisecond execution engines, and deep institutional liquidity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
            <a href="#pricing" onClick={(e) => scrollTo('pricing', e)} aria-label="Start Trading Strategy" className="relative group px-8 py-3 bg-transparent font-medium text-white transition-all duration-300 min-h-[44px] flex items-center justify-center">
              <span className="absolute inset-0 bg-gradient-to-r from-neon-green to-electric-blue rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300 neon-border"></span>
              <span className="absolute inset-0 bg-primary-bg border border-neon-green/30 rounded-lg"></span>
              <span className="relative flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                Start Trading <Network className="w-5 h-5 text-neon-green" />
              </span>
            </a>
            <a href="#markets" onClick={(e) => scrollTo('markets', e)} aria-label="View Markets Data" className="relative group px-8 py-3 bg-transparent font-medium text-white transition-all duration-300 min-h-[44px] flex items-center justify-center">
              <span className="absolute inset-0 bg-electric-blue rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-300"></span>
              <span className="absolute inset-0 bg-transparent border border-electric-blue/50 rounded-lg group-hover:bg-[#111122]"></span>
              <span className="relative flex items-center gap-2 transition-transform duration-300">
                View Markets <TrendingUp className="w-5 h-5 text-electric-blue" />
              </span>
            </a>
          </div>
        </div>
        
        {/* 3D Dashboard Mockup */}
        <div className="w-full lg:w-1/2 flex justify-center perspective-1000">
          <div 
            ref={cardRef} 
            className="w-full max-w-lg aspect-video glass-card rounded-2xl p-6 flex flex-col gap-4 transform transition-transform duration-100 ease-out relative group"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent"></div>
            
            <div className="flex justify-between items-center shadow-sm">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-error"></div>
                 <div className="w-3 h-3 rounded-full bg-warning"></div>
                 <div className="w-3 h-3 rounded-full bg-success"></div>
               </div>
               <span className="font-mono text-xs text-neon-green/70 px-3 py-1 bg-neon-green/10 rounded-full border border-neon-green/20">LIVE_TRADE_VM</span>
            </div>
            
            <div className="flex-1 flex items-end gap-3 border-b border-white/5 pb-2">
              {[40, 65, 45, 90, 75, 100, 85].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-electric-blue via-neon-green to-transparent rounded-t-sm group-hover:scale-y-110 transition-transform duration-500 origin-bottom" style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }}></div>
              ))}
            </div>
            
            <div className="flex justify-between items-center text-xs font-mono text-gray-400">
               <div>BTC/USD <span className="text-neon-green">+4.20%</span></div>
               <div>ETH/USD <span className="text-neon-green">+1.15%</span></div>
               <div>SOL/USD <span className="text-error">-0.8%</span></div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};
