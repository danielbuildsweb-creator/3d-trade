import fs from 'fs';

const videoBg = `import React, { useState, useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  src: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ src }) => {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-[#02040A] pointer-events-none">
      {!hasError && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover relative z-0 transition-opacity duration-1000 opacity-100"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div 
        className="absolute inset-0 z-10"
        style={{ background: 'linear-gradient(to bottom, rgba(2,4,10,0.85), rgba(2,4,10,0.6))' }}
      />
    </div>
  );
};
`;

const particleBg = `import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ParticleNetwork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.innerWidth < 768) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const driftSpeeds = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        const val = (Math.random() - 0.5) * 40;
        positions[i] = val;
        originalPositions[i] = val;
        driftSpeeds[i] = (Math.random() - 0.5) * 0.05;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        size: 2, color: 0x00ff88, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00d4ff, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending
    });

    const linesMesh = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
    scene.add(linesMesh);
    camera.position.z = 20;

    let mouseX = 0; let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        scene.rotation.x += (mouseY * 0.05 - scene.rotation.x) * 0.05;
        scene.rotation.y += (mouseX * 0.05 - scene.rotation.y) * 0.05;

        const positions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] += driftSpeeds[i3];
            positions[i3+1] += driftSpeeds[i3+1];
            positions[i3+2] += driftSpeeds[i3+2];
            if (Math.abs(positions[i3] - originalPositions[i3]) > 2) driftSpeeds[i3] *= -1;
            if (Math.abs(positions[i3+1] - originalPositions[i3+1]) > 2) driftSpeeds[i3+1] *= -1;
            if (Math.abs(positions[i3+2] - originalPositions[i3+2]) > 2) driftSpeeds[i3+2] *= -1;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        const linePositions = [];
        const connectDistance = 4;
        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                if (dx*dx + dy*dy + dz*dz < connectDistance * connectDistance) {
                    linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2], positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
                }
            }
        }
        linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        renderer.render(scene, camera);
    };
    animate();

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
        geometry.dispose(); material.dispose(); lineMaterial.dispose(); renderer.dispose();
        if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen" />;
};
`;

const navBg = `import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/5 glass-card">
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
            <a key={item} href={\`#\${item.toLowerCase()}\`} aria-label={\`Go to \${item}\`} className="text-gray-300 hover:text-white transition-colors relative group py-2">
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
        className={\`md:hidden fixed inset-y-0 right-0 w-64 bg-[#0A1628] border-l border-white/5 p-6 transform transition-transform duration-300 z-50 \${isOpen ? 'translate-x-0' : 'translate-x-full'}\`}
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
              href={\`#\${item.toLowerCase()}\`} 
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
`;

try {
  fs.writeFileSync('src/components/VideoBackground.tsx', videoBg);
  fs.writeFileSync('src/components/ParticleNetwork.tsx', particleBg);
  fs.writeFileSync('src/components/Navbar.tsx', navBg);
} catch (e) {
  console.error(e);
}
