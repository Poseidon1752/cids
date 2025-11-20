import { Monitor, Smartphone, Palette, Globe, Bot, Lock, Sparkles, Code2, Gamepad2, Zap, Terminal, Rocket, Trophy, MessageSquare, Video } from "lucide-react";
import { useState } from "react";

const modules = [
  {
    number: 1,
    title: "Первые шаги в программировании",
    description: "Изучаем основы через визуальные блоки и простые игры. Создаём первые анимации и интерактивные истории. Ребёнок научится думать алгоритмами и решать задачи через игру.",
    icon: Sparkles,
    videos: 5,
    duration: "2 недели",
    topics: ["Scratch программирование", "Code.org платформа", "Логика и алгоритмы", "Первые проекты", "Анимация персонажей"],
    projects: ["Интерактивная история", "Простая игра", "Музыкальная анимация"],
  },
  {
    number: 2,
    title: "Создание сайтов и игр",
    description: "Учимся делать красивые сайты и простые игры. HTML, CSS и JavaScript становятся понятными через практику. Деплой на хостинг и публикация в интернет.",
    icon: Globe,
    videos: 8,
    duration: "3 недели",
    topics: ["HTML структура", "CSS стилизация", "JavaScript интерактив", "Создание игр", "Адаптивный дизайн", "Хостинг и деплой", "GitHub Pages", "Vercel/Netlify"],
    projects: ["Личная страница", "Игра на JavaScript", "Портфолио сайт онлайн"],
  },
  {
    number: 3,
    title: "Программирование на смартфоне",
    description: "Программируй прямо с телефона! Изучаем Termux и UserLand — создаём код в любом месте. Настоящие приложения без компьютера.",
    icon: Terminal,
    videos: 4,
    duration: "1 неделя",
    topics: ["Termux установка", "UserLand среда", "Python на Android", "Git на телефоне", "Мобильная разработка"],
    projects: ["Telegram бот с телефона", "Скрипты автоматизации"],
  },
  {
    number: 4,
    title: "Мобильные приложения",
    description: "Создаём свои первые приложения для телефонов. Kotlin для Android, React Native для кросс-платформы. От идеи до работающего приложения в сторах.",
    icon: Smartphone,
    videos: 10,
    duration: "4 недели",
    topics: ["App Inventor drag&drop", "Kotlin + Android Studio", "React Native basics", "Flutter basics", "Дизайн интерфейсов", "Тестирование", "Публикация в сторы"],
    projects: ["Калькулятор на Kotlin", "Заметки на React Native", "Игра на Flutter"],
  },
  {
    number: 5,
    title: "Дизайн и творчество",
    description: "Учимся создавать красивый дизайн, работать с цветом и композицией. Figma для юных дизайнеров. Создаём профессиональные макеты.",
    icon: Palette,
    videos: 6,
    duration: "2 недели",
    topics: ["Figma для детей", "Основы UI/UX", "Цвет и типографика", "Анимация в дизайне", "Прототипирование"],
    projects: ["Дизайн мобильного приложения", "Логотип и фирменный стиль", "Анимированный прототип"],
  },
  {
    number: 6,
    title: "Программирование игр",
    description: "Углублённое изучение создания игр. От простых аркад до 3D платформеров. Unity, Godot и создание своих игровых миров.",
    icon: Gamepad2,
    videos: 9,
    duration: "4 недели",
    topics: ["Unity для начинающих", "Scratch advanced", "Физика в играх", "3D моделирование", "Уровни и персонажи", "Звук и музыка"],
    projects: ["Платформер 2D", "Шутер", "3D приключение"],
  },
  {
    number: 7,
    title: "Чат-боты и автоматизация",
    description: "Создаём умных ботов для Telegram, Discord и других мессенджеров. Учимся автоматизировать рутинные задачи и создавать AI-помощников.",
    icon: Bot,
    videos: 6,
    duration: "2 недели",
    topics: ["Telegram боты", "Discord боты", "Автоматизация задач", "API интеграции", "Webhook'и", "База данных"],
    projects: ["Telegram бот-помощник", "Discord игровой бот", "Автоматизация учёбы"],
  },
  {
    number: 8,
    title: "Python программирование",
    description: "Изучаем самый популярный язык программирования. От основ до создания реальных проектов. Python открывает все двери в IT.",
    icon: Code2,
    videos: 8,
    duration: "3 недели",
    topics: ["Python синтаксис", "Работа с данными", "Библиотеки", "ООП для детей", "Проекты на Python"],
    projects: ["Чат-бот", "Парсер данных", "Игра на Pygame"],
  },
  {
    number: 9,
    title: "Безопасность в интернете",
    description: "Учимся защищать свои данные и безопасно работать в интернете. Этичный хакинг и кибербезопасность для детей.",
    icon: Lock,
    videos: 5,
    duration: "1.5 недели",
    topics: ["Цифровая безопасность", "Защита данных", "Безопасный код", "Этика программирования", "Основы криптографии"],
    projects: ["Шифратор сообщений", "Менеджер паролей", "Безопасный чат"],
  },
  {
    number: 10,
    title: "Современные IDE и AI-ассистенты",
    description: "Изучаем профессиональные инструменты разработки. VS Code, Cursor, GitHub Copilot и другие AI-помощники. Учимся программировать в 10 раз быстрее с искусственным интеллектом.",
    icon: Zap,
    videos: 6,
    duration: "2 недели",
    topics: ["VS Code мастерство", "Cursor IDE с AI", "GitHub Copilot", "AI-ассистенты в коде", "Плагины и расширения", "Горячие клавиши", "Дебаггинг и отладка"],
    projects: ["Настройка IDE под себя", "Проект с AI-помощником", "Автоматизация с Copilot"],
  },
  {
    number: 11,
    title: "Работа в команде и Git",
    description: "Учимся работать над проектами вместе. GitHub, командная разработка и open source вклад. Настоящий опыт программиста.",
    icon: MessageSquare,
    videos: 5,
    duration: "1.5 недели",
    topics: ["Git основы", "GitHub платформа", "Командная работа", "Code review", "Open source"],
    projects: ["Совместный проект", "Вклад в open source", "Командная игра"],
  },
  {
    number: 12,
    title: "Искусственный интеллект",
    description: "Создаём проекты с использованием AI. ChatGPT интеграции, распознавание изображений, генерация контента. Будущее в твоих руках.",
    icon: Sparkles,
    videos: 7,
    duration: "2 недели",
    topics: ["AI основы", "ChatGPT API", "Распознавание образов", "Генерация текста", "ML для детей"],
    projects: ["AI ассистент", "Распознаватель рисунков", "Генератор историй"],
  },
  {
    number: 13,
    title: "3D моделирование и анимация",
    description: "Blender для начинающих. Создаём 3D модели, анимации и сцены для игр. От простых объектов до целых миров.",
    icon: Monitor,
    videos: 6,
    duration: "2 недели",
    topics: ["Blender интерфейс", "3D моделирование", "Текстуры и материалы", "Анимация 3D", "Рендеринг"],
    projects: ["3D персонаж", "Анимированная сцена", "Модель для игры"],
  },
  {
    number: 14,
    title: "Фриланс и заработок",
    description: "Учимся зарабатывать на программировании. Создание портфолио, поиск заказов, работа с клиентами. Первые деньги в IT.",
    icon: Rocket,
    videos: 5,
    duration: "1.5 недели",
    topics: ["Портфолио создание", "Фриланс платформы", "Работа с клиентами", "Ценообразование", "Маркетинг навыков"],
    projects: ["Профессиональное портфолио", "Первый платный заказ", "Личный бренд"],
  },
  {
    number: 15,
    title: "Финальный проект и портфолио",
    description: "Создаём большой проект, объединяющий все полученные знания. Презентация своей работы. Оформление профессионального портфолио программиста.",
    icon: Trophy,
    videos: 4,
    duration: "2 недели",
    projects: ["Итоговый мега-проект", "Презентация работы", "Защита проекта"],
    topics: ["Итоговый проект", "Презентация", "Профессиональное портфолио", "GitHub профиль", "Карьерное планирование"],
  },
];

