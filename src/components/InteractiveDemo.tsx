import { useState, useEffect } from "react";
import { Play, Code, Sparkles, Zap, Box, Gamepad2, Orbit, Check, Waves, Bird, Dna } from "lucide-react";
import { ParticleDemo } from "./demos/ParticleDemo";
import { WebGLDemo } from "./demos/WebGLDemo";
import { MatrixDemo } from "./demos/MatrixDemo";
import { GameDemo } from "./demos/GameDemo";
import { GravityDemo } from "./demos/GravityDemo";
import { SnakeDemo } from "./demos/SnakeDemo";
import { WaveDemo } from "./demos/WaveDemo";
import { FlappyBirdDemo } from "./demos/FlappyBirdDemo";
import { DNAHelixDemo } from "./demos/DNAHelixDemo";

const codeExamples = [
  {
    title: "Particle System",
    language: "JavaScript + Canvas",
    icon: Sparkles,
    code: `// Создаём систему частиц с физикой
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 4 - 2;
    this.vy = Math.random() * 4 - 2;
    this.life = 1.0;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1; // гравитация
    this.life -= 0.01;
  }
}

// Создаём взрыв из 100 частиц
for (let i = 0; i < 100; i++) {
  particles.push(new Particle(mouseX, mouseY));
}`,
    output: "Красивые частицы с физикой!",
  },
  {
    title: "3D WebGL Cube",
    language: "WebGL + Shaders",
    icon: Box,
    code: `// Создаём 3D куб с шейдерами
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(2, 2, 2);

const shader = {
  vertex: \`varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }\`,
  fragment: \`varying vec3 vNormal;
    void main() {
      gl_FragColor = vec4(vNormal * 0.5 + 0.5, 1.0);
    }\`
};`,
    output: "Интерактивный 3D куб создан!",
  },
  {
    title: "Matrix Rain",
    language: "Canvas + Animation",
    icon: Code,
    code: `// Эффект из фильма "Матрица"
const chars = 'アイウエオ01';
const drops = [];

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = '#0F0';
  ctx.font = '16px monospace';
  
  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * 16, drops[i] * 16);
    
    if (drops[i] * 16 > height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}`,
    output: "Matrix эффект работает!",
  },
  {
    title: "Interactive Game",
    language: "JavaScript + Canvas",
    icon: Gamepad2,
    code: `// Простая игра с управлением
const player = {
  x: 50,
  y: 200,
  width: 30,
  height: 30,
  velocityY: 0,
  jumping: false
};

function jump() {
  if (!player.jumping) {
    player.velocityY = -12;
    player.jumping = true;
  }
}

// Обработка столкновений и гравитации
player.velocityY += 0.5;
player.y += player.velocityY;`,
    output: "Игра запущена! Управляй персонажем!",
  },
  {
    title: "Gravity Simulator",
    language: "Physics + Canvas",
    icon: Orbit,
    code: `// Симулятор гравитации планет
const G = 0.5; // Гравитационная константа

planets.forEach(planet => {
  let fx = 0, fy = 0;
  
  // Считаем силы от других планет
  others.forEach(other => {
    const dx = other.x - planet.x;
    const dy = other.y - planet.y;
    const distSq = dx * dx + dy * dy;
    const dist = Math.sqrt(distSq);
    
    const force = (G * planet.mass * other.mass) / distSq;
    fx += (force * dx) / dist;
    fy += (force * dy) / dist;
  });
  
  // Обновляем скорость и позицию
  planet.vx += fx / planet.mass;
  planet.vy += fy / planet.mass;
  planet.x += planet.vx;
  planet.y += planet.vy;
});`,
    output: "Планеты притягиваются!",
  },
  {
    title: "Snake Game",
    language: "JavaScript + Canvas",
    icon: Gamepad2,
    code: `// Классическая змейка
const snake = [{ x: 10, y: 10 }];
let direction = 'RIGHT';
let food = { x: 15, y: 15 };

function gameLoop() {
  const head = { ...snake[0] };
  
  if (direction === 'RIGHT') head.x++;
  if (direction === 'LEFT') head.x--;
  if (direction === 'UP') head.y--;
  if (direction === 'DOWN') head.y++;
  
  snake.unshift(head);
  
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    generateFood();
  } else {
    snake.pop();
  }
}`,
    output: "Змейка работает!",
  },
  {
    title: "Wave Animation",
    language: "Canvas + Math",
    icon: Waves,
    code: `// Анимация волн с синусоидами
let time = 0;

function drawWaves() {
  for (let x = 0; x < width; x++) {
    const y = centerY + 
      Math.sin((x * frequency / 100) + time) * amplitude +
      Math.sin((x * frequency / 50) + time * 2) * (amplitude / 2);
    
    ctx.lineTo(x, y);
  }
  
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  time += 0.05;
}`,
    output: "Волны двигаются!",
  },
  {
    title: "Flappy Bird",
    language: "JavaScript + Physics",
    icon: Bird,
    code: `// Игра Flappy Bird
const bird = { y: 200, velocity: 0 };
const pipes = [];
const gravity = 0.5;
const jumpStrength = -10;

function gameLoop() {
  // Применяем гравитацию
  bird.velocity += gravity;
  bird.y += bird.velocity;
  
  // Обновляем трубы
  pipes.forEach(pipe => {
    pipe.x -= 3;
    
    // Проверка столкновения
    if (bird.x + size > pipe.x && 
        bird.x < pipe.x + width &&
        (bird.y < pipe.gapY || bird.y + size > pipe.gapY + gap)) {
      gameOver();
    }
  });
}

function jump() {
  bird.velocity = jumpStrength;
}`,
    output: "Птичка летит!",
  },
  {
    title: "DNA Helix",
    language: "3D + Biology",
    icon: Dna,
    code: `// Вращающаяся спираль ДНК
const pairs = 20;
let rotation = 0;

function drawDNA() {
  for (let i = 0; i < pairs; i++) {
    const y = centerY - (pairs * spacing) / 2 + i * spacing;
    const angle = rotation + i * 0.3;
    
    // Левая цепь (синяя)
    const x1 = centerX + Math.cos(angle) * radius;
    const z1 = Math.sin(angle) * radius;
    
    // Правая цепь (розовая)
    const x2 = centerX + Math.cos(angle + Math.PI) * radius;
    const z2 = Math.sin(angle + Math.PI) * radius;
    
    // Рисуем пару оснований
    drawBasePair(x1, y, x2, y, z1, z2);
  }
  
  rotation += 0.02;
}`,
    output: "ДНК вращается!",
  },
];

