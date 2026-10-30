import type { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Launch from "@/components/Launch";
import Privacy from "@/components/Privacy";
import Mobile from "@/components/Mobile";
import Roadmap from "@/components/Roadmap";
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: meta.themeColor },
    { media: "(prefers-color-scheme: dark)", color: meta.themeColorDark },
  ],
};

export default function Home() {
  return (
    <div className="landing">
      <Header />
      <main>
        <Hero />
        <Together />
        <Village />
        <Privacy />
        <Roadmap />
        <Mobile />
        <Launch />
      </main>
      <Footer />
    </div>
  );
}
