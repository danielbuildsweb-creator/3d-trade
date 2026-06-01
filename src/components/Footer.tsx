import React from 'react';
import { VideoBackground } from './VideoBackground';
import { Twitter, Github, Linkedin, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative min-h-[80vh] flex flex-col justify-end text-white overflow-hidden pb-12 pt-32">
      {/* Background Video (Upload to public/video3.mp4) */}
      <VideoBackground src="/video3.mp4" opacity={1} start="top bottom" end="bottom bottom" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-primary-bg/80 to-transparent z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-24 perspective-1000">
          <h2 
            className="text-6xl md:text-8xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-neon-green"
            style={{ transform: 'rotateX(10deg)', transformStyle: 'preserve-3d' }}
          >
            Join the Revolution
          </h2>
          <p className="text-xl text-gray-400 font-mono mb-10 max-w-2xl">
            Start building your portfolio today with the most advanced trading engine ever built.
          </p>
          
          <form className="relative w-full max-w-md group" onSubmit={(e) => e.preventDefault()}>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-green to-neon-green rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
            <div className="relative flex glass-panel rounded-xl overflow-hidden p-1 shadow-[0_0_20px_rgba(57,255,20,0.3)]">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent px-4 py-3 outline-none text-white placeholder-gray-500 font-mono"
                required
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-emerald-green to-neon-green px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform text-primary-bg"
              >
                Join <Send size={16} />
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-green to-neon-green flex items-center justify-center">
                <span className="font-display font-bold text-primary-bg text-lg leading-none">N</span>
              </div>
              <span className="font-display font-bold text-xl tracking-wider">
                NEXUS<span className="text-neon-green">TRADE</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm font-mono leading-relaxed">
              Regulated platform for digital asset trading. High performance matched with unmatched security.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-mono">
              <li><a href="#" className="hover:text-neon-green transition-colors">Exchange</a></li>
              <li><a href="#" className="hover:text-neon-green transition-colors">Margin</a></li>
              <li><a href="#" className="hover:text-neon-green transition-colors">API</a></li>
              <li><a href="#" className="hover:text-neon-green transition-colors">Fees</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-mono">
              <li><a href="#" className="hover:text-neon-green transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-neon-green transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-neon-green transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-neon-green transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:-translate-y-2 hover:text-neon-green hover:border-neon-green transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:-translate-y-2 hover:text-white hover:border-white transition-all duration-300">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:-translate-y-2 hover:text-emerald-green hover:border-emerald-green transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-600 font-mono mt-12 pt-8 border-t border-white/5">
          &copy; {new Date().getFullYear()} NexusTrade. All rights reserved. 
        </div>
      </div>
    </footer>
  );
};
