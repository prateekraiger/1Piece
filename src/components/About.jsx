import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { useRef, useState, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = () => {
  const container = useRef();
  const videoRef = useRef();
  const particlesRef = useRef([]);
  const clipContainerRef = useRef();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () => {
        setIsVideoLoaded(true);
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadeddata", () => {
          setIsVideoLoaded(true);
        });
      }
    };
  }, []);

  useGSAP(
    () => {
      // Initial fancy welcome text animation
      const letters = gsap.utils.toArray(".welcome-letter");
      gsap.from(letters, {
        opacity: 0,
        y: gsap.utils.wrap([-20, 20]),
        rotationX: gsap.utils.wrap([-90, 90]),
        stagger: 0.08,
        duration: 1.2,
        ease: "back.out(1.7)",
      });

      // Custom shine effect for welcome text
      gsap.to(".welcome-text", {
        backgroundPosition: "200% center",
        duration: 5,
        repeat: -1,
        ease: "linear",
      });

      // About section text entrance
      gsap.from(".about-subtext", {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.4,
        ease: "power3.out",
      });

      // Floating particles animation with improved randomness
      particlesRef.current.forEach((particle) => {
        const randomDuration = gsap.utils.random(2, 4);
        const randomDelay = gsap.utils.random(0, 2);

        gsap.to(particle, {
          x: () => gsap.utils.random(-25, 25),
          y: () => gsap.utils.random(-25, 25),
          scale: () => gsap.utils.random(0.8, 1.5),
          opacity: () => gsap.utils.random(0.4, 1),
          duration: randomDuration,
          delay: randomDelay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Video zoom effect with improved parameters
      gsap.fromTo(
        videoRef.current,
        {
          scale: 1.2,
          opacity: 0.8,
          filter: "blur(4px)",
        },
        {
          scale: 1.05,
          opacity: 1,
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: "#clip",
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );

      // Container size control with smoother animation
      gsap.fromTo(
        clipContainerRef.current,
        { height: "60vh" },
        {
          height: "85vh",
          scrollTrigger: {
            trigger: "#clip",
            start: "top center",
            end: "bottom center",
            scrub: 0.5,
          },
        }
      );

      // Clip path animation timeline - improved animation flow
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "top center",
          end: "+=600 center",
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          markers: false,
        },
      });

      clipAnimation
        .fromTo(
          ".mask-clip-path",
          {
            scale: 0.95,
            opacity: 0.8,
            width: "60vh",
            height: "60vh",
            borderRadius: "24px",
            boxShadow: "0 0 20px rgba(245, 158, 11, 0.1)",
          },
          {
            width: "95%",
            height: "75vh",
            borderRadius: "12px",
            scale: 1,
            opacity: 1,
            boxShadow: "0 0 80px rgba(245, 158, 11, 0.3)",
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
              // Enhanced text character animation
              gsap.to(".quote-text", {
                duration: 1.5,
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                stagger: 0.03,
                ease: "power4.out",
              });

              // Enhanced author text animation
              gsap.to(".author-text", {
                duration: 1.5,
                opacity: 1,
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                delay: 0.7,
                ease: "power4.out",
              });
            },
          },
          "-=0.5"
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

      // Add parallax effect to decorative elements
      gsap.to(".parallax-bg", {
        y: (i, el) => (el.classList.contains("top-bg") ? -100 : 100),
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Animate introduction heading elements
      gsap.from(".adventure-badge", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: "back.out(1.7)",
      });
    },
    { scope: container, dependencies: [isVideoLoaded] }
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
      className="relative min-h-screen w-screen overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900/10 to-black/30"
      ref={container}
    >
      {/* Enhanced decorative elements */}
      <div className="parallax-bg top-bg absolute -right-20 top-20 h-64 w-64 rounded-full bg-red-500/15 blur-3xl"></div>
      <div className="parallax-bg absolute -left-10 bottom-40 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl"></div>
      <div className="parallax-bg absolute right-40 bottom-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>

      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/80"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 2}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Main content with improved spacing */}
      <div className="relative mb-8 mt-32 flex flex-col items-center gap-8 px-6 sm:px-10">
        <div className="adventure-badge px-4 py-2 bg-gradient-to-r from-red-600/30 to-amber-600/30 rounded-full border border-amber-500/30 shadow-lg shadow-amber-500/10">
          <div
            className="welcome-text font-general text-lg uppercase tracking-widest md:text-xl
                       bg-gradient-to-r from-red-400 via-amber-300 to-red-400 bg-clip-text text-transparent
                       bg-[length:200%_auto] font-bold"
          >
            {welcomeLetters}
          </div>
        </div>

        <AnimatedTitle
          title="Set Sail for Adventure in the <b>Pirate Era</b>!"
          containerClass="mt-3 max-w-4xl text-center"
          textClass="!text-4xl sm:!text-5xl md:!text-6xl bg-gradient-to-r from-amber-400 via-red-400 to-amber-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default"
        />

        <div className="about-subtext max-w-3xl text-center mb-4">
          <p className="text-lg font-medium text-gray-200/90 md:text-xl leading-relaxed">
            The world of{" "}
            <span className="text-red-400 hover:text-amber-400 transition-all duration-300 cursor-pointer hover:scale-105 inline-block relative group">
              One Piece
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
            </span>{" "}
            is filled with adventure, danger, and the quest for the ultimate
            treasure. Pirates from across the seas set sail to make their dreams
            a reality.
          </p>
        </div>
      </div>

      {/* Video section with improved layout */}
      <div
        className="flex justify-center items-center h-dvh w-screen"
        id="clip"
        ref={clipContainerRef}
      >
        <div className="mask-clip-path about-image relative mx-auto overflow-hidden border-2 border-amber-400/40 shadow-2xl shadow-amber-900/50">
          {/* Enhanced decorative floating particles with variety */}
          {[...Array(24)].map((_, i) => {
            const size = Math.random() * 3 + 1;
            const isGlow = i % 5 === 0;

            return (
              <div
                key={i}
                ref={(el) => (particlesRef.current[i] = el)}
                className={`floating-particle absolute rounded-full ${
                  isGlow ? "bg-amber-300" : "bg-amber-400/50"
                }`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.5,
                  width: `${size}px`,
                  height: `${size}px`,
                  boxShadow: isGlow
                    ? "0 0 8px 2px rgba(245, 158, 11, 0.6)"
                    : "none",
                }}
              />
            );
          })}

          {/* Loading indicator */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full border-4 border-amber-400/20 border-t-amber-400 animate-spin"></div>
            </div>
          )}

          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dk3pg4zly/video/upload/v1742726559/about_ua05xo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="about-video absolute left-0 top-0 size-full object-cover brightness-110 contrast-125 saturate-[1.4] p-5 sm:p-7 md:p-9"
            onLoadedData={() => setIsVideoLoaded(true)}
          />

          {/* Improved gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black/90" />

          <div className="content-overlay absolute bottom-0 left-0 right-0 p-8 sm:p-10 md:p-12 text-center">
            <p className="quote-text text-2xl font-bold text-amber-400/90 sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl mx-auto [clip-path:polygon(0%_100%,100%_100%,100%_100%,0%_100%)] drop-shadow-lg">
              "The One Piece... <span className="text-white/95">IS REAL!</span>"
            </p>
            <p className="author-text mt-6 sm:mt-8 text-gray-300/90 text-lg sm:text-xl md:text-2xl opacity-0 [clip-path:polygon(0%_100%,100%_100%,100%_100%,0%_100%)] italic">
              - Edward Newgate,{" "}
              <span className="font-medium text-amber-200/80">
                The Strongest Man in the World
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Added stylized divider at bottom */}
      <div className="relative h-24 w-full overflow-hidden">
        <div className="absolute -bottom-16 left-0 h-24 w-full bg-red-900/10 skew-y-2"></div>
        <div className="absolute -bottom-12 left-0 h-24 w-full bg-amber-900/10 -skew-y-2"></div>
      </div>
    </div>
  );
};

export default About;
