/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, Component, ErrorInfo, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';
import { ParticleNetwork } from './components/ParticleNetwork';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Features } from './components/Features';
import { Markets } from './components/Markets';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean; error: Error | null };

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false, error: null };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: '20px', background: 'white' }}>
          <h1>Rendering Error:</h1>
          <pre>{this.state.error?.toString()}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

function AppContent() {
  const [booting, setBooting] = useState(true);
  const [bootText, setBootText] = useState('INITIALIZING_CORE...');

  useEffect(() => {
    // Quick boot sequence
    const logs = [
      'ALLOCATING_MEMORY...',
      'CONNECTING_LIQUIDITY_POOLS...',
      'SYNCING_ORACLES...',
      'INITIALIZING_NEURAL_NET...'
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setBootText(logs[i]);
        i++;
      }
    }, 300);

    const timeout = setTimeout(() => {
      setBooting(false);
      clearInterval(interval);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (booting) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical'
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Scroll progress indicator
    const handleScroll = () => {
      const scrollProgress = document.getElementById('scroll-progress');
      if (scrollProgress) {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.height = `${scrolled}%`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-primary-bg text-white min-h-screen selection:bg-neon-green selection:text-primary-bg md:cursor-none">
      
      {booting && (
        <div className="fixed inset-0 z-[99999] bg-[#02040A] flex flex-col items-center justify-center font-mono text-neon-green">
          <div className="text-2xl font-bold mb-4 glitch-hover text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-electric-blue">NEXUS_TRADE</div>
          <div className="w-64 h-1 bg-white/10 mb-2 relative overflow-hidden rounded">
            <div className="absolute top-0 left-0 bottom-0 bg-neon-green animate-[growRight_1.8s_ease-out_forwards]"></div>
          </div>
          <div className="text-xs text-electric-blue animate-pulse">{bootText}</div>
          <style>{`
            @keyframes growRight {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
        </div>
      )}

      <CustomCursor />
      <div className="scanlines"></div>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 right-0 w-1 h-screen z-50 pointer-events-none">
        <div id="scroll-progress" className="w-full bg-gradient-to-b from-neon-green via-electric-blue to-electric-blue shadow-[0_0_10px_rgba(0,255,136,0.4)] rounded-full transition-all duration-100 ease-out h-0"></div>
      </div>

      <ParticleNetwork />
      
      <div className="relative z-10 w-full overflow-hidden">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Features />
          <Markets />
          <Pricing />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </div>
  );
}

