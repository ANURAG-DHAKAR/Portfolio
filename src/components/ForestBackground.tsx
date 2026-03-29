import { useEffect, useRef } from 'react';

export function ForestBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system for magical forest atmosphere
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y > canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(168, 213, 186, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* CSS Forest Layers with Parallax */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f1a] via-[#0d2820] to-black" />

        {/* Stars/Ambient lights */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20 animate-pulse"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 60 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 3 + 2 + 's',
              }}
            />
          ))}
        </div>

        {/* Tree silhouettes - Back layer */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[600px] opacity-20"
          style={{
            transform: 'translateY(calc(var(--scroll, 0) * -0.1px))',
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={`back-${i}`}
              className="absolute bottom-0"
              style={{
                left: `${i * 15}%`,
                width: '120px',
                height: `${Math.random() * 200 + 300}px`,
              }}
            >
              {/* Tree trunk */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-b from-[#2a1810] to-[#1a1008]"
                style={{
                  width: '20px',
                  height: '40%',
                }}
              />
              {/* Tree foliage */}
              <div
                className="absolute bottom-[30%] left-1/2 -translate-x-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '60px solid transparent',
                  borderRight: '60px solid transparent',
                  borderBottom: '200px solid #1a4d2e',
                }}
              />
            </div>
          ))}
        </div>

        {/* Tree silhouettes - Middle layer */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[500px] opacity-40"
          style={{
            transform: 'translateY(calc(var(--scroll, 0) * -0.2px))',
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={`mid-${i}`}
              className="absolute bottom-0"
              style={{
                left: `${i * 18 + 5}%`,
                width: '140px',
                height: `${Math.random() * 150 + 250}px`,
              }}
            >
              {/* Tree trunk */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-b from-[#3a2817] to-[#2a1810]"
                style={{
                  width: '25px',
                  height: '45%',
                }}
              />
              {/* Tree foliage */}
              <div
                className="absolute bottom-[35%] left-1/2 -translate-x-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '70px solid transparent',
                  borderRight: '70px solid transparent',
                  borderBottom: '180px solid #25613f',
                }}
              />
            </div>
          ))}
        </div>

        {/* Tree silhouettes - Front layer */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[400px] opacity-60"
          style={{
            transform: 'translateY(calc(var(--scroll, 0) * -0.3px))',
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={`front-${i}`}
              className="absolute bottom-0"
              style={{
                left: `${i * 25 + 2}%`,
                width: '160px',
                height: `${Math.random() * 100 + 200}px`,
              }}
            >
              {/* Tree trunk */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-b from-[#4a3520] to-[#3a2817]"
                style={{
                  width: '30px',
                  height: '50%',
                }}
              />
              {/* Tree foliage */}
              <div
                className="absolute bottom-[40%] left-1/2 -translate-x-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '80px solid transparent',
                  borderRight: '80px solid transparent',
                  borderBottom: '160px solid #2d7a4a',
                }}
              />
            </div>
          ))}
        </div>

        {/* Ground fog effect */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 via-[#0a1f1a]/40 to-transparent" />

        {/* Ambient light spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl" />
      </div>
    </>
  );
}
