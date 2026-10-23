import type { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Launch from "@/components/Launch";
import Privacy from "@/components/Privacy";
import Roadmap from "@/components/Roadmap";
import Stages from "@/components/Stages";
import States from "@/components/States";
import Together from "@/components/Together";
import Village from "@/components/Village";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.ogDescription,
    images: [meta.ogImage],
    type: "website",
  },
  icons: {
    icon: { url: "/assets/favicon.png", type: "image/png" },
    apple: "/assets/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: meta.themeColor,
};

export default function Home() {
  return (
    <div className="landing">
      <Header />
      <main>
        <Hero />
        <Together />
        <States />
        <Stages />
        <Village />
        <Privacy />
        <Roadmap />
        <Launch />
      </main>
      <Footer />
    </div>
  );
}
