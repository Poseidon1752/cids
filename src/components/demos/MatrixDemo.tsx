import { useState, useEffect, useRef } from "react";
import { Code, Zap } from "lucide-react";

interface MatrixDemoProps {
  isRunning: boolean;
  showOutput: boolean;
}

export const MatrixDemo = ({ isRunning, showOutput }: MatrixDemoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [speed, setSpeed] = useState(50);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current || !showOutput) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let frameCount = 0;

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      frameCount++;
      if (frameCount % Math.max(1, 10 - Math.floor(speed / 10)) !== 0) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient effect - brighter at the head
        if (drops[i] * fontSize > 0) {
          ctx.fillStyle = '#0F0';
          ctx.fillText(char, x, y);

          // Add glow to leading character
          if (Math.random() > 0.98) {
            ctx.fillStyle = '#fff';
            ctx.fillText(char, x, y);
          }
        }

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showOutput, speed]);

  return (
    <div className="space-y-6">
      {showOutput && (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-green-500/20 blur-3xl rounded-xl" />
          
          <div className="relative bg-gradient-to-br from-background via-green-500/5 to-background border-2 border-green-500/30 rounded-xl p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Code className="w-6 h-6 text-green-400 animate-pulse" />
                <h4 className="text-lg font-bold text-foreground">Matrix Rain</h4>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Скорость:</span>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-32"
                />
                <span className="text-sm font-bold text-green-400">{speed}%</span>
              </div>
            </div>

            <div className="relative">
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="w-full h-auto bg-black rounded-lg border-2 border-green-500/20"
              />
              <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-sm border border-green-500/50 rounded-lg px-4 py-2 text-xs text-green-400 font-mono">
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 animate-pulse" />
                  <span>Wake up, Neo...</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400">{canvasRef.current ? Math.floor(canvasRef.current.width / 16) : 0}</div>
                <div className="text-xs text-muted-foreground mt-1">Колонок</div>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400">60 FPS</div>
                <div className="text-xs text-muted-foreground mt-1">Производительность</div>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400">Matrix</div>
                <div className="text-xs text-muted-foreground mt-1">Эффект</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showOutput && (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center space-y-3">
            <Code className="w-16 h-16 mx-auto text-green-500/50 animate-pulse" />
            <p className="text-lg text-green-400 font-mono">Matrix готова...</p>
            <p className="text-sm text-green-400/70 font-mono">Follow the white rabbit</p>
          </div>
        </div>
      )}
    </div>
  );
};
