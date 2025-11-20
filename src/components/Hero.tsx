import { Button } from "@/components/ui/button";
import { Sparkles, Code, Rocket } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated background elements with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        
        {/* Floating code symbols */}
        <div className="absolute top-20 left-10 text-8xl text-primary/5 font-mono animate-float">{"{ }"}</div>
        <div className="absolute top-1/3 right-20 text-6xl text-secondary/5 font-mono animate-bounce-slow">{"<>"}</div>
        <div className="absolute bottom-1/4 left-1/3 text-7xl text-accent/5 font-mono animate-pulse-slow">{"[ ]"}</div>
        <div className="absolute top-2/3 right-1/4 text-5xl text-primary/5 font-mono animate-float">{'=>'}</div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-primary/20 mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Специальный подход для детей</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          <span className="bg-gradient-hero bg-clip-text text-transparent inline-block">
            {"Детский Курс".split("").map((char, i) => (
              <span
                key={i}
                className="inline-block animate-fly-in"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  animationFillMode: 'backwards'
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
          <br />
          <span className="inline-block relative">
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent blur-2xl opacity-50 animate-pulse-slow pointer-events-none" />
            <span className="relative inline-block">
              {"VIBE CODING".split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block animate-fly-in bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-black"
                  style={{
                    animationDelay: `${(i + 12) * 0.05}s`,
                    animationFillMode: 'backwards'
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Превратите вашего ребёнка в настоящего программиста с помощью уникальной методики обучения, разработанной специально для детского восприятия
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <a href="#modules">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 rounded-full">
              <Code className="w-5 h-5 mr-2" />
              Подробнее о курсе
            </Button>
          </a>
        </div>

        <div className="pt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>Возраст 8-16 лет</span>
          </div>
          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span>15 модулей • 80+ видео</span>
          </div>
          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span>Доступ навсегда</span>
          </div>
          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>Реальные навыки программирования</span>
          </div>
        </div>
      </div>
    </section>
  );
};
