import gsap from "gsap";
import { useRef, useEffect } from "react";
import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {
  const frameRef = useRef(null);
  const glowRef = useRef(null);
  const titleRef = useRef(null);

  // Animate title on mount
  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current.querySelectorAll("span"), {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.05,
        ease: "power4.out",
      });
    }
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;
    const glow = glowRef.current;

    if (!element || !glow) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;
    const glowPosX = (xPos / rect.width) * 100;
    const glowPosY = (yPos / rect.height) * 100;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });

    gsap.to(glow, {
      duration: 0.5,
      background: `radial-gradient(circle at ${glowPosX}% ${glowPosY}%, rgba(255,165,0,0.4) 0%, transparent 80%)`,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(frameRef.current, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });

    gsap.to(glowRef.current, {
      duration: 0.5,
      background: "transparent",
      ease: "power2.out",
    });
  };

  return (
    <div className="min-h-screen w-screen bg-black text-blue-50 flex justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />

      <div className="flex flex-col items-center py-20 w-full max-w-6xl px-4 md:px-8">
        <div className="mb-6 text-center">
          <p className="font-mono text-sm uppercase tracking-widest text-orange-400/80 mb-2">
            The Awakening of Joy Boy
          </p>

          {/* Reverted Animated Title */}
          <div ref={titleRef} className="overflow-hidden">
            <AnimatedTitle
              title="Lu<b>f</b>fy's G<b>e</b>ar F<b>i</b>ve, the <b>S</b>un G<b>o</b>d N<b>i</b>ka"
              containerClass="text-4xl md:text-6xl font-bold pointer-events-none mix-blend-difference relative z-10"
            />
          </div>
        </div>

        {/* Smaller Video Container */}
        <div className="relative w-full mt-8 group max-w-3xl mx-auto">
          <div
            className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-transparent rounded-2xl blur-xl transition-opacity duration-300 group-hover:opacity-100 opacity-50"
            ref={glowRef}
          />

          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-orange-400/20 shadow-2xl">
            <video
              ref={frameRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              src="https://res.cloudinary.com/dk3pg4zly/video/upload/v1742726565/gear5_rey1cm.mp4"
              className="w-full h-full object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-300"
              loop
              muted
              autoPlay
            />
          </div>
        </div>

        <div className="mt-12 max-w-4xl w-full px-4 md:px-8">
          <blockquote className="text-center text-lg md:text-xl font-serif italic text-amber-100/90 leading-relaxed max-w-2xl mx-auto">
            "As the Drums of Liberation echo through the fabric of reality,
            <strong className="not-italic font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent px-1">
              Gear Fifth
            </strong>
            emerges - where rubber becomes revelation and combat transforms into
            comedy. The
            <strong className="not-italic font-bold text-orange-400">
              Gomu Gomu no Mi
            </strong>
            sheds its mortal guise, awakening as the
            <strong className="not-italic font-bold text-amber-300">
              Hito Hito no Mi, Model: Nika
            </strong>
            , granting Luffy the power to warp the world like living cartoon -
            <span className="block mt-3 text-orange-200/80 font-medium normal-case">
              [A fighting style where clouds become trampolines, eyes pop from
              sockets in surprise, and every blow carries the weight of a
              thousand suns' laughter]
            </span>
            "
          </blockquote>

          <div className="mt-8 flex justify-center">
            <Button
              id="realm-btn"
              title="discover the legend"
              containerClass="mt-5"
              link={
                "https://onepiece.fandom.com/wiki/Gomu_Gomu_no_Mi/Gear_5_Techniques"
              }
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default FloatingImage;
