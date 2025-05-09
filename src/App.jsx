import React, { useEffect, useState, lazy, Suspense } from "react";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import LogoSpinner from "./components/LogoSpinner";
import onePieceLogo from "/img/profile/logo.png";
import TextCursor from "./components/TextCursor";

// Lazy Loading Components
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Characters = lazy(() => import("./components/Characters"));
const Story = lazy(() => import("./components/Story"));
const Contact = lazy(() => import("./components/Contact"));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "auto";

    // Preload images (Example)
    const images = [onePieceLogo, "/img/hero.jpg", "/img/about.jpg"];
    const loadImages = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    });

    Promise.all(loadImages).then(() => {
      setTimeout(() => setIsLoading(false), 2500); // Adjusted loader duration to 2.5 seconds for smoother experience
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          } else {
            entry.target.classList.remove("animate-in"); // Ensure animations reset when out of view
          }
        });
      },
      { threshold: 0.2 } // Increased threshold for smoother animations
    );
    document
      .querySelectorAll("section")
      .forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <LogoSpinner />
      ) : (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
          <div className="fixed inset-0 w-full h-full z-40 pointer-events-none">
            <div className="w-full h-full">
              <TextCursor
                text="⚓"
                delay={0.01}
                spacing={80}
                followMouseDirection={true}
                randomFloat={true}
                exitDuration={0.3}
                removalInterval={20}
                maxPoints={10}
              />
            </div>
          </div>
          <NavBar logo={onePieceLogo} />
          <Suspense fallback={<LogoSpinner />}>
            <Hero />
            <About />
            <Characters />
            <Story />
            <Contact />
          </Suspense>
          <Footer />
        </main>
      )}
    </>
  );
};

export default App;
