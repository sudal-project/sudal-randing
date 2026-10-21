import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowItWorks";
import PrivacyNote from "@/components/PrivacyNote";
import Roadmap from "@/components/Roadmap";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HowItWorks />
        <PrivacyNote />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}