export const Modules = ({ id }: { id?: string }) => {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  return (
    <section id={id} className="py-20 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-primary/20 mb-6 animate-bounce-slow">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Программа курса</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Что внутри курса?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            15 увлекательных модулей с 80+ видеоуроками, которые превратят вашего ребёнка в настоящего программиста
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setExpandedModule(index)}
              onMouseLeave={() => setExpandedModule(null)}
            >
              <div className="absolute inset-0 bg-gradient-card rounded-2xl opacity-50 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-0 group-hover:opacity-10 transition-all duration-500 blur-xl" />
              
              <div className="relative bg-card border border-primary/10 rounded-2xl p-8 space-y-6 hover:shadow-glow transition-all duration-500 hover:translate-y-[-8px] hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 shadow-glow">
                      <module.icon className="w-7 h-7 text-background" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-sm text-primary font-semibold">
                          МОДУЛЬ {module.number}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                            <Video className="w-3 h-3" />
                            {module.videos} видео
                          </span>
                          <span className="flex items-center gap-1">
                            📅 {module.duration}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {module.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>
                    
                    {module.projects && module.projects.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <Rocket className="w-4 h-4 text-primary" />
                          Проекты:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {module.projects.map((project, projectIndex) => (
                            <span
                              key={projectIndex}
                              className="px-3 py-1 bg-secondary/20 border border-secondary/30 rounded-full text-xs text-foreground font-medium"
                            >
                              ✨ {project}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div 
                      className="overflow-hidden transition-all duration-500"
                      style={{ 
                        maxHeight: expandedModule === index ? "500px" : "60px",
                        opacity: expandedModule === index ? 1 : 0.7
                      }}
                    >
                      <div className="flex flex-wrap gap-2">
                        {module.topics.map((topic, topicIndex) => (
                          <span
                            key={topicIndex}
                            className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs text-primary font-medium hover:bg-primary/20 transition-colors duration-300"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {expandedModule !== index && module.topics.length > 4 && (
                      <div className="text-xs text-muted-foreground italic">
                        Наведите для просмотра всех тем →
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-primary rounded-2xl p-1">
            <div className="bg-background rounded-xl px-8 py-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                🎯 Всего в курсе
              </h3>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-muted-foreground">
                    <span className="font-bold text-foreground">80+</span> видеоуроков
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                  <span className="text-muted-foreground">
                    <span className="font-bold text-foreground">40+</span> проектов
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-muted-foreground">
                    <span className="font-bold text-foreground">100+</span> практических заданий
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
