import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  { label: '24h Volume', value: 12.5, suffix: 'B', prefix: '$', color: 'text-neon-green' },
  { label: 'Active Traders', value: 2.4, suffix: 'M', prefix: '', color: 'text-emerald-green' },
  { label: 'Supported Assets', value: 500, suffix: '+', prefix: '', color: 'text-soft-neon' },
  { label: 'Uptime', value: 99.99, suffix: '%', prefix: '', color: 'text-neon-green' }
];

export const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate numbers
      const counters = document.querySelectorAll('.stat-number');
      counters.forEach((counter) => {
        const targetNumber = parseFloat(counter.getAttribute('data-target') || '0');
        
        gsap.to(counter, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          innerHTML: targetNumber,
          duration: 2.5,
          ease: 'power2.out',
          snap: { innerHTML: 0.1 },
          onUpdate: function() {
            if (counter.innerHTML.length > 5) {
                // Formatting for decimal stats
                const val = parseFloat(counter.innerHTML).toFixed(this.targets()[0].id === 'uptime' ? 2 : 1);
                counter.innerHTML = val.endsWith('.0') && this.targets()[0].id !== 'uptime' ? val.slice(0, -2) : val;
            }
          }
        });
      });

      // 3D Flip cards
      gsap.from('.stat-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        rotateX: -90,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'back.out(1.5)'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 perspective-1000">
          {statsData.map((stat, i) => (
            <div 
              key={i} 
              className="stat-card glass-panel rounded-xl p-6 flex flex-col items-center justify-center text-center transform transition-transform hover:translate-y-[-10px] hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
              style={{ transformOrigin: 'top center' }}
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
              <div className="text-gray-400 font-mono text-xs md:text-sm tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
