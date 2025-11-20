import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Features } from "@/components/Features";
import { Approach } from "@/components/Approach";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { Modules } from "@/components/Modules";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Stats />
      <Features id="features" />
      <Approach />
      <InteractiveDemo />
      <Modules id="modules" />
      <Testimonials id="testimonials" />
      <FAQ id="faq" />
      <CTA />
    </div>
  );
};

export default Index;
