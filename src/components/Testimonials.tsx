import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { text: "NexusTrade's latency is unmatched. Executing HFT algorithms has never been easier.", author: "Sarah J.", role: "Quant Trader" },
  { text: "The cross-margin capabilities completely changed my portfolio efficiency.", author: "Michael T.", role: "Fund Manager" },
  { text: "Best UI/UX in the crypto space. The 3D analytics dashboard visually maps depth perfectly.", author: "Elena R.", role: "Day Trader" },
  { text: "Switched from a traditional broker and haven't looked back.", author: "David K.", role: "Retail Investor" }
];

export const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
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

      tl.fromTo('.testimonial-card', {
        opacity: 0, y: 40, scale: 0.95
      }, {
        opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out'
      }, 0.3);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 overflow-hidden relative text-white scroll-mt-20 z-10" style={{ opacity: 1, scrollSnapAlign: 'start' }}>
      <div className="section-bg-layer" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      
      <div className="text-center mb-16 relative z-10">
        <h2 className="gsap-headline text-4xl font-display font-bold" style={{ opacity: 1 }}>Trusted by <span className="text-neon-green">Professionals</span></h2>
      </div>

      <div className="flex w-full overflow-hidden mask-image-fade relative z-10">
        <div ref={scrollRef} className="flex gap-6 min-w-max px-6">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div 
              key={i} 
              className="testimonial-card w-96 glass-card p-8 rounded-2xl border border-[rgba(0,255,136,0.3)] flex flex-col justify-between"
              style={{ opacity: 1 }}
            >
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-[#00FF88]">★</span>)}
                </div>
                <p className="text-[#F0FFFF] italic">"{t.text}"</p>
              </div>
              <div className="flex items-center gap-4 border-t border-[rgba(0,255,136,0.3)] pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-electric-blue to-neon-green flex items-center justify-center font-bold text-primary-bg shadow-[0_0_10px_rgba(0,255,136,0.2)]">
                  {t.author[0]}
                </div>
                <div>
                  <div className="font-bold text-[#F0FFFF]">{t.author}</div>
                  <div className="text-xs text-[#E0F7FF] font-mono">{t.role}</div>
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
