import { useState, useEffect, useRef } from "react";
import { Waves, Zap } from "lucide-react";

interface WaveDemoProps {
  isRunning: boolean;
  showOutput: boolean;
}

export const WaveDemo = ({ isRunning, showOutput }: WaveDemoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [amplitude, setAmplitude] = useState(50);
  const [frequency, setFrequency] = useState(2);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || !showOutput) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

      colors.forEach((color, layerIndex) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;

        for (let x = 0; x < canvas.width; x++) {
          const y = centerY + 
            Math.sin((x * frequency / 100) + timeRef.current + layerIndex) * amplitude +
            Math.sin((x * frequency / 50) + timeRef.current * 2 + layerIndex) * (amplitude / 2);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      timeRef.current += 0.05;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showOutput, amplitude, frequency]);

  return (
    <div className="space-y-6">
      {showOutput && (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-xl" />
          
          <div className="relative bg-gradient-to-br from-background via-primary/5 to-background border-2 border-primary/30 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Waves className="w-6 h-6 text-primary animate-pulse" />
                <h4 className="text-lg font-bold text-foreground">Wave Animation</h4>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              className="w-full h-auto bg-black rounded-lg border-2 border-primary/20"
            />

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Амплитуда:</span>
                  <span className="text-sm font-bold text-primary">{amplitude}px</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={amplitude}
                  onChange={(e) => setAmplitude(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Частота:</span>
                  <span className="text-sm font-bold text-secondary">{frequency}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-xs text-muted-foreground mt-1">Слоёв</div>
              </div>
              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-secondary">Sin</div>
                <div className="text-xs text-muted-foreground mt-1">Функция</div>
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
            <Waves className="w-16 h-16 mx-auto text-primary/50 animate-pulse" />
            <p className="text-lg">Wave Animation готова...</p>
            <p className="text-sm">Sine Waves + Math</p>
          </div>
        </div>
      )}
    </div>
  );
};
