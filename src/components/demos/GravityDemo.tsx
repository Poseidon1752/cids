import { useState, useEffect, useRef } from "react";
import { Orbit, Zap, Plus } from "lucide-react";

interface GravityDemoProps {
  isRunning: boolean;
  showOutput: boolean;
}

interface Planet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  color: string;
  trail: Array<{ x: number; y: number }>;
}

export const GravityDemo = ({ isRunning, showOutput }: GravityDemoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [showTrails, setShowTrails] = useState(true);
  const animationRef = useRef<number>();

  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

  const createPlanet = (x: number, y: number) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 3;
    
    const newPlanet: Planet = {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      mass: 10 + Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      trail: []
    };
    
    setPlanets(prev => [...prev, newPlanet]);
  };

  useEffect(() => {
    if (isRunning && showOutput) {
      // Create initial planets
      const initialPlanets = [
        { x: 200, y: 200, delay: 0 },
        { x: 400, y: 200, delay: 300 },
        { x: 300, y: 300, delay: 600 }
      ];

      initialPlanets.forEach(({ x, y, delay }) => {
        setTimeout(() => createPlanet(x, y), delay);
      });
    }
  }, [isRunning, showOutput]);

  useEffect(() => {
    if (!canvasRef.current || !showOutput || planets.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const G = 0.5; // Gravitational constant

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      setPlanets(prev => {
        const updated = prev.map(planet => {
          let fx = 0, fy = 0;

          // Calculate gravitational forces from all other planets
          prev.forEach(other => {
            if (planet === other) return;

            const dx = other.x - planet.x;
            const dy = other.y - planet.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            if (dist > 5) {
              const force = (G * planet.mass * other.mass) / distSq;
              fx += (force * dx) / dist;
              fy += (force * dy) / dist;
            }
          });

          // Update velocity and position
          let newVx = planet.vx + fx / planet.mass;
          let newVy = planet.vy + fy / planet.mass;
          let newX = planet.x + newVx;
          let newY = planet.y + newVy;

          // Bounce off walls
          if (newX < 0 || newX > canvas.width) {
            newVx *= -0.8;
            newX = Math.max(0, Math.min(canvas.width, newX));
          }
          if (newY < 0 || newY > canvas.height) {
            newVy *= -0.8;
            newY = Math.max(0, Math.min(canvas.height, newY));
          }

          // Update trail
          const newTrail = [...planet.trail, { x: planet.x, y: planet.y }];
          if (newTrail.length > 50) newTrail.shift();

          return {
            ...planet,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            trail: newTrail
          };
        });

        return updated;
      });

      // Draw trails
      if (showTrails) {
        planets.forEach(planet => {
          if (planet.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(planet.trail[0].x, planet.trail[0].y);
            planet.trail.forEach((point, i) => {
              ctx.lineTo(point.x, point.y);
              ctx.strokeStyle = planet.color + Math.floor((i / planet.trail.length) * 255).toString(16).padStart(2, '0');
              ctx.lineWidth = 2;
            });
            ctx.stroke();
          }
        });
      }

      // Draw planets
      planets.forEach(planet => {
        const radius = Math.sqrt(planet.mass);
        
        // Glow effect
        const gradient = ctx.createRadialGradient(planet.x, planet.y, 0, planet.x, planet.y, radius * 2);
        gradient.addColorStop(0, planet.color);
        gradient.addColorStop(0.5, planet.color + '80');
        gradient.addColorStop(1, planet.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Planet body
        ctx.fillStyle = planet.color;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [planets, showOutput, showTrails]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!showOutput) return;
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    createPlanet(x, y);
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
    createPlanet(x, y);
  };

  const clearPlanets = () => {
    setPlanets([]);
  };

  return (
    <div className="space-y-6">
      {showOutput && (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-xl" />
          
          <div className="relative bg-gradient-to-br from-background via-primary/5 to-background border-2 border-primary/30 rounded-xl p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Orbit className="w-6 h-6 text-primary animate-spin" style={{ animationDuration: '3s' }} />
                <h4 className="text-lg font-bold text-foreground">Gravity Simulator</h4>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setShowTrails(!showTrails)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-bold transition-all touch-manipulation ${
                    showTrails
                      ? 'bg-gradient-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-primary/20'
                  }`}
                >
                  Траектории
                </button>
                <button
                  onClick={clearPlanets}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500/20 text-red-400 rounded-lg text-sm sm:text-base font-bold hover:bg-red-500/30 transition-all touch-manipulation"
                >
                  Очистить
                </button>
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
                  <Plus className="w-3 h-3" />
                  <span>Кликни для добавления планеты</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-primary">{planets.length}</div>
                <div className="text-xs text-muted-foreground mt-1">Планет</div>
              </div>
              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-secondary">Гравитация</div>
                <div className="text-xs text-muted-foreground mt-1">Физика</div>
              </div>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-accent">60 FPS</div>
                <div className="text-xs text-muted-foreground mt-1">Плавность</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showOutput && (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center space-y-3">
            <Orbit className="w-16 h-16 mx-auto text-primary/50 animate-spin" style={{ animationDuration: '3s' }} />
            <p className="text-lg">Gravity Simulator готов...</p>
            <p className="text-sm">Physics + N-Body Simulation</p>
          </div>
        </div>
      )}
    </div>
  );
};
