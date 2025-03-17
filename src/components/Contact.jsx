import { useState, useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => {
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
      className={`transition-all duration-500 ${clipClass} ${
        isHovered ? "scale-105 z-30" : "z-20"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="relative w-full h-full overflow-hidden">
        <div
          className={`absolute inset-0 border-2 border-blue-400/50 rounded transition-all duration-300 ${
            isHovered ? "scale-95 opacity-100" : "scale-100 opacity-0"
          }`}
        ></div>

        <img
          src={src}
          className="object-cover w-full h-full transition-all duration-300"
          style={{
            transform: isHovered
              ? `scale(1.1) rotate(${position.x * 5}deg) translate(${
                  position.x * 10
                }px, ${position.y * 10}px)`
              : "scale(1) rotate(0) translate(0, 0)",
            filter: isHovered
              ? "brightness(1.1) contrast(1.1)"
              : "brightness(1) contrast(1)",
          }}
          alt="Contact visual"
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
    <div id="contact" className="my-20 min-h-96 w-screen px-10 overflow-hidden">
      <div className="relative rounded-lg bg-black/90 py-24 text-blue-50 sm:overflow-hidden">
        {/* 🚀 Ship Image - MOVED HIGHER */}
        <div
          className="absolute -left-20 top-[-10rem] hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <ImageClipBox
            src="/img/ship.jpg"
            clipClass="w-[28dvw] lg:translate-y-10 translate-y-20"
          />
        </div>

        {/*🔥 Shanks Image - MOVED LOWER */}
        <div
          className="absolute top-[0rem] pt-40 left-10 w-60 sm:top-[20%] md:left-auto md:right-10 lg:top-24 lg:w-80"
          style={{
            transform: `translateY(${-scrollY * 0.03}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <ImageClipBox
            src="/img/shanks.png"
            clipClass="sword-man-clip-path md:scale-125 pt-12"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center text-center relative z-10">
          <p className="mb-10 font-general text-[10px] uppercase tracking-widest">
            Set Sail for the Grand Line
          </p>
          <AnimatedTitle
            title="J<b>o</b>in the cre<b>w</b> and <br /> chase y<b>o</b>ur <br /> p<b>i</b>rate dreams!"
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />
          <Button
            title="Join the Crew"
            containerClass="mt-10 cursor-pointer hover:scale-105 transition-transform duration-300"
            link={"https://github.com/prateekraiger"}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
