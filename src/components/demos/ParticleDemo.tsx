import { useState, useEffect, useRef } from "react";
import { Sparkles, Zap } from "lucide-react";

interface ParticleDemoProps {
  isRunning: boolean;
  showOutput: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

export const ParticleDemo = ({ isRunning, showOutput }: ParticleDemoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 300, y: 200 });
  const animationRef = useRef<number>();

  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  const createExplosion = (x: number, y: number) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50;
      const speed = 2 + Math.random() * 4;
      newParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 4
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  useEffect(() => {
    if (!canvasRef.current || !showOutput) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      setParticles(prev => {
        return prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15, // gravity
            vx: p.vx * 0.99, // friction
            life: p.life - 0.01
          }))
          .filter(p => p.life > 0);
      });

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, showOutput]);

  useEffect(() => {
    if (isRunning && showOutput) {
      // Create initial explosions
      const explosions = [
        { x: 150, y: 150, delay: 0 },
        { x: 450, y: 150, delay: 300 },
        { x: 300, y: 300, delay: 600 },
        { x: 100, y: 300, delay: 900 },
        { x: 500, y: 300, delay: 1200 }
      ];

      explosions.forEach(({ x, y, delay }) => {
        setTimeout(() => createExplosion(x, y), delay);
      });
    }
  }, [isRunning, showOutput]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!showOutput) return;
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    createExplosion(x, y);
  };

  const handleCanvasTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!showOutput) return;
    e.preventDefault();
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (touch.clientX - rect.left) * scaleX;
    const y = (touch.clientY - rect.top) * scaleY;
    createExplosion(x, y);
  };

  return (
    <div className="space-y-6">
      {showOutput && (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-xl" />
          
          <div className="relative bg-gradient-to-br from-background via-primary/5 to-background border-2 border-primary/30 rounded-xl p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                <h4 className="text-lg font-bold text-foreground">Particle System</h4>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>{particles.length} частиц</span>
              </div>
            </div>

            <div className="relative">
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                onClick={handleCanvasClick}
                onMouseDown={handleCanvasClick}
                onTouchStart={handleCanvasTouch}
                className="w-full h-auto bg-black rounded-lg border-2 border-primary/20 cursor-crosshair touch-none active:cursor-pointer"
              />
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  <span>Кликни для создания взрыва частиц</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-primary">{particles.length}</div>
                <div className="text-xs text-muted-foreground mt-1">Активных частиц</div>
              </div>
              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-secondary">60 FPS</div>
                <div className="text-xs text-muted-foreground mt-1">Производительность</div>
              </div>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-accent">Физика</div>
                <div className="text-xs text-muted-foreground mt-1">Гравитация + Трение</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showOutput && (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center space-y-3">
            <Sparkles className="w-16 h-16 mx-auto text-primary/50 animate-pulse" />
            <p className="text-lg">Система частиц готова...</p>
            <p className="text-sm">Canvas + Physics Engine</p>
          </div>
        </div>
      )}
    </div>
  );
};
