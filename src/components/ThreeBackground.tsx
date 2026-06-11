import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Detect if mobile/tablet to optimize particle counts and scale down processing
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 120;

    // Setup scene
    const scene = new THREE.Scene();

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      60,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.z = 25;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: !isMobile, // Disable antialiasing on mobile for extreme performance
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);

    // Create particles group
    const particlesGroup = new THREE.Group();
    scene.add(particlesGroup);

    // Particle categories
    // 1. Soft spherical lights (Representing crayon dots and warm child-friendly lights)
    // 2. Starry little dots (Celestial faith representation)
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const colors = [
      0x38bdf8, // sky-400 (Soft blue)
      0xfacc15, // yellow-400 (Pastel yellow)
      0x4ade80, // green-400 (Cute green)
      0xffffff, // White star
    ];

    // Helper to generate a round soft canvas texture
    const createCircleTexture = (colorHex: number): THREE.Texture => {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        const color = new THREE.Color(colorHex);
        const rgbString = `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}`;
        gradient.addColorStop(0, `${rgbString}, 1)`);
        gradient.addColorStop(0.2, `${rgbString}, 0.8)`);
        gradient.addColorStop(1, `${rgbString}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(canvas);
    };

    // Create individual particle sprites for smooth parallax and diverse floating speeds
    interface FloatParticle {
      sprite: THREE.Points;
      speedY: number;
      speedX: number;
      speedZ: number;
      offsetRadius: number;
      angle: number;
      angularSpeed: number;
    }

    const floatingParticles: FloatParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorHex = colors[i % colors.length];
      const texture = createCircleTexture(colorHex);
      
      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
      geometries.push(geom);

      const size = (i % 3 === 0) ? (isMobile ? 0.3 : 0.6) : (isMobile ? 0.5 : 1.1);
      const mat = new THREE.PointsMaterial({
        size: size + Math.random() * 0.4,
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.5 + Math.random() * 0.4,
      });
      materials.push(mat);

      const points = new THREE.Points(geom, mat);
      
      // Position them within a viewport-sized cube box area
      points.position.set(
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20
      );

      particlesGroup.add(points);

      floatingParticles.push({
        sprite: points,
        speedY: (0.01 + Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : -1) * 0.4,
        speedX: (0.005 + Math.random() * 0.01) * (Math.random() > 0.5 ? 1 : -1) * 0.3,
        speedZ: (0.002 + Math.random() * 0.006) * (Math.random() > 0.5 ? 1 : -1) * 0.2,
        offsetRadius: Math.random() * 2,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: 0.001 + Math.random() * 0.003,
      });
    }

    // Gentle rotation of the whole group for cosmic background feeling
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize coordinate system: center is 0
      targetMouseX = (event.clientX / window.innerWidth - 0.5) * 4;
      targetMouseY = (event.clientY / window.innerHeight - 0.5) * 4;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Damp mouse movement for premium lag-free momentum effect
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const delta = clock.getDelta();

      // Subtle scene rotation based on mouse coordinates
      particlesGroup.rotation.y = mouseX * 0.08;
      particlesGroup.rotation.x = -mouseY * 0.08;

      // Animate individual particles for genuine anti-gravity drifting
      floatingParticles.forEach((p) => {
        // Linear drift
        p.sprite.position.y += p.speedY;
        p.sprite.position.x += p.speedX;
        p.sprite.position.z += p.speedZ;

        // Micro orbit/swaying motion to simulate floating in water/air
        p.angle += p.angularSpeed;
        p.sprite.position.x += Math.sin(p.angle) * 0.002;
        p.sprite.position.y += Math.cos(p.angle) * 0.002;

        // Wrap around boundaries
        if (p.sprite.position.y > 20) p.sprite.position.y = -20;
        if (p.sprite.position.y < -20) p.sprite.position.y = 20;

        if (p.sprite.position.x > 25) p.sprite.position.x = -25;
        if (p.sprite.position.x < -25) p.sprite.position.x = 25;

        if (p.sprite.position.z > 15) p.sprite.position.z = -15;
        if (p.sprite.position.z < -15) p.sprite.position.z = 15;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer keeping it clean and beautiful on viewport adjustments
    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.parentElement?.clientWidth || window.innerWidth;
      const height = canvasRef.current.parentElement?.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (canvasRef.current.parentElement) {
      resizeObserver.observe(canvasRef.current.parentElement);
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      
      // Memory cleanup for WebGL stability
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => {
        if (Array.isArray(m)) {
          m.forEach((subM) => subM.dispose());
        } else {
          m.dispose();
        }
      });
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'plus-lighter' }}
    />
  );
}
