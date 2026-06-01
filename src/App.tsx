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
  useEffect(() => {
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
    <div className="bg-primary-bg text-white min-h-screen selection:bg-neon-green selection:text-primary-bg">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 right-0 w-1 h-screen z-50 pointer-events-none">
        <div id="scroll-progress" className="w-full bg-gradient-to-b from-neon-green via-emerald-green to-soft-neon shadow-[0_0_10px_rgba(57,255,20,0.8)] rounded-full transition-all duration-100 ease-out h-0"></div>
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

