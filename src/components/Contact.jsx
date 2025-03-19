import { useState, useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass, alt }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!isHovered) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width - 0.5;
    const y = (e.clientY - bounds.top) / bounds.height - 0.5;
    setPosition({ x, y });
  };

  return (
    <div
      className={`relative transition-all duration-500 ${clipClass} ${
        isHovered ? "scale-105 z-30" : "z-20"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="relative w-full h-full overflow-hidden group">
        {/* Hover Glow Effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Border Animation */}
        <div
          className={`absolute inset-0 border-2 border-blue-400/50 rounded-lg transition-all duration-300 ${
            isHovered ? "scale-95 opacity-100" : "scale-100 opacity-0"
          }`}
        />

        <img
          src={src}
          className="object-cover w-full h-full transition-transform duration-300"
          style={{
            transform: isHovered
              ? `scale(1.1) rotate(${position.x * 5}deg) translate(${
                  position.x * 10
                }px, ${position.y * 10}px)`
              : "scale(1) rotate(0) translate(0, 0)",
            filter: isHovered
              ? "brightness(1.1) contrast(1.1) drop-shadow(0 0 8px rgba(96,165,250,0.5))"
              : "brightness(1) contrast(1)",
          }}
          alt={alt}
        />
      </div>
    </div>
  );
};

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
      className="my-20 min-h-96 w-screen px-4 sm:px-8 lg:px-10 overflow-hidden"
    >
      <div className="relative rounded-xl bg-black/90 py-16 md:py-24 text-blue-50 overflow-hidden">
        {/* Ship Image - Hidden on mobile */}
        <div
          className="absolute -left-20 top-[-10rem] hidden h-full w-72 overflow-hidden sm:block lg:left-10 lg:w-96"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <ImageClipBox
            src="/img/ship.jpg"
            clipClass="w-[28dvw] lg:translate-y-10 translate-y-20 hover:rotate-3 transition-transform"
            alt="A ship sailing on the ocean"
          />
        </div>

        {/* Shanks Image - Responsive Positioning */}
        <div
          className="absolute top-[2rem] pt-40 left-4 w-48 sm:top-[20%] sm:left-8 md:left-auto md:right-8 lg:top-24 lg:w-72 xl:right-16"
          style={{
            transform: `translateY(${-scrollY * 0.03}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <ImageClipBox
            src="/img/shanks.png"
            clipClass="sword-man-clip-path md:scale-110 pt-12 hover:-translate-y-2 transition-transform"
            alt="Character Shanks holding a sword"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center text-center relative z-10 px-4 sm:px-8">
          <p className="mb-6 sm:mb-10 font-general text-xs sm:text-sm uppercase tracking-widest text-blue-400">
            Set Sail for the Grand Line
          </p>

          <AnimatedTitle
            title="J<b>o</b>in the cre<b>w</b> and <br /> chase y<b>o</b>ur <br /> p<b>i</b>rate dreams!"
            className="special-font !text-4xl sm:!text-5xl md:!text-6xl lg:!text-[4rem] xl:!text-[5rem] font-zentry !font-black !leading-[0.9]"
          />

          <Button
            title="Join the Crew"
            containerClass="mt-8 sm:mt-12 md:mt-16 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
            link="https://github.com/prateekraiger"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
