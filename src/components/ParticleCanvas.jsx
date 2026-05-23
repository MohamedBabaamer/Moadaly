import { useRef, useEffect } from 'react';

/**
 * Full-screen canvas particle animation with interactive mouse effects.
 * Migrated from canvas.js — renders behind all content.
 */
export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const PARTICLE_COUNT = 70;
    const CONNECTION_COUNT = 16;
    const MOUSE_RADIUS = 150;

    // ── Particle ────────────────────────────────────────────────────
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 0.8;
        this.opacity = Math.random() * 0.4 + 0.15;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = dist < MOUSE_RADIUS
          ? `rgba(96, 165, 250, ${this.opacity * 1.6})`
          : `rgba(59, 130, 246, ${this.opacity})`;
        ctx.fill();
      }
    }

    // ── Connection ──────────────────────────────────────────────────
    class Connection {
      constructor() {
        this.x1 = Math.random() * width;
        this.y1 = Math.random() * height;
        this.x2 = Math.random() * width;
        this.y2 = Math.random() * height;
        this.vx1 = (Math.random() - 0.5) * 0.28;
        this.vy1 = (Math.random() - 0.5) * 0.28;
        this.vx2 = (Math.random() - 0.5) * 0.28;
        this.vy2 = (Math.random() - 0.5) * 0.28;
        this.opacity = Math.random() * 0.08 + 0.03;
      }
      update() {
        this.x1 += this.vx1; this.y1 += this.vy1;
        this.x2 += this.vx2; this.y2 += this.vy2;
        if (this.x1 < 0 || this.x1 > width) this.vx1 *= -1;
        if (this.y1 < 0 || this.y1 > height) this.vy1 *= -1;
        if (this.x2 < 0 || this.x2 > width) this.vx2 *= -1;
        if (this.y2 < 0 || this.y2 > height) this.vy2 *= -1;
      }
      draw() {
        const d1 = Math.hypot(this.x1 - mouseRef.current.x, this.y1 - mouseRef.current.y);
        const d2 = Math.hypot(this.x2 - mouseRef.current.x, this.y2 - mouseRef.current.y);
        const near = d1 < MOUSE_RADIUS || d2 < MOUSE_RADIUS;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        if (near) {
          const grad = ctx.createLinearGradient(this.x1, this.y1, this.x2, this.y2);
          grad.addColorStop(0, `rgba(96,165,250,${this.opacity * 3})`);
          grad.addColorStop(0.5, `rgba(59,130,246,${this.opacity * 4})`);
          grad.addColorStop(1, `rgba(147,51,234,${this.opacity * 3})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
        } else {
          ctx.strokeStyle = `rgba(59,130,246,${this.opacity})`;
          ctx.lineWidth = 1;
        }
        ctx.stroke();
      }
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    const connections = Array.from({ length: CONNECTION_COUNT }, () => new Connection());

    function animate() {
      ctx.clearRect(0, 0, width, height);
      connections.forEach(c => { c.update(); c.draw(); });
      particles.forEach(p => { p.update(); p.draw(); });
      animFrameRef.current = requestAnimationFrame(animate);
    }
    animate();

    // ── Event listeners ─────────────────────────────────────────────
    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  );
}
