import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VideoBackground } from './VideoBackground';
import { Activity, BrainCircuit, CandlestickChart, Wallet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Real-Time Data',
    desc: 'Lightning fast websocket execution with zero latency.',
    icon: <Activity className="w-8 h-8 text-neon-green" />,
    color: 'group-hover:border-neon-green/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]'
  },
  {
    title: 'AI Analytics',
    desc: 'Predictive modeling powered by next-gen neural networks.',
    icon: <BrainCircuit className="w-8 h-8 text-emerald-green" />,
    color: 'group-hover:border-emerald-green/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,210,106,0.3)]'
  },
  {
    title: 'Multi-Asset',
    desc: 'Trade Crypto, Stocks, FX, and Commodities in one unified interface.',
    icon: <CandlestickChart className="w-8 h-8 text-soft-neon" />,
    color: 'group-hover:border-soft-neon/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(124,255,124,0.3)]'
  },
  {
    title: 'Smart Portfolio',
    desc: 'Automated rebalancing to maximize yields in bear markets.',
    icon: <Wallet className="w-8 h-8 text-neon-green" />,
    color: 'group-hover:border-neon-green/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]'
  }
];

export const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Handle the tilt effect natively or with GSAP on hover is easier
      const cards = document.querySelectorAll('.feature-card');
      
      cards.forEach(card => {
        card.addEventListener('mousemove', (e: any) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * -10;
          const rotateY = ((x - centerX) / centerX) * 10;
          
          gsap.to(card, {
            rotateX, rotateY, duration: 0.5, ease: 'power2.out', transformPerspective: 1000
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
        });
      });

      // Simple stagger entry on scroll
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        y: 100,
        opacity: 0,
        rotationX: -45,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out'
      });
      
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-32 relative text-white perspective-1000">
      {/* Background Video (Upload to public/video2.mp4) */}
      <VideoBackground src="/video2.mp4" opacity={1} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Advanced <span className="text-neon-green neon-text">Capabilities</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm max-w-2xl mx-auto">
            Our platform provides institutional-grade tools previously unavailable to retail investors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 preserve-3d">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className={`feature-card group glass-panel rounded-2xl p-8 transition-all duration-300 border border-white/10 ${feature.color} ${feature.glow}`}
            >
              <div className="w-16 h-16 rounded-xl bg-black/40 flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border border-white/5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              
              <div className="mt-8 flex items-center text-xs font-mono text-soft-neon opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer">
                Explore feature <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
