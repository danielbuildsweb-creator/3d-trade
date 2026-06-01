import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const ParticleNetwork: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE
    const scene = new THREE.Scene();
    
    // CAMERA
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 300;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // PARTICLES
    const particlesCount = window.innerWidth < 768 ? 150 : 350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const velocities = [];

    const spread = 800;

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread; // z
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.5,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material
    const material = new THREE.PointsMaterial({
      size: 2,
      color: 0x39ff14, // Neon green
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // LINES (Network)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d26a, // Emerald green
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particlesCount * particlesCount * 3);
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(linesMesh);

    // MOUSE INTERACTION
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ANIMATION
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const positions = particles.geometry.attributes.position.array as Float32Array;
      const time = clock.getElapsedTime();
      
      // Update particle positions
      let lineVertexIndex = 0;
      
      for (let i = 0; i < particlesCount; i++) {
        // Move particles
        positions[i * 3] += velocities[i].x;
        positions[i * 3 + 1] += velocities[i].y;
        positions[i * 3 + 2] += velocities[i].z;

        // Boundary check and bounce
        if (Math.abs(positions[i * 3]) > spread / 2) velocities[i].x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > spread / 2) velocities[i].y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > spread / 2) velocities[i].z *= -1;
        
        // Slightly move towards mouse
        if (Math.abs(mouseX) > 0.1 || Math.abs(mouseY) > 0.1) {
            positions[i * 3] += (mouseX * 100 - positions[i * 3]) * 0.001;
            positions[i * 3 + 1] += (mouseY * 100 - positions[i * 3 + 1]) * 0.001;
        }

        // Draw lines between close particles
        for(let j = i + 1; j < particlesCount; j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const distSq = dx*dx + dy*dy + dz*dz;
            
            // If close enough, draw a line
            const connectDistance = window.innerWidth < 768 ? 4000 : 8000;
            if (distSq < connectDistance) {
                linePositions[lineVertexIndex++] = positions[i * 3];
                linePositions[lineVertexIndex++] = positions[i * 3 + 1];
                linePositions[lineVertexIndex++] = positions[i * 3 + 2];
                linePositions[lineVertexIndex++] = positions[j * 3];
                linePositions[lineVertexIndex++] = positions[j * 3 + 1];
                linePositions[lineVertexIndex++] = positions[j * 3 + 2];
            }
        }
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
      
      // Update lines geometry based on connected particles
      linesMesh.geometry.setDrawRange(0, lineVertexIndex / 3);
      linesMesh.geometry.attributes.position.needsUpdate = true;
      
      // Slight camera movement for parallax
      camera.position.x += (mouseX * 50 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 50 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      // Gentle rotation
      particles.rotation.y = time * 0.05;
      linesMesh.rotation.y = time * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      linesGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0 pointer-events-none mix-blend-screen opacity-60"
      style={{ overflow: 'hidden' }}
    />
  );
};
