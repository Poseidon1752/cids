import { useState, useEffect, useRef } from "react";
import { Bird, Trophy } from "lucide-react";

interface FlappyBirdDemoProps {
  isRunning: boolean;
  showOutput: boolean;
}

interface Pipe {
  x: number;
  gapY: number;
  passed: boolean;
}

export const FlappyBirdDemo = ({ isRunning, showOutput }: FlappyBirdDemoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const animationRef = useRef<number>();
  const birdRef = useRef({ y: 200, velocity: 0 });
  const pipesRef = useRef<Pipe[]>([]);
  const frameCountRef = useRef(0);

  const birdX = 100;
  const birdSize = 30;
  const pipeWidth = 60;
  const pipeGap = 180;
  const gravity = 0.18;
  const jumpStrength = -5.5;

  const handleJump = () => {
    if (!gameStarted) return;
    birdRef.current.velocity = jumpStrength;
  };

  useEffect(() => {
    if (!showOutput) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showOutput, gameStarted]);

  useEffect(() => {
    if (!canvasRef.current || !showOutput || !gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(100, 50, 30, 0, Math.PI * 2);
      ctx.arc(130, 50, 40, 0, Math.PI * 2);
      ctx.arc(160, 50, 30, 0, Math.PI * 2);
      ctx.fill();

      // Update bird
      birdRef.current.velocity += gravity;
      birdRef.current.y += birdRef.current.velocity;

      // Check ground collision
      if (birdRef.current.y + birdSize > canvas.height - 50) {
        setGameOver(true);
        setGameStarted(false);
        return;
      }

      // Check ceiling collision
      if (birdRef.current.y < 0) {
        setGameOver(true);
        setGameStarted(false);
        return;
      }

      // Update pipes
      frameCountRef.current++;
      if (frameCountRef.current % 120 === 0) {
        pipesRef.current.push({
          x: canvas.width,
          gapY: 100 + Math.random() * 150,
          passed: false
        });
      }

      pipesRef.current = pipesRef.current.filter(pipe => pipe.x > -pipeWidth);
      pipesRef.current.forEach(pipe => {
        pipe.x -= 2;

        // Check if passed
        if (!pipe.passed && pipe.x + pipeWidth < birdX) {
          pipe.passed = true;
          setScore(prev => prev + 1);
        }

        // Draw pipes
        ctx.fillStyle = '#2ecc71';
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.gapY);
        ctx.fillRect(pipe.x, pipe.gapY + pipeGap, pipeWidth, canvas.height - pipe.gapY - pipeGap - 50);
        
        // Pipe borders
        ctx.strokeStyle = '#27ae60';
        ctx.lineWidth = 3;
        ctx.strokeRect(pipe.x, 0, pipeWidth, pipe.gapY);
        ctx.strokeRect(pipe.x, pipe.gapY + pipeGap, pipeWidth, canvas.height - pipe.gapY - pipeGap - 50);

        // Check collision
        if (
          birdX + birdSize > pipe.x &&
          birdX < pipe.x + pipeWidth &&
          (birdRef.current.y < pipe.gapY || birdRef.current.y + birdSize > pipe.gapY + pipeGap)
        ) {
          setGameOver(true);
          setGameStarted(false);
          return;
        }
      });

      // Draw ground
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
      ctx.fillStyle = '#228B22';
      ctx.fillRect(0, canvas.height - 55, canvas.width, 5);

      // Draw bird
      const birdY = birdRef.current.y;
      
      // Bird shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(birdX + 15, canvas.height - 45, 15, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bird body
      const gradient = ctx.createRadialGradient(birdX + 15, birdY + 15, 5, birdX + 15, birdY + 15, 20);
      gradient.addColorStop(0, '#FFD700');
      gradient.addColorStop(1, '#FFA500');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(birdX + 15, birdY + 15, 15, 0, Math.PI * 2);
      ctx.fill();

      // Bird eye
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(birdX + 22, birdY + 12, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(birdX + 23, birdY + 12, 3, 0, Math.PI * 2);
      ctx.fill();

      // Bird beak
      ctx.fillStyle = '#FF6347';
      ctx.beginPath();
      ctx.moveTo(birdX + 28, birdY + 15);
      ctx.lineTo(birdX + 35, birdY + 15);
      ctx.lineTo(birdX + 28, birdY + 18);
      ctx.fill();

      // Bird wing
      ctx.fillStyle = '#FFA500';
      ctx.beginPath();
      ctx.ellipse(birdX + 10, birdY + 20, 8, 12, Math.sin(frameCountRef.current * 0.2) * 0.3, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showOutput, gameStarted]);

  const startGame = () => {
    birdRef.current = { y: 200, velocity: 0 };
    pipesRef.current = [];
    frameCountRef.current = 0;
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  useEffect(() => {
    if (isRunning && showOutput) {
      setTimeout(startGame, 500);
    }
  }, [isRunning, showOutput]);

  return (
    <div className="space-y-6">
      {showOutput && (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-xl" />
          
          <div className="relative bg-gradient-to-br from-background via-primary/5 to-background border-2 border-primary/30 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Bird className="w-6 h-6 text-primary animate-bounce" />
                <h4 className="text-lg font-bold text-foreground">Flappy Bird</h4>
              </div>
              <div className="flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full border border-primary/50">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="text-primary font-bold">Счёт: {score}</span>
              </div>
            </div>

            <div className="relative">
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                onClick={handleJump}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleJump();
                }}
                className="w-full h-auto rounded-lg border-2 border-primary/20 cursor-pointer touch-none"
              />
              {(!gameStarted || gameOver) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
                  <div className="text-center space-y-4">
                    <Bird className="w-16 h-16 mx-auto text-primary animate-bounce" />
                    <div className="text-xl sm:text-2xl font-bold text-foreground px-4">
                      {gameOver ? `Game Over! Счёт: ${score}` : 'Тапни или нажми ПРОБЕЛ'}
                    </div>
                    <button
                      onClick={startGame}
                      className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-bold hover:scale-105 transition-transform"
                    >
                      {gameOver ? 'Играть снова' : 'Начать игру'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-primary">{score}</div>
                <div className="text-xs text-muted-foreground mt-1">Очки</div>
              </div>
              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-secondary">КЛИК</div>
                <div className="text-xs text-muted-foreground mt-1">Прыжок</div>
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
            <Bird className="w-16 h-16 mx-auto text-primary/50 animate-bounce" />
            <p className="text-lg">Flappy Bird готова...</p>
            <p className="text-sm">Classic Game + Physics</p>
          </div>
        </div>
      )}
    </div>
  );
};
