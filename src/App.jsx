import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import NavBar from "./components/Navbar";
import Characters from "./components/Characters";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LogoSpinner from "./components/LogoSpinner";
import onePieceLogo from "/img/profile/logo.png";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "auto";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("section").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <LogoSpinner onLoadComplete={() => setIsLoading(false)} />
      ) : (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
          <NavBar logo={onePieceLogo} />
          <Hero />
          <About />
          <Characters />
          <Story />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  );
};

export default App;
