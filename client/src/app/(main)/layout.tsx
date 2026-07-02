// app/(main)/layout.tsx

import Footer from "./components/Footer";
import Header from "./components/Header";
import IntroOverlay from "./components/IntroOverlay";


export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Homepage renders normally underneath; the intro overlays on top and
          removes itself after ~2s (once per session). If JS is off, the overlay
          never mounts and the site shows immediately — no blank screen. */}
      <IntroOverlay />
      <Header />
      {children}
      <Footer />
    </>
  );
}