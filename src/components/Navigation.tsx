import { useState, useEffect } from "react";
import { Menu, X, Rocket } from "lucide-react";

const navigation = [
  { name: "О курсе", href: "#features" },
  { name: "Программа", href: "#modules" },
  { name: "Отзывы", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2 bg-gradient-primary rounded-xl group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
              <Rocket className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <div className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Junior Coders
              </div>
              <div className="text-xs text-muted-foreground">
                Программирование для детей
              </div>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA button */}
          <div className="hidden md:block">
            <a href="https://t.me/smc_tg911" target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-semibold hover:shadow-glow transition-all duration-300 hover:scale-105">
                Записаться на курс
              </button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border">
          <div className="px-4 py-6 space-y-3">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
            <a href="https://t.me/smc_tg911" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full px-6 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-semibold hover:shadow-glow transition-all duration-300">
                Записаться на курс
              </button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
