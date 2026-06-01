import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Basic', price: '0',
    features: ['Spot trading', 'Basic charts', 'Standard support', 'Up to $10k vol/mo'],
    glow: '', border: 'border-white/10', btn: 'bg-white/5 hover:bg-white/10'
  },
  {
    name: 'Pro', price: '49',
    features: ['Margin trading (50x)', 'AI Analytics', 'Priority API access', 'Unlimited volume'],
    glow: 'shadow-[0_0_40px_rgba(57,255,20,0.3)]', border: 'border-neon-green/50', btn: 'bg-neon-green text-primary-bg hover:bg-emerald-green'
  },
  {
    name: 'Institutional', price: '499',
    features: ['Dark pool access', 'Dedicated account manager', 'Colocation server', 'Custom API rates'],
    glow: '', border: 'border-white/10', btn: 'bg-white/5 hover:bg-white/10'
  }
];

export const Pricing: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 100,
        opacity: 0,
        rotateY: 15,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-32 relative text-white perspective-1000">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Transparent <span className="text-neon-green neon-text">Pricing</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm max-w-2xl mx-auto">
            Pay only for what you use. Zero hidden fees.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 preserve-3d">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`pricing-card w-full max-w-sm glass-panel p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-4 hover:rotate-y-5
                ${plan.border} ${plan.glow} ${i === 1 ? 'lg:-translate-y-8 lg:scale-105 z-10' : 'z-0'}
              `}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {i === 1 && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon-green text-primary-bg px-4 py-1 text-xs font-bold rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(57,255,20,0.8)]">Most Popular</div>}
              
              <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-mono font-bold">${plan.price}</span>
                <span className="text-gray-400 text-sm">/mo</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm">
                    <Check className={`w-5 h-5 ${i === 1 ? 'text-neon-green' : 'text-gray-400'}`} />
                    <span className="text-gray-200">{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${plan.btn}`}>
                Select {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
