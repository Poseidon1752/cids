import { Video, BookOpen, Award, Infinity } from "lucide-react";

const stats = [
  {
    icon: BookOpen,
    value: "15",
    label: "Интерактивных модулей",
    color: "text-primary",
  },
  {
    icon: Video,
    value: "60+",
    label: "Видеоуроков с практикой",
    color: "text-secondary",
  },
  {
    icon: Award,
    value: "100+",
    label: "Готовых проектов",
    color: "text-accent",
  },
  {
    icon: Infinity,
    value: "∞",
    label: "Поддержка и обновления",
    color: "text-primary",
  },
];

export const Stats = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-card rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-card border border-primary/10 rounded-2xl p-8 text-center space-y-4 hover:shadow-card transition-all duration-300 hover:translate-y-[-4px]">
                <div className="flex justify-center">
                  <div className={`${stat.color} p-3 bg-background/50 rounded-xl`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                </div>
                <div>
                  <div className={`text-5xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground mt-2 text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
