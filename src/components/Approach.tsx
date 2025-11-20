import { Lightbulb } from "lucide-react";

export const Approach = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-hero rounded-3xl opacity-10 blur-3xl" />
          <div className="relative bg-card border border-primary/20 rounded-3xl p-12 md:p-16 space-y-8">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-primary rounded-full p-4">
                <Lightbulb className="w-12 h-12 text-background" />
              </div>
            </div>

            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Это не просто детский курс — это
                <span className="bg-gradient-primary bg-clip-text text-transparent"> профессиональное обучение </span>
                с особым подходом
              </h2>

              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Мы адаптировали <span className="text-primary font-semibold">профессиональную программу</span> под детское восприятие. 
                  Каждая сложная тема объясняется через понятные примеры, игры и визуальные метафоры.
                </p>
                
                <p>
                  Ваш ребёнок получит доступ к <span className="text-secondary font-semibold">тем же инструментам</span>, 
                  что используют настоящие разработчики, но изучит их в игровой, дружелюбной форме.
                </p>

                <p>
                  После прохождения курса ребёнок не просто будет "уметь программировать" — 
                  он сможет <span className="text-accent font-semibold">создавать настоящие проекты</span> и 
                  продолжить профессиональное развитие самостоятельно.
                </p>
              </div>

              <div className="pt-8 space-y-3">
                <div className="inline-block px-6 py-3 bg-primary/10 border border-primary/20 rounded-full">
                  <span className="text-primary font-semibold">✨ Геймификация + Профессионализм = Идеальное обучение</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
