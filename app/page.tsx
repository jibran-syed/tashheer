import { BusinessShowcase } from "@/components/business-showcase";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Pricing } from "@/components/pricing";
import { Partners } from "@/components/partners";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="overflow-hidden">
        <Hero />
        <BusinessShowcase />
        <HowItWorks />
        <Pricing />
        <Partners />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
