import { Button } from "@/components/ui/button";
import { ArrowRight, Check, DollarSign } from "lucide-react";

const benefits = [
  "15 интерактивных модулей",
  "80+ видеоуроков с практикой",
  "40+ реальных проектов",
  "Менторская поддержка",
  "Система достижений и наград",
  "Доступ навсегда + бесплатные обновления",
  "Готовое портфолио проектов",
  "Профессиональные навыки программирования",
];

export const CTA = () => {
  return (
    <section id="cta" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-hero rounded-3xl opacity-20 blur-3xl" />
          <div className="relative bg-card border-2 border-primary/30 rounded-3xl p-12 md:p-16 space-y-12">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
                <DollarSign className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">Специальная цена</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Инвестируйте в будущее вашего ребёнка
              </h2>

              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  $100
                </span>
              </div>

              <p className="text-lg text-muted-foreground">
                Единоразовый платёж — доступ навсегда
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-foreground">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a href="https://t.me/smc_tg911" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 rounded-full group">
                  Купить курс за $100
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>

            <div className="text-center text-sm text-muted-foreground pt-6">
              <p>Принимаем к оплате: USD • EUR • RUB • UAH • Crypto</p>
              <p className="mt-2">По вопросам приобретения пишите в Telegram: <span className="text-primary font-semibold">@smc_tg911</span></p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">
            Для детей, но с профессиональным результатом
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Даже полный новичок станет настоящим программистом. После курса ваш ребёнок сможет 
            создавать сайты, мобильные приложения, игры и продолжит профессиональное развитие самостоятельно.
          </p>
        </div>
      </div>
    </section>
  );
};
