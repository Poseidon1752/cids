import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Максим, 12 лет",
    text: "Я создал своё первое приложение уже через месяц! Теперь все друзья просят меня сделать что-то крутое. Спасибо за понятные уроки!",
    rating: 5,
    achievement: "Создал 3 игры",
    avatar: "👦",
  },
  {
    name: "София, 10 лет",
    text: "Мне очень нравится программировать! Раньше думала, что это сложно, но на курсе всё так интересно объясняют. Уже сделала свой сайт!",
    rating: 5,
    achievement: "Запустила свой сайт",
    avatar: "👧",
  },
  {
    name: "Артём, 14 лет",
    text: "Крутой курс! Особенно понравился модуль про ИИ и создание ботов. Сделал бота для нашего школьного чата, все в восторге!",
    rating: 5,
    achievement: "Заработал первые $50",
    avatar: "🧑",
  },
  {
    name: "Мария (мама Даниила)",
    text: "Сын занимается уже 2 месяца. Раньше только в игры играл, а теперь сам их создаёт! Курс действительно затягивает детей в полезное дело.",
    rating: 5,
    achievement: "Родитель довольный",
    avatar: "👩",
  },
];

export const Testimonials = ({ id }: { id?: string }) => {
  return (
    <section id={id} className="py-20 px-4 bg-gradient-to-b from-background to-card/30 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-primary/20 mb-6">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Отзывы учеников</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Что говорят наши студенты?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Реальные истории успеха детей, которые прошли курс
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-card rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-card border border-primary/10 rounded-2xl p-8 space-y-4 hover:shadow-glow transition-all duration-300 hover:translate-y-[-4px]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <h3 className="font-bold text-foreground">{testimonial.name}</h3>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>

                <Quote className="w-8 h-8 text-primary/20" />
                
                <p className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="pt-4 border-t border-border">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs text-primary font-medium">
                    🏆 {testimonial.achievement}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-primary rounded-2xl p-1">
            <div className="bg-background rounded-xl px-8 py-6">
              <div className="flex flex-wrap justify-center gap-8 items-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">50+</div>
                  <div className="text-sm text-muted-foreground">Выпускников</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Средний рейтинг</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">120+</div>
                  <div className="text-sm text-muted-foreground">Созданных проектов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
