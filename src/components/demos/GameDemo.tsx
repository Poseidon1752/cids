import { useState, useEffect, useRef } from "react";
import { Gamepad2, Trophy, Zap } from "lucide-react";

interface GameDemoProps {
  isRunning: boolean;
  showOutput: boolean;
}

export const GameDemo = ({ isRunning, showOutput }: GameDemoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [player, setPlayer] = useState({ x: 50, y: 250, velocityY: 0, jumping: false });
  const [obstacles, setObstacles] = useState<Array<{ x: number; y: number; width: number; height: number }>>([]);
  const animationRef = useRef<number>();
  const keysPressed = useRef<Set<string>>(new Set());

  const handleJump = () => {
    if (!player.jumping && gameStarted) {
      setPlayer(prev => ({ ...prev, velocityY: -15, jumping: true }));
    }
  };

  useEffect(() => {
    if (!showOutput) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        handleJump();
      }
      keysPressed.current.add(e.code);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [showOutput, player.jumping, gameStarted]);

  useEffect(() => {
    if (!canvasRef.current || !showOutput || !gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw ground
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 300, canvas.width, 100);

      // Update player
      setPlayer(prev => {
        let newY = prev.y + prev.velocityY;
        let newVelocityY = prev.velocityY + 0.8; // gravity
        let newJumping = prev.jumping;

        if (newY >= 250) {
          newY = 250;
          newVelocityY = 0;
          newJumping = false;
        }

        return {
          ...prev,
          y: newY,
          velocityY: newVelocityY,
          jumping: newJumping
        };
      });

      // Draw player
      const gradient = ctx.createLinearGradient(player.x, player.y, player.x + 30, player.y + 30);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#8b5cf6');
      ctx.fillStyle = gradient;
      ctx.fillRect(player.x, player.y, 30, 30);
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.strokeRect(player.x, player.y, 30, 30);

      // Update obstacles
      setObstacles(prev => {
        const updated = prev.map(obs => ({ ...obs, x: obs.x - 5 })).filter(obs => obs.x > -50);
        
        // Add new obstacle
        if (updated.length === 0 || updated[updated.length - 1].x < 400) {
          if (Math.random() > 0.98) {
            updated.push({
              x: 600,
              y: 270,
              width: 30,
              height: 30
            });
          }
        }

        return updated;
      });

      // Draw obstacles
      obstacles.forEach(obs => {
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 2;
        ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
      });

      // Check collisions
      obstacles.forEach(obs => {
        if (
          player.x < obs.x + obs.width &&
          player.x + 30 > obs.x &&
          player.y < obs.y + obs.height &&
          player.y + 30 > obs.y
        ) {
          // Collision - game over
          setGameStarted(false);
        }
      });

      // Update score
      setScore(prev => prev + 1);

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showOutput, gameStarted, player, obstacles]);

  useEffect(() => {
    if (isRunning && showOutput) {
      setTimeout(() => {
        setGameStarted(true);
        setScore(0);
        setObstacles([]);
        setPlayer({ x: 50, y: 250, velocityY: 0, jumping: false });
      }, 500);
    }
  }, [isRunning, showOutput]);

  return (
    <div className="space-y-6">
      {showOutput && (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-xl" />
          
          <div className="relative bg-gradient-to-br from-background via-primary/5 to-background border-2 border-primary/30 rounded-xl p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-6 h-6 text-primary animate-pulse" />
                <h4 className="text-lg font-bold text-foreground">Jump Game</h4>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full border border-primary/50">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-primary font-bold">Счёт: {Math.floor(score / 10)}</span>
                </div>
                {gameStarted && (
                  <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1.5 rounded-full border border-green-500/50">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-green-400">Playing</span>
                  </div>
                )}
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
                className="w-full h-auto bg-black rounded-lg border-2 border-primary/20 cursor-pointer touch-none"
              />
              {!gameStarted && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
                  <div className="text-center space-y-4">
                    <Gamepad2 className="w-16 h-16 mx-auto text-primary animate-pulse" />
                    <div className="text-xl sm:text-2xl font-bold text-foreground px-4">
                      {score > 0 ? `Game Over! Счёт: ${Math.floor(score / 10)}` : 'Тапни или нажми ПРОБЕЛ'}
                    </div>
                    <button
                      onClick={() => {
                        setGameStarted(true);
                        setScore(0);
                        setObstacles([]);
                        setPlayer({ x: 50, y: 250, velocityY: 0, jumping: false });
                      }}
                      className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-bold hover:scale-105 transition-transform"
                    >
                      {score > 0 ? 'Играть снова' : 'Начать игру'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-primary">{Math.floor(score / 10)}</div>
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
            <Gamepad2 className="w-16 h-16 mx-auto text-primary/50 animate-pulse" />
            <p className="text-lg">Игра готова к запуску...</p>
            <p className="text-sm">Canvas + Game Loop + Physics</p>
          </div>
        </div>
      )}
    </div>
  );
};
