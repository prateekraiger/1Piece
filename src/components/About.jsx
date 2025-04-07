import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = () => {
  const container = useRef();
  const videoRef = useRef();
  const particlesRef = useRef([]);
  const clipContainerRef = useRef();

  useGSAP(
    () => {
      // Enhanced welcome text animation
      const letters = gsap.utils.toArray(".welcome-letter");
      gsap.from(letters, {
        opacity: 0,
        y: gsap.utils.wrap([-30, 30]),
        rotationX: gsap.utils.wrap([-120, 120]),
        stagger: 0.06,
        duration: 1.5,
        ease: "back.out(2)",
      });

      // Shine effect for welcome text
      gsap.to(".welcome-text", {
        backgroundPosition: "200% center",
        duration: 4,
        repeat: -1,
        ease: "linear",
      });

      // About section text entrance
      gsap.from(".about-subtext", {
        duration: 1.2,
        y: 60,
        opacity: 0,
        delay: 0.5,
        ease: "power3.out",
      });

      // Floating particles animation
      particlesRef.current.forEach((particle) => {
        gsap.to(particle, {
          x: () => gsap.utils.random(-20, 20),
          y: () => gsap.utils.random(-20, 20),
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Video zoom effect
      gsap.fromTo(
        videoRef.current,
        {
          scale: 1.3,
          opacity: 0.7,
        },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: "#clip",
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );

      // Container size control
      gsap.fromTo(
        clipContainerRef.current,
        { height: "50vh" },
        {
          height: "75vh",
          scrollTrigger: {
            trigger: "#clip",
            start: "top center",
            end: "bottom center",
            scrub: 0.6,
          },
        }
      );

      // Clip path animation timeline
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "top center",
          end: "+=700 center",
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      });

      clipAnimation
        .fromTo(
          ".mask-clip-path",
          {
            scale: 0.9,
            opacity: 0.8,
            width: "50vh",
            height: "50vh",
            borderRadius: "20px",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Start as a square
          },
          {
            width: "85%",
            height: "65vh",
            borderRadius: "10px",
            scale: 1,
            opacity: 1,
            clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)", // Transition to a larger rectangle
            ease: "power2.inOut",
          }
        )
        .fromTo(
          ".content-overlay",
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.8,
            onStart: () => {
              // Text character animation
              gsap.to(".quote-text", {
                duration: 1.5,
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                stagger: 0.03,
                ease: "power4.out",
              });

              // Animate the author text
              gsap.to(".author-text", {
                duration: 1.5,
                opacity: 1,
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                delay: 0.6,
                ease: "power4.out",
              });
            },
          },
          "<"
        )
        .fromTo(
          ".floating-particle",
          { scale: 0 },
          {
            scale: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(3)",
          },
          "-=1"
        );
    },
    { scope: container }
  );

  // Create the split letters for welcome text
  const welcomeText = "Welcome to the Grand Line";
  const welcomeLetters = welcomeText.split("").map((letter, index) => (
    <span
      key={index}
      className={`welcome-letter inline-block ${letter === " " ? "mr-2" : ""}`}
    >
      {letter}
    </span>
  ));

  return (
    <div
      id="about"
      className="relative min-h-screen w-screen overflow-hidden bg-gradient-to-b from-blue-900/20 to-black/30"
      ref={container}
    >
      {/* Decorative elements */}
      <div className="parallax-bg absolute -right-20 top-20 h-64 w-64 rounded-full bg-red-500/10 blur-3xl"></div>
      <div className="parallax-bg absolute -left-10 bottom-40 h-80 w-80 rounded-full bg-amber-400/5 blur-3xl"></div>

      {/* Main content */}
      <div className="relative mb-8 mt-28 flex flex-col items-center gap-6 px-4 sm:px-8">
        <div
          className="welcome-text font-general text-lg uppercase tracking-widest md:text-xl
                       bg-gradient-to-r from-red-400 via-amber-300 to-red-400 bg-clip-text text-transparent
                       bg-[length:200%_auto] font-bold"
        >
          {welcomeLetters}
        </div>

        <AnimatedTitle
          title="Set Sail for Adventure in the <b>Pirate Era</b>!"
          containerClass="mt-3 max-w-4xl text-center"
          textClass="!text-4xl sm:!text-5xl md:!text-6xl bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default"
        />

        <div className="about-subtext max-w-3xl text-center">
          <p className="text-lg font-medium text-gray-200/90 md:text-xl">
            The world of{" "}
            <span className="text-red-400 hover:text-amber-400 transition-all duration-300 cursor-pointer hover:scale-105 inline-block">
              One Piece
            </span>{" "}
            is filled with adventure, danger, and the quest for the ultimate
            treasure. Pirates from across the seas set sail to make their dreams
            a reality.
          </p>
        </div>
      </div>

      <div
        className="flex justify-center items-center h-dvh w-screen"
        id="clip"
        ref={clipContainerRef}
      >
        <div className="mask-clip-path about-image relative mx-auto overflow-hidden border-2 border-amber-400/20 shadow-2xl shadow-amber-900/30">
          {/* Decorative floating particles */}
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (particlesRef.current[i] = el)}
              className="floating-particle absolute h-2 w-2 bg-amber-400/40 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.5,
                scale: Math.random() * 0.5 + 0.5,
              }}
            />
          ))}

          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dk3pg4zly/video/upload/v1742726559/about_ua05xo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="about-video absolute left-0 top-0 size-full object-cover brightness-110 contrast-125 saturate-[1.4] p-4 sm:p-6 md:p-8"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90" />

          <div className="content-overlay absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 text-center">
            <p className="quote-text text-2xl font-bold text-amber-400/90 sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl mx-auto [clip-path:polygon(0%_100%,100%_100%,100%_100%,0%_100%)]">
              "The One Piece... IS REAL!"
            </p>
            <p className="author-text mt-4 sm:mt-6 text-gray-300/80 text-lg sm:text-xl md:text-2xl opacity-0 [clip-path:polygon(0%_100%,100%_100%,100%_100%,0%_100%)]">
              - Edward Newgate, The Strongest Man in the World
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
