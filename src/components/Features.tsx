import { Brain, Gamepad2, Users, Trophy, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Обучение через игру",
    description: "Каждый урок — это увлекательное приключение, где программирование становится частью игры",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Gamepad2,
    title: "Практические проекты",
    description: "Создавайте реальные игры, приложения и сайты с первых уроков",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Users,
    title: "Менторская поддержка",
    description: "Персональная помощь на каждом этапе обучения, никто не останется позади",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Trophy,
    title: "Система достижений",
    description: "Мотивационная система с наградами за прогресс и выполненные проекты",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Zap,
    title: "Современные технологии",
    description: "Работа с актуальными инструментами, которые используют профессионалы",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Shield,
    title: "Безопасная среда",
    description: "Обучение в безопасной, контролируемой среде с защитой данных",
    color: "bg-accent/10 text-accent",
  },
];

export const Features = ({ id }: { id?: string }) => {
  return (
    <section id={id} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Почему это <span className="bg-gradient-primary bg-clip-text text-transparent">особенный курс?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Мы не просто учим коду — мы развиваем будущих профессионалов через специальную методику
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-card rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-card border border-primary/10 rounded-2xl p-8 space-y-4 hover:shadow-card transition-all duration-300 hover:translate-y-[-4px]">
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