export const InteractiveDemo = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    // Reset state when switching demos
    setShowOutput(false);
    setCurrentLine(-1);
    setIsRunning(false);
  }, [activeDemo]);

  const handleRun = async () => {
    setIsRunning(true);
    setShowOutput(false);
    setCurrentLine(-1);

    const lines = codeExamples[activeDemo].code.split('\n').length;

    // Animate code execution line by line
    for (let i = 0; i < lines; i++) {
      setCurrentLine(i);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setCurrentLine(-1);

    // Show output after code animation
    await new Promise(resolve => setTimeout(resolve, 500));
    setShowOutput(true);
  };

  return (
    <section className="relative py-40 px-4 overflow-hidden">
      {/* Premium multilayer background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent" />

      {/* Animated grid pattern with depth */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 100%)',
        transform: 'perspective(1000px) rotateX(60deg)',
        transformOrigin: 'center top'
      }} />

      {/* Multiple layered glow orbs with advanced animations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/8 rounded-full blur-[200px] animate-morph" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-secondary/6 rounded-full blur-[180px] animate-morph" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] animate-morph" style={{ animationDelay: '6s' }} />

      {/* Floating code symbols with premium styling */}
      <div className="absolute top-20 left-10 text-7xl text-primary/8 animate-float font-mono font-bold" style={{ textShadow: '0 0 40px hsl(var(--primary) / 0.2)' }}>{"<>"}</div>
      <div className="absolute top-40 right-20 text-7xl text-secondary/8 animate-float font-mono font-bold" style={{ animationDelay: '1.5s', textShadow: '0 0 40px hsl(var(--secondary) / 0.2)' }}>{"{ }"}</div>
      <div className="absolute bottom-20 left-1/4 text-7xl text-accent/8 animate-float font-mono font-bold" style={{ animationDelay: '3s', textShadow: '0 0 40px hsl(var(--accent) / 0.2)' }}>{"[ ]"}</div>
      <div className="absolute top-1/2 right-10 text-6xl text-primary/8 animate-float font-mono font-bold" style={{ animationDelay: '4.5s', textShadow: '0 0 40px hsl(var(--primary) / 0.2)' }}>{";;"}</div>
      <div className="absolute bottom-1/3 right-1/3 text-6xl text-secondary/8 animate-float font-mono font-bold" style={{ animationDelay: '6s', textShadow: '0 0 40px hsl(var(--secondary) / 0.2)' }}>{"=>"}</div>

      <div className="relative max-w-7xl mx-auto">
        {/* Premium Header Section */}
        <div className="text-center mb-20 space-y-8 animate-fade-in">
          {/* Badge with sophisticated design */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-20 animate-glow-pulse" />
            <div className="absolute inset-0 bg-gradient-secondary rounded-full blur-2xl opacity-15 animate-glow-pulse" style={{ animationDelay: '1s' }} />
            <div className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-card/90 via-card/70 to-card/90 border-2 border-primary/30 rounded-full backdrop-blur-xl shadow-2xl">
              <div className="relative">
                <Zap className="w-6 h-6 text-primary animate-pulse" />
                <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full" />
              </div>
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">Попробуй прямо сейчас</span>
            </div>
          </div>

          {/* Main heading with premium typography */}
          <div className="space-y-2">
            <h2 className="text-6xl md:text-8xl font-black leading-none tracking-tight text-foreground">
              Интерактивное
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Программирование
              </span>
            </h2>
          </div>

          {/* Enhanced description */}
          <div className="space-y-3 max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl text-foreground/90 font-semibold leading-relaxed">
              Попробуй разные языки программирования и моментально увидь результат
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Нажимай на примеры кода, чтобы запустить их и увидеть магию программирования в действии
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Demo selector */}
          <div className="space-y-4 lg:space-y-6">
            {codeExamples.map((demo, index) => (
              <button
                key={index}
                onClick={() => setActiveDemo(index)}
                className={`group relative w-full text-left p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl border-2 transition-all duration-500 overflow-hidden ${activeDemo === index
                  ? "border-primary/50 shadow-2xl scale-[1.02]"
                  : "border-border/30 hover:border-primary/30 active:scale-[0.98]"
                  }`}
              >
                {/* Premium layered background effects */}
                {activeDemo === index && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-card/95 via-primary/5 to-card/95 backdrop-blur-xl" />
                    <div className="absolute inset-0 bg-gradient-primary opacity-5 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    <div className="absolute inset-0 bg-gradient-secondary opacity-5 animate-shimmer" style={{ backgroundSize: '200% 100%', animationDelay: '1s' }} />
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-primary opacity-20 blur-2xl -z-10" />
                  </>
                )}
                {activeDemo !== index && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-card/60 via-card/40 to-card/60 backdrop-blur-sm" />
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                  </>
                )}

                <div className="relative flex items-start gap-5">
                  {/* Premium icon with multiple layers */}
                  <div className="relative flex-shrink-0">
                    {activeDemo === index && (
                      <div className="absolute inset-0 bg-gradient-primary opacity-30 blur-xl rounded-2xl scale-125" />
                    )}
                    <div className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center transition-all duration-500 ${activeDemo === index
                      ? "bg-gradient-primary shadow-glow scale-110"
                      : "bg-gradient-to-br from-muted/50 to-muted/30 group-hover:from-primary/20 group-hover:to-primary/10"
                      }`}>
                      <demo.icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 transition-all duration-500 ${activeDemo === index
                        ? "text-primary-foreground drop-shadow-lg"
                        : "text-muted-foreground group-hover:text-primary group-hover:scale-110"
                        }`} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-2 lg:space-y-3">
                    <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold transition-all duration-300 ${activeDemo === index
                      ? "text-foreground"
                      : "text-foreground/80 group-hover:text-foreground"
                      }`}>
                      {demo.title}
                    </h3>
                    <div className="flex items-center gap-2 lg:gap-3">
                      <span className={`text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold transition-all duration-300 ${activeDemo === index
                        ? "bg-gradient-primary text-primary-foreground shadow-lg"
                        : "bg-gradient-to-r from-muted/80 to-muted/60 text-muted-foreground group-hover:from-primary/20 group-hover:to-primary/10 group-hover:text-primary"
                        }`}>
                        {demo.language}
                      </span>
                      {activeDemo === index && (
                        <div className="flex items-center gap-2 text-sm text-primary font-bold animate-slide-up-fade bg-primary/10 px-3 py-1.5 rounded-full">
                          <Check className="w-4 h-4" />
                          <span>Активно</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Premium Code preview section */}
          <div className="space-y-8">
            <div className="relative group">
              {/* Premium outer glow */}
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-secondary rounded-3xl opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-700" style={{ transitionDelay: '100ms' }} />

              <div className="relative bg-gradient-to-br from-card/95 via-card/80 to-card/95 border-2 border-border/40 hover:border-primary/50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-glow backdrop-blur-xl transition-all duration-500">
                {/* Premium editor header */}
                <div className="flex items-center justify-between px-8 py-6 border-b-2 border-border/30 bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 backdrop-blur-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 hover:scale-110 transition-transform cursor-pointer shadow-lg" />
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 hover:scale-110 transition-transform cursor-pointer shadow-lg" />
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 hover:scale-110 transition-transform cursor-pointer shadow-lg" />
                  </div>
                  <div className="flex items-center gap-3 px-5 py-2.5 bg-background/80 rounded-xl border border-border/50 shadow-lg backdrop-blur-sm">
                    <Code className="w-5 h-5 text-accent" />
                    <span className="text-base font-bold text-foreground">
                      {codeExamples[activeDemo].language}
                    </span>
                  </div>
                  <button
                    onClick={handleRun}
                    disabled={isRunning}
                    className="relative group/btn flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-7 lg:py-3.5 bg-gradient-primary text-primary-foreground rounded-lg sm:rounded-xl font-bold hover:scale-105 active:scale-95 hover:shadow-glow transition-all disabled:opacity-50 disabled:hover:scale-100 overflow-hidden shadow-lg touch-manipulation"
                  >
                    {isRunning && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    )}
                    <Play className={`w-5 h-5 sm:w-6 sm:h-6 relative z-10 ${isRunning ? "animate-pulse" : "group-hover/btn:scale-110 transition-transform"}`} />
                    <span className="relative z-10 text-base sm:text-lg">{isRunning ? "Запуск..." : "Запустить"}</span>
                  </button>
                </div>

                {/* Code with premium styling */}
                <div className="p-8 font-mono text-lg space-y-3 bg-gradient-to-br from-background/70 via-card/40 to-background/70 relative overflow-hidden">
                  {/* Subtle scanline effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

                  {codeExamples[activeDemo].code.split('\n').map((line, i) => (
                    <div
                      key={i}
                      className={`flex gap-5 px-4 py-2.5 rounded-xl transition-all duration-300 relative ${currentLine === i
                        ? 'bg-gradient-primary/20 scale-[1.02] shadow-glow animate-code-highlight'
                        : currentLine > i && isRunning
                          ? 'bg-secondary/10'
                          : ''
                        }`}
                    >
                      {currentLine === i && (
                        <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-xl rounded-xl" />
                      )}
                      <span className="text-muted-foreground/70 select-none flex items-center gap-2 min-w-[3ch] relative z-10">
                        {currentLine === i && <Check className="w-4 h-4 text-primary animate-scale-bounce" />}
                        {i + 1}
                      </span>
                      <span className={`text-foreground transition-all relative z-10 leading-relaxed ${currentLine === i ? 'text-primary font-bold animate-glow-pulse' : ''
                        }`}>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Output - Visual Results */}
            <div className="relative group">
              {/* Multi-layer glow effect */}
              <div className="absolute inset-0 bg-gradient-secondary rounded-3xl opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-accent rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700" style={{ transitionDelay: '150ms' }} />

              <div className="relative bg-gradient-to-br from-card/95 via-card/80 to-card/95 border-2 border-border/40 hover:border-secondary/50 rounded-3xl p-8 min-h-[280px] backdrop-blur-xl shadow-2xl hover:shadow-glow transition-all duration-500">
                {/* Premium header */}
                <div className="flex items-center justify-between mb-8 pb-5 border-b-2 border-border/30">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-secondary/30 rounded-full blur-lg" />
                      <div className="relative flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-secondary to-accent shadow-lg animate-pulse" />
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-accent to-primary shadow-lg animate-pulse" style={{ animationDelay: '0.3s' }} />
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg animate-pulse" style={{ animationDelay: '0.6s' }} />
                      </div>
                    </div>
                    <span className="text-xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                      Результат выполнения
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/30 rounded-full blur-lg animate-glow-pulse" />
                    <Sparkles className="relative w-6 h-6 text-accent animate-pulse" />
                  </div>
                </div>

                {/* Particle System Demo */}
                {activeDemo === 0 && (
                  <ParticleDemo
                    isRunning={isRunning}
                    showOutput={showOutput}
                  />
                )}

                {/* WebGL 3D Cube Demo */}
                {activeDemo === 1 && (
                  <WebGLDemo
                    isRunning={isRunning}
                    showOutput={showOutput}
                  />
                )}

                {/* Matrix Rain Demo */}
                {activeDemo === 2 && (
                  <MatrixDemo
                    isRunning={isRunning}
                    showOutput={showOutput}
                  />
                )}

                {/* Interactive Game Demo */}
                {activeDemo === 3 && (
                  <GameDemo
                    isRunning={isRunning}
                    showOutput={showOutput}
                  />
                )}

                {/* Gravity Simulator Demo */}
                {activeDemo === 4 && (
                  <GravityDemo
                    isRunning={isRunning}
                    showOutput={showOutput}
                  />
                )}

                {/* Snake Game Demo */}
                {activeDemo === 5 && (
                  <SnakeDemo
                    isRunning={isRunning}
                    showOutput={showOutput}
                  />
                )}

                {/* Wave Animation Demo */}
                {activeDemo === 6 && (
                  <WaveDemo
                    isRunning={isRunning}
                    showOutput={showOutput}
                  />
                )}

                {/* Flappy Bird Demo */}
                {activeDemo === 7 && (
                  <FlappyBirdDemo
                    isRunning={isRunning}
                    showOutput={showOutput}
                  />
                )}

                {/* DNA Helix Demo */}
                {activeDemo === 8 && (
                  <DNAHelixDemo
                    isRunning={isRunning}
                    showOutput={showOutput}
                  />
                )}

                {!showOutput && !isRunning && (
                  <div className="flex items-center justify-center h-32 text-muted-foreground">
                    Нажми "Запустить" чтобы увидеть магию! ✨
                  </div>
                )}
              </div>
            </div>

            {/* Info card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-accent rounded-2xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity" />
              <div className="relative p-8 bg-gradient-card border-2 border-accent/30 rounded-2xl backdrop-blur-sm shadow-glow overflow-hidden">
                {/* Background animation */}
                <div className="absolute inset-0 bg-gradient-primary opacity-5 animate-morph" />

                <div className="relative flex items-start gap-5">
                  <div className="p-4 bg-gradient-to-br from-accent/30 to-accent/10 rounded-xl shadow-glow">
                    <Sparkles className="w-8 h-8 text-accent animate-glow-pulse" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
                      Профессиональный уровень!
                      <span className="text-2xl animate-bounce-slow">🚀</span>
                    </h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      В курсе ты освоишь <span className="text-primary font-bold">системы частиц</span>,
                      <span className="text-secondary font-bold"> 3D графику</span>,
                      <span className="text-accent font-bold"> физику гравитации</span> и создание игр.
                      От простого к сложному — <span className="font-bold">как настоящий профи</span>! 💻✨
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
