import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  { label: '24h Volume', value: 12.5, suffix: 'B', prefix: '$', color: 'text-neon-green' },
  { label: 'Active Traders', value: 2.4, suffix: 'M', prefix: '', color: 'text-electric-blue' },
  { label: 'Supported Assets', value: 500, suffix: '+', prefix: '', color: 'text-electric-blue' },
  { label: 'Uptime', value: 99.99, suffix: '%', prefix: '', color: 'text-neon-green' }
];

export const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play reverse play reverse'
        }
      });

      // Section Wrapper
      tl.from(sectionRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out'
      }, 0);

      // Animate numbers
      const counters = document.querySelectorAll('.stat-number');
      counters.forEach((counter) => {
        const targetNumber = parseFloat(counter.getAttribute('data-target') || '0');
        
        tl.to(counter, {
          innerHTML: targetNumber,
          duration: 2.5,
          ease: 'power2.out',
          snap: { innerHTML: 0.1 },
          onUpdate: function() {
            if (counter.innerHTML.length > 5) {
                // Formatting for decimal stats
                const val = parseFloat(counter.innerHTML).toFixed(counter.id === 'uptime' ? 2 : 1);
                counter.innerHTML = val.endsWith('.0') && counter.id !== 'uptime' ? val.slice(0, -2) : val;
            }
          }
        }, 0.2);
      });

      // 3D Flip cards
      tl.fromTo('.stat-card', {
        rotateX: -90,
        opacity: 0,
        y: 50
      }, {
        rotateX: 0,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      }, 0.1);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative text-white perspective-1000 scroll-mt-20 z-10" style={{ opacity: 1, scrollSnapAlign: 'start' }}>
      <div className="section-bg-layer" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 preserve-3d">
          {statsData.map((stat, i) => (
            <div 
              key={i} 
              className="stat-card glass-card rounded-xl p-6 flex flex-col items-center justify-center text-center transform transition-transform hover:translate-y-[-10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
              style={{ transformOrigin: 'top center', opacity: 1 }}
            >
              <div className={`text-4xl md:text-5xl font-display font-bold mb-2 flex items-center ${stat.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
                {stat.prefix}
                <span 
                  className="stat-number" 
                  data-target={stat.value}
                  id={stat.label === 'Uptime' ? 'uptime' : `stat-${i}`}
                >0</span>
                {stat.suffix}
              </div>
              <div className="text-[#E0F7FF] font-mono text-xs md:text-sm tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
