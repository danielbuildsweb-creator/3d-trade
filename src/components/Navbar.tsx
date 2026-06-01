import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-[rgba(0,255,136,0.2)]" style={{ background: 'rgba(2, 4, 10, 0.95)', backdropFilter: 'blur(10px)' }}>
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-neon-green to-electric-blue flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(0,255,136,0.5)]">
            <span className="font-display font-bold text-primary-bg text-lg leading-none">N</span>
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-white">
            NEXUS<span className="text-neon-green">TRADE</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm">
          {['Markets', 'Features', 'Pricing', 'Testimonials'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} aria-label={`Go to ${item}`} className="text-gray-300 hover:text-white transition-colors relative group py-2">
              {item}
              <span className="absolute bottom-1 left-0 w-0 h-px bg-neon-green group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <button aria-label="Connect Wallet" className="px-5 py-2 min-h-[44px] rounded border border-neon-green/50 text-neon-green hover:bg-neon-green hover:text-primary-bg transition-all duration-300 shadow-[0_0_10px_rgba(0,255,136,0.2)] hover:shadow-[0_0_20px_rgba(0,255,136,0.6)]">
            Connect Wallet
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button aria-label="Toggle Menu" onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-neon-green transition-colors p-2 min-h-[44px] min-w-[44px]">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`md:hidden fixed inset-y-0 right-0 w-64 bg-[#0A1628] border-l border-white/5 p-6 transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-end mb-8">
          <button aria-label="Close Menu" onClick={() => setIsOpen(false)} className="text-white p-2 min-h-[44px] min-w-[44px]">
            <X size={28} />
          </button>
        </div>
        <div className="flex flex-col gap-6 font-mono text-sm">
           {['Markets', 'Features', 'Pricing', 'Testimonials'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-neon-green transition-colors min-h-[44px] flex items-center"
            >
              {item}
            </a>
          ))}
          <button className="px-6 py-3 min-h-[44px] rounded bg-neon-green/10 border border-neon-green text-neon-green font-bold mt-4">
            Connect
          </button>
        </div>
      </div>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};
