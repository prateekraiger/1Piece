import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to the Grand Line
        </p>

        <AnimatedTitle
          title="Embark on an epic j<b>o</b>urney to f<b>i</b>nd the leg<b>e</b>ndary One P<b>i</b>ece!"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>
            The world of <b>One Piece</b> is filled with adventure, danger, and
            the quest for the ultimate treasure, the One Piece. Pirates from
            across the seas set sail to make their dreams a reality.
          </p>
          <p className="text-gray-500">
            Follow Monkey D. Luffy and the Straw Hat Pirates as they navigate
            the unpredictable waters, battle formidable foes, and chase their
            destiny.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image relative">
          <video
            src={"videos/about.mp4"}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover brightness-110 contrast-75 saturate-[1.2] sepia-[.25]"
          />
          <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-transparent to-black"></div>
          {/* <img
            src="img/onepiece.jpg"
            alt="One Piece Background"
            className="absolute left-0 top-0 size-full object-cover"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default About;
