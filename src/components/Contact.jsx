import { useState, useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const Contact = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="contact"
      className="relative min-h-screen w-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('https://wallpapercave.com/uwp/uwp3589179.jpeg')",
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8">
        <p className="mb-6 font-general text-xs sm:text-sm uppercase tracking-widest text-blue-400">
          Let's Connect
        </p>

        <AnimatedTitle
          title="Get in <b>Touch</b> with the <br /> <b>Straw Hat Crew</b>!"
          containerClass="special-font text-center !text-4xl sm:!text-5xl md:!text-6xl lg:!text-[4rem] xl:!text-[5rem] font-zentry !font-black !leading-[0.9] bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent"
        />

        <p className="mt-6 max-w-2xl text-center text-sm sm:text-base md:text-lg text-gray-200/90">
          Whether you're looking to join the crew, share your pirate dreams, or
          just say hi, we'd love to hear from you! Drop us a message and let's
          set sail together.
        </p>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:gap-8">
          <Button
            title="Send a Message"
            containerClass="hover:scale-105 hover-glow transition-all"
            link="mailto:strawhat@grandline.com"
          />
          <Button
            title="Follow Us"
            containerClass="hover:scale-105 hover-glow transition-all"
            link="https://github.com/prateekraiger"
          />
        </div>
      </div>

      {/* Animated Text */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm sm:text-base md:text-lg text-gray-400 animate-pulse">
          "The Grand Line awaits... Are you ready to embark on this journey?"
        </p>
      </div>
    </div>
  );
};

export default Contact;
