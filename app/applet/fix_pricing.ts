import * as fs from 'fs';

const pricingBg = `import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Basic', price: '0',
    features: ['Spot trading', 'Basic charts', 'Standard support', 'Up to $10k vol/mo'],
    glow: '', border: 'border-[1px] border-[rgba(0,255,136,0.3)]', btn: 'bg-white/5 hover:bg-white/10'
  },
  {
    name: 'Pro', price: '49',
    features: ['Margin trading (50x)', 'AI Analytics', 'Priority API access', 'Unlimited volume'],
    glow: 'shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(0,255,136,0.15)]', border: 'border-2 border-neon-green', btn: 'bg-neon-green text-primary-bg hover:bg-electric-blue'
  },
  {
    name: 'Institutional', price: '499',
    features: ['Dark pool access', 'Dedicated account manager', 'Colocation server', 'Custom API rates'],
    glow: '', border: 'border-[1px] border-[rgba(0,255,136,0.3)]', btn: 'bg-white/5 hover:bg-white/10'
  }
];

export const Pricing: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      tl.fromTo('.pricing-card', {
        opacity: 0, y: 40, scale: 0.95
      }, {
        opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out'
      }, 0.3);

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-32 relative text-white perspective-1000 scroll-mt-20 z-10" style={{ opacity: 1, scrollSnapAlign: 'start' }}>
      
      <div className="section-bg-layer" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="gsap-headline text-4xl md:text-5xl font-display font-bold mb-4" style={{ opacity: 1 }}>
            Transparent <span className="neon-green-glow">Pricing</span>
          </h2>
          <p className="gsap-subheading text-[#E0F7FF] font-mono text-sm max-w-2xl mx-auto" style={{ opacity: 1 }}>
            Pay only for what you use. Zero hidden fees.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 preserve-3d">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={\`pricing-card w-full max-w-sm p-8 rounded-3xl transition-all duration-300 hover:-translate-y-4 hover:rotate-y-5 \${plan.border} \${plan.glow} \${i === 1 ? 'lg:-translate-y-5 lg:scale-105 z-10' : 'z-0'}\`}
              style={{
                background: 'rgba(10, 22, 40, 0.92)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: i === 1 ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 255, 136, 0.15)' : 'none',
                opacity: 1,
                backgroundClip: 'padding-box',
                transformStyle: 'preserve-3d'
              }}
            >
              {i === 1 && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon-green text-primary-bg px-4 py-1 text-xs font-bold rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,136,0.4)]">Most Popular</div>}
              
              <h3 className="text-2xl font-display font-bold mb-2 text-[#F0FFFF]">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-mono font-bold text-[#00FF88]" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>\${plan.price}</span>
                <span className="text-[#E0F7FF] text-sm font-semibold">/mo</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm">
                    <Check className={\`w-5 h-5 \${i === 1 ? 'text-[#00FF88]' : 'text-[#E0F7FF] grayscale'}\`} />
                    <span className="text-[#F0FFFF] font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button className={\`w-full py-4 rounded-xl font-bold transition-all duration-300 \${plan.btn}\`}>
                Select {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
`;

fs.writeFileSync('src/components/Pricing.tsx', pricingBg);
