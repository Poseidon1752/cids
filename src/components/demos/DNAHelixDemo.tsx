import { useState, useEffect, useRef } from "react";
import { Dna, Zap } from "lucide-react";

interface DNAHelixDemoProps {
  isRunning: boolean;
  showOutput: boolean;
}

export const DNAHelixDemo = ({ isRunning, showOutput }: DNAHelixDemoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [speed, setSpeed] = useState(1);
  const [pairs, setPairs] = useState(20);
  const animationRef = useRef<number>();
  const rotationRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || !showOutput) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const spacing = 15;

    const draw = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw DNA strands
      for (let i = 0; i < pairs; i++) {
        const y = centerY - (pairs * spacing) / 2 + i * spacing;
        const angle = rotationRef.current + i * 0.3;

        // Calculate positions for both strands
        const x1 = centerX + Math.cos(angle) * radius;
        const z1 = Math.sin(angle) * radius;
        
        const x2 = centerX + Math.cos(angle + Math.PI) * radius;
        const z2 = Math.sin(angle + Math.PI) * radius;

        // Perspective scaling
        const scale1 = 1 + z1 / 200;
        const scale2 = 1 + z2 / 200;

        // Draw connecting line (base pair)
        const gradient = ctx.createLinearGradient(x1, y, x2, y);
        gradient.addColorStop(0, z1 > 0 ? '#3b82f6' : '#1d4ed8');
        gradient.addColorStop(0.5, '#8b5cf6');
        gradient.addColorStop(1, z2 > 0 ? '#ec4899' : '#be185d');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();

        // Draw nucleotides (circles)
        // Left strand
        const leftGradient = ctx.createRadialGradient(x1, y, 0, x1, y, 8 * scale1);
        leftGradient.addColorStop(0, z1 > 0 ? '#3b82f6' : '#1d4ed8');
        leftGradient.addColorStop(1, z1 > 0 ? '#1d4ed8' : '#1e3a8a');
        
        ctx.fillStyle = leftGradient;
        ctx.beginPath();
        ctx.arc(x1, y, 8 * scale1, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Right strand
        const rightGradient = ctx.createRadialGradient(x2, y, 0, x2, y, 8 * scale2);
        rightGradient.addColorStop(0, z2 > 0 ? '#ec4899' : '#be185d');
        rightGradient.addColorStop(1, z2 > 0 ? '#be185d' : '#9f1239');
        
        ctx.fillStyle = rightGradient;
        ctx.beginPath();
        ctx.arc(x2, y, 8 * scale2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw backbone connections
        if (i < pairs - 1) {
          const nextAngle = rotationRef.current + (i + 1) * 0.3;
          const nextX1 = centerX + Math.cos(nextAngle) * radius;
          const nextY = y + spacing;
          const nextZ1 = Math.sin(nextAngle) * radius;
          
          const nextX2 = centerX + Math.cos(nextAngle + Math.PI) * radius;
          const nextZ2 = Math.sin(nextAngle + Math.PI) * radius;

          // Left backbone
          ctx.strokeStyle = z1 > 0 && nextZ1 > 0 ? 'rgba(59, 130, 246, 0.5)' : 'rgba(29, 78, 216, 0.5)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(nextX1, nextY);
          ctx.stroke();

          // Right backbone
          ctx.strokeStyle = z2 > 0 && nextZ2 > 0 ? 'rgba(236, 72, 153, 0.5)' : 'rgba(190, 24, 93, 0.5)';
          ctx.beginPath();
          ctx.moveTo(x2, y);
          ctx.lineTo(nextX2, nextY);
          ctx.stroke();
        }
      }

      // Draw labels
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('DNA Double Helix', centerX, 30);
      
      ctx.font = '12px monospace';
      ctx.fillStyle = '#3b82f6';
      ctx.fillText('Adenine-Thymine', centerX - 150, canvas.height - 20);
      ctx.fillStyle = '#ec4899';
      ctx.fillText('Guanine-Cytosine', centerX + 150, canvas.height - 20);

      rotationRef.current += 0.02 * speed;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showOutput, speed, pairs]);

  return (
    <div className="space-y-6">
      {showOutput && (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl rounded-xl" />
          
          <div className="relative bg-gradient-to-br from-background via-primary/5 to-background border-2 border-primary/30 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Dna className="w-6 h-6 text-primary animate-pulse" />
                <h4 className="text-lg font-bold text-foreground">DNA Helix</h4>
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
                  <span className="text-sm text-muted-foreground">Скорость вращения:</span>
                  <span className="text-sm font-bold text-primary">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Пар оснований:</span>
                  <span className="text-sm font-bold text-secondary">{pairs}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="30"
                  value={pairs}
                  onChange={(e) => setPairs(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-primary">{pairs}</div>
                <div className="text-xs text-muted-foreground mt-1">Пар</div>
              </div>
              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-secondary">3D</div>
                <div className="text-xs text-muted-foreground mt-1">Визуализация</div>
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
            <Dna className="w-16 h-16 mx-auto text-primary/50 animate-pulse" />
            <p className="text-lg">DNA Helix готова...</p>
            <p className="text-sm">3D Rotation + Biology</p>
          </div>
        </div>
      )}
    </div>
  );
};
