import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const assets = [
  { symbol: 'BTC', name: 'Bitcoin', price: '64,230.00', change: '+2.4%', color: 'from-[#F7931A]' },
  { symbol: 'ETH', name: 'Ethereum', price: '3,450.21', change: '+1.1%', color: 'from-[#627EEA]' },
  { symbol: 'SOL', name: 'Solana', price: '143.50', change: '+5.7%', color: 'from-[#14F195]' },
  { symbol: 'SPY', name: 'S&P 500', price: '520.15', change: '-0.3%', color: 'from-[#3B82F6]' },
  { symbol: 'QQQ', name: 'NASDAQ', price: '445.80', change: '+0.8%', color: 'from-[#A855F7]' },
];

export const Markets: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ticker animation
      if (tickerRef.current) {
        gsap.to(tickerRef.current, {
          x: '-50%',
          duration: 20,
          ease: 'none',
          repeat: -1
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play reverse play reverse'
        }
      });

      tl.from(sectionRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out'
      }, 0);

      tl.fromTo('.gsap-headline', {
        opacity: 0, y: 40, rotateX: -15
      }, {
        opacity: 1, y: 0, rotateX: 0, duration: 0.6, ease: 'power3.out'
      }, 0.1);

      tl.fromTo('.gsap-subheading', {
        opacity: 0, x: -30
      }, {
        opacity: 1, x: 0, duration: 0.6, ease: 'power3.out'
      }, 0.2);

      tl.fromTo('.market-card', {
        opacity: 0, y: 40, scale: 0.95
      }, {
        opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out'
      }, 0.3);

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="markets" ref={sectionRef} className="py-24 relative overflow-hidden text-white scroll-mt-20 z-10" style={{ opacity: 1, scrollSnapAlign: 'start' }}>
      <div className="section-bg-layer" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-neon-green/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      {/* Ticker */}
      <div className="w-full border-y border-white/10 bg-black/50 py-3 mb-16 overflow-hidden flex whitespace-nowrap">
        <div ref={tickerRef} className="flex gap-12 text-sm font-mono items-center min-w-[200%]">
          {[...assets, ...assets, ...assets].map((item, i) => (
             <div key={i} className="flex items-center gap-3">
               <span className="text-gray-400">{item.symbol}</span>
               <span className="font-bold">${item.price}</span>
               <span className={item.change.startsWith('+') ? 'text-neon-green' : 'text-error'}>{item.change}</span>
             </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 relative z-10">
          <div>
            <h2 className="gsap-headline text-4xl md:text-5xl font-display font-bold mb-2" style={{ opacity: 1 }}>Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-electric-blue">Markets</span></h2>
            <p className="gsap-subheading text-[#E0F7FF] font-mono text-sm max-w-md" style={{ opacity: 1 }}>Trade 500+ assets with deepest liquidity and lowest slippage.</p>
          </div>
          <button className="text-sm font-mono text-electric-blue hover:text-white transition-colors mt-4 md:mt-0 items-center flex gap-2">
            View All Pairs <span className="text-lg">→</span>
          </button>
        </div>

        {/* 3D Asset Cards */}
        <div className="flex flex-wrap lg:flex-nowrap gap-6 preserve-3d relative z-10">
          {assets.slice(0,4).map((item, i) => (
            <div 
              key={i} 
              className="market-card w-full md:w-[calc(50%-12px)] lg:w-1/4 h-64 glass-card rounded-2xl relative overflow-hidden group transform transition-all duration-300 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,255,136,0.2)] border border-[rgba(0,255,136,0.3)]"
              style={{ opacity: 1 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="p-6 h-full flex flex-col justify-between transform translate-z-20">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xl font-bold font-display text-[#F0FFFF]">{item.symbol}</div>
                    <div className="text-[#E0F7FF] text-sm">{item.name}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-mono font-bold ${item.change.startsWith('+') ? 'bg-neon-green/20 text-[#00FF88]' : 'bg-error/20 text-[#FF2A6D]'}`}>
                    {item.change}
                  </div>
                </div>
                
                <div>
                  <div className="text-3xl font-mono font-bold mb-2 text-[#00FF88]" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>${item.price}</div>
                  
                  {/* Fake sparkline on hover */}
                  <div className="h-12 w-full flex items-end gap-1 transition-opacity opacity-100">
                    {[30, 45, 25, 60, 40, 80, 50, 90, 70, 100].map((h, j) => (
                      <div 
                        key={j} 
                        className={`flex-1 rounded-sm ${item.change.startsWith('+') ? 'bg-neon-green' : 'bg-error'}`} 
                        style={{ height: `${h}%`, transformOrigin: 'bottom', animation: `growUp 0.5s ease forwards ${j*0.05}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes growUp {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
};
