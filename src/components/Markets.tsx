import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const assets = [
  { symbol: 'BTC', name: 'Bitcoin', price: '64,230.00', change: '+2.4%', color: 'from-[#F7931A]' },
  { symbol: 'ETH', name: 'Ethereum', price: '3,450.21', change: '+1.1%', color: 'from-[#627EEA]' },
  { symbol: 'SOL', name: 'Solana', price: '143.50', change: '+5.7%', color: 'from-[#14F195]' },
  { symbol: 'SPY', name: 'S&P 500', price: '520.15', change: '-0.3%', color: 'from-[#3B82F6]' },
  { symbol: 'QQQ', name: 'NASDAQ', price: '445.80', change: '+0.8%', color: 'from-[#A855F7]' },
];

export const Markets: React.FC = () => {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ticker animation
    if (tickerRef.current) {
      gsap.to(tickerRef.current, {
        x: '-50%',
        duration: 20,
        ease: 'none',
        repeat: -1
      });
    }
  }, []);

  return (
    <section id="markets" className="py-24 bg-primary-bg relative overflow-hidden text-white">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-neon-green/5 blur-[120px] rounded-full pointer-events-none"></div>
      
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
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-soft-neon">Markets</span></h2>
            <p className="text-gray-400 font-mono text-sm max-w-md">Trade 500+ assets with deepest liquidity and lowest slippage.</p>
          </div>
          <button className="text-sm font-mono text-emerald-green hover:text-white transition-colors mt-4 md:mt-0 items-center flex gap-2">
            View All Pairs <span className="text-lg">→</span>
          </button>
        </div>

        {/* 3D Asset Cards */}
        <div className="flex flex-wrap lg:flex-nowrap gap-6 perspective-1000">
          {assets.slice(0,4).map((item, i) => (
            <div 
              key={i} 
              className="w-full md:w-[calc(50%-12px)] lg:w-1/4 h-64 glass-panel rounded-2xl relative overflow-hidden group transform transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(57,255,20,0.2)] hover:border-neon-green/30"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="p-6 h-full flex flex-col justify-between transform translate-z-20">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xl font-bold font-display">{item.symbol}</div>
                    <div className="text-gray-400 text-sm">{item.name}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-mono font-bold ${item.change.startsWith('+') ? 'bg-neon-green/20 text-neon-green' : 'bg-error/20 text-error'}`}>
                    {item.change}
                  </div>
                </div>
                
                <div>
                  <div className="text-3xl font-mono font-bold mb-2">${item.price}</div>
                  
                  {/* Fake sparkline on hover */}
                  <div className="h-12 w-full flex items-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                    {[30, 45, 25, 60, 40, 80, 50, 90, 70, 100].map((h, j) => (
                      <div 
                        key={j} 
                        className={`flex-1 rounded-sm ${item.change.startsWith('+') ? 'bg-neon-green' : 'bg-error'}`} 
                        style={{ height: `${h}%`, transformOrigin: 'bottom', transform: 'scaleY(0)', animation: `growUp 0.5s ease forwards ${j*0.05}s` }}
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
          to { transform: scaleY(1); }
        }
        .group:hover .flex-1 {
          animation-name: growUp;
        }
      `}</style>
    </section>
  );
};
