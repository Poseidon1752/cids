import { HelpCircle, Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "С какого возраста можно начинать?",
    answer: "Курс подходит для детей от 8 до 16 лет. Младшие начнут с визуального программирования (Scratch), старшие - с более продвинутых инструментов. Программа адаптируется под уровень ребёнка.",
  },
  {
    question: "Нужен ли компьютер или можно с планшета?",
    answer: "Для полноценного обучения рекомендуется компьютер (Windows, Mac или Linux). Однако есть модуль про программирование на смартфоне (Termux, UserLand), где можно создавать код прямо с телефона!",
  },
  {
    question: "Сколько времени нужно заниматься?",
    answer: "Рекомендуем 3-5 часов в неделю. Курс можно проходить в своём темпе - доступ навсегда! В среднем прохождение занимает от 2 месяцев до полугода.",
  },
  {
    question: "Что если ребёнок ничего не понимает в программировании?",
    answer: "Это нормально! Курс создан специально для новичков. Начинаем с самых основ через игры и визуальные блоки. Всё объясняется простым языком с примерами из жизни детей.",
  },
  {
    question: "Можно ли вернуть деньги, если не подойдёт?",
    answer: "Да! У нас есть 7-дневная гарантия возврата денег. Если курс не подошёл - вернём полную стоимость, без вопросов.",
  },
  {
    question: "Что получит ребёнок после курса?",
    answer: "После завершения курса ваш ребёнок получит реальные навыки программирования, портфолио из 40+ проектов и сможет создавать собственные приложения, игры и сайты самостоятельно.",
  },
  {
    question: "Есть ли поддержка и помощь в процессе?",
    answer: "Конечно! В базовом курсе есть закрытый чат с другими учениками и FAQ. В расширенной версии ($200) - личная поддержка ментора и разбор ваших проектов.",
  },
  {
    question: "Можно ли зарабатывать после курса?",
    answer: "Да! В курсе есть модуль про фриланс и заработок. Многие выпускники начинают делать простые сайты, боты и приложения за деньги уже через 2-3 месяца после начала обучения.",
  },
];

export const FAQ = ({ id }: { id?: string }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={id} className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-primary/20 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Часто задаваемые вопросы</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Остались вопросы?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ответы на самые популярные вопросы родителей
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-card rounded-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="relative bg-card border border-primary/10 rounded-xl overflow-hidden hover:shadow-card transition-all duration-300">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left group-hover:bg-primary/5 transition-colors duration-300"
                >
                  <h3 className="font-bold text-foreground pr-4 flex items-center gap-3">
                    <span className="text-primary text-xl">❓</span>
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-primary" />
                    ) : (
                      <Plus className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </button>
                
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openIndex === index ? "300px" : "0",
                    opacity: openIndex === index ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 bg-gradient-primary rounded-2xl">
          <h3 className="text-2xl font-bold text-background mb-2">
            Не нашли ответ?
          </h3>
          <p className="text-background/80 mb-4">
            Напишите нам в Telegram — ответим в течение часа!
          </p>
          <a
            href="https://t.me/smc_tg911"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-background text-primary rounded-full font-semibold hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            💬 Написать в Telegram
          </a>
        </div>
      </div>
    </section>
  );
};
