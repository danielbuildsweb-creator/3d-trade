import React, { useEffect, useState, useRef } from 'react';

const pairs = ['BTC/USD', 'ETH/USD', 'SOL/USD', 'AVAX/USD', 'LINK/USD'];
const types = ['BUY', 'SELL'];

interface Trade {
  id: string;
  pair: string;
  price: string;
  amount: string;
  type: string;
  time: string;
}

export const LiveTrades: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate initial trades
    const initialTrades = Array.from({ length: 15 }).map((_, i) => createRandomTrade(i));
    setTrades(initialTrades);

    const interval = setInterval(() => {
      setTrades(prev => {
        const newTrade = createRandomTrade(Date.now());
        return [newTrade, ...prev].slice(0, 15);
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const createRandomTrade = (seed: number): Trade => {
    const pair = pairs[Math.floor(Math.random() * pairs.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const basePrice = pair === 'BTC/USD' ? 64000 : pair === 'ETH/USD' ? 3400 : pair === 'SOL/USD' ? 140 : 50;
    const price = (basePrice + (Math.random() * 10 - 5)).toFixed(2);
    const amount = (Math.random() * 2).toFixed(4);
    
    return {
      id: `${seed}`,
      pair,
      price,
      amount,
      type,
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit', fractionalSecondDigits: 2 }),
    };
  };

  return (
    <div 
      ref={containerRef}
      className="absolute top-1/2 -translate-y-1/2 right-10 lg:right-20 w-64 md:w-80 h-96 overflow-hidden pointer-events-none opacity-20 hidden md:block mask-image-fade"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
      }}
    >
      <div className="font-mono text-xs uppercase text-electric-blue mb-4 tracking-[0.2em] border-b border-electric-blue/30 pb-2">Live Execution Log</div>
      <div className="flex flex-col gap-2 transition-all duration-300">
        {trades.map((trade, i) => (
          <div key={trade.id} className={`flex justify-between items-center text-xs font-mono animate-fade-in-down`}>
            <div className="w-16 text-gray-500">{trade.time.split('.')[1] || '00'}ms</div>
            <div className={`w-12 font-bold ${trade.type === 'BUY' ? 'text-neon-green' : 'text-error'}`}>{trade.type}</div>
            <div className="w-16 text-gray-300">{trade.price}</div>
            <div className="w-16 text-right text-gray-500">{trade.amount}</div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
