import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PrivacyNote from "@/components/PrivacyNote";
import Roadmap from "@/components/Roadmap";
import States from "@/components/States";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <States />
        <HowItWorks />
        <PrivacyNote />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}
