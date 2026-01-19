/**
 * Canvas Particle Animation System
 * 
 * Creates an animated background with:
 * - Floating particles that respond to mouse proximity
 * - Connecting lines between particles
 * - Smooth radiant cursor circle effect
 * 
 * Performance: ~80 particles + 20 connections for balanced visual/performance
 */

// ============================================================================
// Canvas Initialization
// ============================================================================

const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = -1000;
let mouseY = -1000;
const mouseRadius = 150;

// ============================================================================
// Particle System
// ============================================================================

/**
 * Particle Class
 * Individual floating particle with physics and mouse interaction
 */
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  
  draw() {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const isNearMouse = distance < mouseRadius;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    if (isNearMouse) {
      ctx.fillStyle = `rgba(96, 165, 250, ${this.opacity * 1.5})`;
    } else {
      ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
    }
    ctx.fill();
  }
}

/**
 * Connection Class
 * Lines connecting particles with gradient effects near mouse
 */
class Connection {
  constructor() {
    this.x1 = Math.random() * canvas.width;
    this.y1 = Math.random() * canvas.height;
    this.x2 = Math.random() * canvas.width;
    this.y2 = Math.random() * canvas.height;
    this.vx1 = (Math.random() - 0.5) * 0.3;
    this.vy1 = (Math.random() - 0.5) * 0.3;
    this.vx2 = (Math.random() - 0.5) * 0.3;
    this.vy2 = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.1 + 0.05;
  }
  
  update() {
    this.x1 += this.vx1;
    this.y1 += this.vy1;
    this.x2 += this.vx2;
    this.y2 += this.vy2;
    
    if (this.x1 < 0 || this.x1 > canvas.width) this.vx1 *= -1;
    if (this.y1 < 0 || this.y1 > canvas.height) this.vy1 *= -1;
    if (this.x2 < 0 || this.x2 > canvas.width) this.vx2 *= -1;
    if (this.y2 < 0 || this.y2 > canvas.height) this.vy2 *= -1;
  }
  
  draw() {
    const dx1 = this.x1 - mouseX;
    const dy1 = this.y1 - mouseY;
    const dx2 = this.x2 - mouseX;
    const dy2 = this.y2 - mouseY;
    const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    const isNearMouse = distance1 < mouseRadius || distance2 < mouseRadius;
    
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    
    if (isNearMouse) {
      const gradient = ctx.createLinearGradient(this.x1, this.y1, this.x2, this.y2);
      gradient.addColorStop(0, `rgba(96, 165, 250, ${this.opacity * 3})`);
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${this.opacity * 4})`);
      gradient.addColorStop(1, `rgba(147, 51, 234, ${this.opacity * 3})`);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
    } else {
      ctx.strokeStyle = `rgba(59, 130, 246, ${this.opacity})`;
      ctx.lineWidth = 1;
    }
    ctx.stroke();
  }
}

// ============================================================================
// Animation Setup
// ============================================================================

const particles = [];
const connections = [];

for (let i = 0; i < 80; i++) {
  particles.push(new Particle());
}

for (let i = 0; i < 20; i++) {
  connections.push(new Connection());
}

/**
 * Main animation loop
 * Updates and renders all particles and connections
 */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  connections.forEach(connection => {
    connection.update();
    connection.draw();
  });
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  requestAnimationFrame(animate);
}

animate();

// ============================================================================
// Event Handlers
// ============================================================================

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener('mouseleave', () => {
  mouseX = -1000;
  mouseY = -1000;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ============================================================================
// Radiant Cursor Circle Effect
// ============================================================================

const cursorCircle = document.createElement('div');
cursorCircle.id = 'cursor-circle';
document.body.appendChild(cursorCircle);

let cursorX = 0;
let cursorY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  cursorCircle.classList.add('active');
});

document.addEventListener('mouseleave', () => {
  cursorCircle.classList.remove('active');
});

/**
 * Smooth cursor circle animation with easing
 * Creates a lag effect for more fluid movement
 */
function animateCursor() {
  const dx = cursorX - currentX;
  const dy = cursorY - currentY;
  
  currentX += dx * 0.1;
  currentY += dy * 0.1;
  
  cursorCircle.style.left = currentX + 'px';
  cursorCircle.style.top = currentY + 'px';
  
  requestAnimationFrame(animateCursor);
}

animateCursor();
