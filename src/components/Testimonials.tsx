import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const testimonials = [
  { text: "NexusTrade's latency is unmatched. Executing HFT algorithms has never been easier.", author: "Sarah J.", role: "Quant Trader" },
  { text: "The cross-margin capabilities completely changed my portfolio efficiency.", author: "Michael T.", role: "Fund Manager" },
  { text: "Best UI/UX in the crypto space. The 3D analytics dashboard visually maps depth perfectly.", author: "Elena R.", role: "Day Trader" },
  { text: "Switched from a traditional broker and haven't looked back.", author: "David K.", role: "Retail Investor" }
];

export const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      gsap.to(scrollRef.current, {
        x: '-50%',
        duration: 30,
        ease: 'none',
        repeat: -1
      });
    }
  }, []);

  return (
    <section id="testimonials" className="py-24 overflow-hidden relative">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl font-display font-bold">Trusted by <span className="text-neon-green">Professionals</span></h2>
      </div>

      <div className="flex w-full overflow-hidden mask-image-fade relative z-10">
        <div ref={scrollRef} className="flex gap-6 min-w-max px-6">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div 
              key={i} 
              className="w-96 glass-panel p-8 rounded-2xl border border-white/5 flex flex-col justify-between"
            >
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-[#EAB308]">★</span>)}
                </div>
                <p className="text-gray-300 italic">"{t.text}"</p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-green to-neon-green flex items-center justify-center font-bold text-primary-bg shadow-[0_0_10px_rgba(57,255,20,0.5)]">
                  {t.author[0]}
                </div>
                <div>
                  <div className="font-bold">{t.author}</div>
                  <div className="text-xs text-gray-500 font-mono">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .mask-image-fade {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
};
