import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-neon-green to-emerald-green flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(57,255,20,0.5)]">
            <span className="font-display font-bold text-primary-bg text-lg leading-none">N</span>
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-white">
            NEXUS<span className="text-neon-green">TRADE</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm">
          {['Markets', 'Features', 'Pricing', 'Testimonials'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-white transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-green group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <button className="px-5 py-2 rounded border border-neon-green/50 text-neon-green hover:bg-neon-green hover:text-primary-bg transition-all duration-300 shadow-[0_0_10px_rgba(57,255,20,0.2)] hover:shadow-[0_0_20px_rgba(57,255,20,0.6)]">
            Connect Wallet
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-neon-green transition-colors">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full glass-panel transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 border-b border-neon-green/20' : 'max-h-0'}`}>
        <div className="flex flex-col items-center py-6 gap-6 font-mono text-sm border-t border-white/5">
           {['Markets', 'Features', 'Pricing', 'Testimonials'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-neon-green transition-colors w-full text-center"
            >
              {item}
            </a>
          ))}
          <button className="px-6 py-2 rounded bg-neon-green/10 border border-neon-green text-neon-green font-bold">
            Connect
          </button>
        </div>
      </div>
    </nav>
  );
};
