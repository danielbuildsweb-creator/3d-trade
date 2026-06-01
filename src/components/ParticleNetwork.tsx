import React, { useEffect, useRef } from 'react';
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
