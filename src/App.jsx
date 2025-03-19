import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  function getLogo() {
    const id = Math.floor(Math.random() * 5) + 1;
    return `/img/profile/logo${id}.webp`;
  }

  // Add scroll reveal animations
  useEffect(() => {
    if (isLoading) {
      // Prevent scrolling while loading
      document.body.style.overflow = "hidden";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Target all sections to observe
    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <LogoSpinner onLoadComplete={handleLoadComplete} />

      <AnimatePresence>
        {!isLoading && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen w-screen overflow-x-hidden"
          >
            <NavBar logo={onePieceLogo} />

            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <Hero />
            </motion.div>

            <motion.section
              className="reveal-section"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <About />
            </motion.section>

            <motion.section
              className="reveal-section"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <Characters />
            </motion.section>

            <motion.section
              className="reveal-section"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <Story />
            </motion.section>

            <motion.section
              className="reveal-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <Contact />
            </motion.section>

            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Footer />
            </motion.footer>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
