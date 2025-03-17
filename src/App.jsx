import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  function getLogo() {
    const id = Math.floor(Math.random() * 5) + 1;
    return `/img/profile/logo${id}.webp`;
  }

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar logo={getLogo()} />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
