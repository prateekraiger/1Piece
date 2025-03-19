import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = () => {
  const container = useRef();
  const particlesRef = useRef([]);

  useGSAP(
    () => {
      // Initial load animations
      gsap.from(".welcome-text, .about-subtext", {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Floating particles animation
      particlesRef.current.forEach((particle) => {
        gsap.to(particle, {
          y: () => gsap.utils.random(-20, 20),
          duration: gsap.utils.random(1.5, 3),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Video zoom effect
      gsap.from(".about-video", {
        scale: 1.2,
        scrollTrigger: {
          trigger: "#clip",
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      });

      // Clip path animation timeline
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "top center",
          end: "+=1000 center",
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          markers: false,
        },
      });

      clipAnimation
        .fromTo(
          ".mask-clip-path",
          { scale: 0.95, opacity: 0.8 },
          {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.inOut",
          }
        )
        .fromTo(
          ".content-overlay",
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            onStart: () => {
              // Text character animation
              gsap.to(".quote-text", {
                duration: 1.2,
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                stagger: 0.02,
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
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(3)",
          },
          "-=1"
        );
    },
    { scope: container }
  );

  return (
    <div
      id="about"
      className="min-h-screen w-screen bg-gradient-to-b from-blue-900/20 to-black/30"
      ref={container}
    >
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5 px-4 sm:px-8">
        <p className="welcome-text font-general text-lg uppercase tracking-widest text-red-400/90 md:text-xl">
          Welcome to the Grand Line
        </p>

        <AnimatedTitle
          title="Embark on an epic j<b>o</b>urney to f<b>i</b>nd the leg<b>e</b>ndary One P<b>i</b>ece!"
          containerClass="mt-5 max-w-4xl text-center"
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

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image relative overflow-hidden border-2 border-amber-400/20 shadow-2xl shadow-amber-900/30">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (particlesRef.current[i] = el)}
              className="floating-particle absolute h-1 w-1 bg-amber-400/40 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}

          <video
            src="videos/about2.mp4"
            autoPlay
            loop
            muted
            className="about-video absolute left-0 top-0 size-full object-cover brightness-110 contrast-125 saturate-[1.4]"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90" />

          <div className="content-overlay absolute bottom-0 left-0 right-0 p-8 text-center">
            <p className="quote-text text-2xl font-bold text-amber-400/90 sm:text-3xl md:text-4xl [clip-path:polygon(0% 100%,100% 100%,100% 100%,0% 100%)]">
              "The One Piece... IS REAL!"
            </p>
            <p className="mt-2 text-gray-300/80 md:text-lg opacity-0 [clip-path:polygon(0% 100%,100% 100%,100% 100%,0% 100%)]">
              - Edward Newgate, The Strongest Man in the World
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
