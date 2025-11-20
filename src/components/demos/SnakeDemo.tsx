import { useState, useEffect, useRef } from "react";
import { Gamepad2, Trophy } from "lucide-react";

interface SnakeDemoProps {
  isRunning: boolean;
  showOutput: boolean;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export const SnakeDemo = ({ isRunning, showOutput }: SnakeDemoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const animationRef = useRef<number>();
  const snakeRef = useRef<Array<{ x: number; y: number }>>([{ x: 10, y: 10 }]);
  const directionRef = useRef<Direction>('RIGHT');
  const foodRef = useRef({ x: 15, y: 15 });
  const lastUpdateRef = useRef(0);

  const gridSize = 20;
  const cellSize = 20;

  const generateFood = () => {
    foodRef.current = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    };
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!gameStarted) return;
    
    const key = e.key;
    const currentDir = directionRef.current;
    
    if ((key === 'ArrowUp' || key === 'w') && currentDir !== 'DOWN') directionRef.current = 'UP';
    if ((key === 'ArrowDown' || key === 's') && currentDir !== 'UP') directionRef.current = 'DOWN';
    if ((key === 'ArrowLeft' || key === 'a') && currentDir !== 'RIGHT') directionRef.current = 'LEFT';
    if ((key === 'ArrowRight' || key === 'd') && currentDir !== 'LEFT') directionRef.current = 'RIGHT';
  };

  useEffect(() => {
    if (!showOutput) return;
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showOutput, gameStarted]);

  useEffect(() => {
    if (!canvasRef.current || !showOutput || !gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current < 100) {
        animationRef.current = requestAnimationFrame(gameLoop);
        return;
      }
      lastUpdateRef.current = timestamp;

      // Clear canvas
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      for (let i = 0; i <= gridSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
      }

      // Move snake
      const head = { ...snakeRef.current[0] };
      
      switch (directionRef.current) {
        case 'UP': head.y--; break;
        case 'DOWN': head.y++; break;
        case 'LEFT': head.x--; break;
        case 'RIGHT': head.x++; break;
      }

      // Check collision with walls
      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        setGameOver(true);
        setGameStarted(false);
        return;
      }

      // Check collision with self
      if (snakeRef.current.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameStarted(false);
        return;
      }

      snakeRef.current.unshift(head);

      // Check food collision
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore(prev => prev + 10);
        generateFood();
      } else {
        snakeRef.current.pop();
      }

      // Draw food
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(
        foodRef.current.x * cellSize + 2,
        foodRef.current.y * cellSize + 2,
        cellSize - 4,
        cellSize - 4
      );

      // Draw snake
      snakeRef.current.forEach((segment, i) => {
        const gradient = ctx.createLinearGradient(
          segment.x * cellSize,
          segment.y * cellSize,
          (segment.x + 1) * cellSize,
          (segment.y + 1) * cellSize
        );
        gradient.addColorStop(0, i === 0 ? '#3b82f6' : '#8b5cf6');
        gradient.addColorStop(1, i === 0 ? '#1d4ed8' : '#6d28d9');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
          segment.x * cellSize + 1,
          segment.y * cellSize + 1,
          cellSize - 2,
          cellSize - 2
        );
      });

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
    snakeRef.current = [{ x: 10, y: 10 }];
    directionRef.current = 'RIGHT';
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    generateFood();
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
                <Gamepad2 className="w-6 h-6 text-primary animate-pulse" />
                <h4 className="text-lg font-bold text-foreground">Snake Game</h4>
              </div>
              <div className="flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full border border-primary/50">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="text-primary font-bold">Счёт: {score}</span>
              </div>
            </div>

            <div className="relative">
              <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="w-full h-auto bg-black rounded-lg border-2 border-primary/20"
              />
              {(!gameStarted || gameOver) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
                  <div className="text-center space-y-4">
                    <Gamepad2 className="w-16 h-16 mx-auto text-primary animate-pulse" />
                    <div className="text-2xl font-bold text-foreground">
                      {gameOver ? `Game Over! Счёт: ${score}` : 'Используй стрелки или WASD'}
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
                <div className="text-2xl font-bold text-primary">{snakeRef.current.length}</div>
                <div className="text-xs text-muted-foreground mt-1">Длина</div>
              </div>
              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-secondary">{score}</div>
                <div className="text-xs text-muted-foreground mt-1">Очки</div>
              </div>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-accent">WASD</div>
                <div className="text-xs text-muted-foreground mt-1">Управление</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showOutput && (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center space-y-3">
            <Gamepad2 className="w-16 h-16 mx-auto text-primary/50 animate-pulse" />
            <p className="text-lg">Snake Game готова...</p>
            <p className="text-sm">Classic Game + Canvas</p>
          </div>
        </div>
      )}
    </div>
  );
};
