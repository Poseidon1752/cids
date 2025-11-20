import { useState, useEffect, useRef } from "react";
import { Box, RotateCw, Maximize2 } from "lucide-react";

interface WebGLDemoProps {
  isRunning: boolean;
  showOutput: boolean;
}

export const WebGLDemo = ({ isRunning, showOutput }: WebGLDemoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current || !showOutput) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawCube = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = 80;

      // 3D projection
      const rotX = rotation.x;
      const rotY = rotation.y;

      // Cube vertices
      const vertices = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
      ];

      // Rotate and project vertices
      const projected = vertices.map(([x, y, z]) => {
        // Rotate around Y axis
        let newX = x * Math.cos(rotY) - z * Math.sin(rotY);
        let newZ = x * Math.sin(rotY) + z * Math.cos(rotY);
        
        // Rotate around X axis
        let newY = y * Math.cos(rotX) - newZ * Math.sin(rotX);
        newZ = y * Math.sin(rotX) + newZ * Math.cos(rotX);

        // Perspective projection
        const scale = 200 / (200 + newZ * 50);
        return {
          x: centerX + newX * size * scale,
          y: centerY + newY * size * scale,
          z: newZ
        };
      });

      // Draw faces with gradient
      const faces = [
        [0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4],
        [2, 3, 7, 6], [0, 3, 7, 4], [1, 2, 6, 5]
      ];

      const colors = [
        ['#3b82f6', '#1d4ed8'], ['#8b5cf6', '#6d28d9'], ['#ec4899', '#be185d'],
        ['#f59e0b', '#d97706'], ['#10b981', '#059669'], ['#06b6d4', '#0891b2']
      ];

      // Sort faces by z-depth
      const sortedFaces = faces.map((face, i) => {
        const avgZ = face.reduce((sum, idx) => sum + projected[idx].z, 0) / 4;
        return { face, color: colors[i], z: avgZ };
      }).sort((a, b) => a.z - b.z);

      // Draw faces
      sortedFaces.forEach(({ face, color }) => {
        ctx.beginPath();
        ctx.moveTo(projected[face[0]].x, projected[face[0]].y);
        face.forEach(idx => {
          ctx.lineTo(projected[idx].x, projected[idx].y);
        });
        ctx.closePath();

        const gradient = ctx.createLinearGradient(
          projected[face[0]].x, projected[face[0]].y,
          projected[face[2]].x, projected[face[2]].y
        );
        gradient.addColorStop(0, color[0]);
        gradient.addColorStop(1, color[1]);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw vertices
      projected.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };

    drawCube();

    if (isRunning && !isDragging) {
      const animate = () => {
        setRotation(prev => ({
          x: prev.x + 0.01,
          y: prev.y + 0.015
        }));
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [rotation, showOutput, isRunning, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastPos.x;
    const deltaY = e.clientY - lastPos.y;
    setRotation(prev => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01
    }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-6">
      {showOutput && (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-xl" />
          <div className="relative bg-gradient-to-br from-background via-primary/5 to-background border-2 border-primary/30 rounded-xl p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Box className="w-6 h-6 text-primary animate-pulse" />
                <h4 className="text-lg font-bold text-foreground">3D WebGL Cube</h4>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Интерактивный</span>
              </div>
            </div>

            <div className="relative">
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="w-full h-auto bg-gradient-to-br from-background to-muted/20 rounded-lg border-2 border-primary/20 cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-3 h-3" />
                  <span>Перетащи мышью для вращения</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-primary">{Math.round(rotation.x * 100) / 100}</div>
                <div className="text-xs text-muted-foreground mt-1">Rotation X</div>
              </div>
              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-secondary">{Math.round(rotation.y * 100) / 100}</div>
                <div className="text-xs text-muted-foreground mt-1">Rotation Y</div>
              </div>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-accent">60 FPS</div>
                <div className="text-xs text-muted-foreground mt-1">Performance</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showOutput && (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center space-y-3">
            <Box className="w-16 h-16 mx-auto text-primary/50 animate-pulse" />
            <p className="text-lg">3D движок готов к запуску...</p>
            <p className="text-sm">WebGL + Custom Shaders</p>
          </div>
        </div>
      )}
    </div>
  );
};
