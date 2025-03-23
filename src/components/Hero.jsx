import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const totalVideos = 4;
  const nextVdRef = useRef(null);
  const currentVdRef = useRef(null);
  const mainVdRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos >= totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  // Preload videos
  useEffect(() => {
    const videoSources = [];
    for (let i = 1; i <= totalVideos; i++) {
      videoSources.push(`videos/hero-${i}.mp4`);
    }

    videoSources.forEach((src) => {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "auto";
      video.muted = true;
      video.style.display = "none";
      document.body.appendChild(video);

      const cleanup = () => {
        if (document.body.contains(video)) {
          document.body.removeChild(video);
        }
        handleVideoLoad();
      };

      video.addEventListener("loadeddata", cleanup, { once: true });
      video.addEventListener("error", cleanup, { once: true });
    });

    return () => {
      const hiddenVideos = document.querySelectorAll(
        'video[style="display: none;"]'
      );
      hiddenVideos.forEach((video) => {
        if (document.body.contains(video)) {
          document.body.removeChild(video);
        }
      });
    };
  }, []);

  // Play main video when component is mounted
  useEffect(() => {
    if (mainVdRef.current) {
      const playVideo = () => {
        mainVdRef.current.play().catch((err) => {
          console.log("Main video play error:", err);
        });
      };

      if (document.readyState === "complete") {
        playVideo();
      } else {
        window.addEventListener("load", playVideo, { once: true });
      }
    }
  }, []);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setIsHovering(false); // Hide preview after clicking
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);

    // Set a timeout to reset the clicked state after animation completes
    setTimeout(() => {
      setHasClicked(false);
    }, 2500); // Slightly longer than the animation duration
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useGSAP(
    () => {
      if (hasClicked && nextVdRef.current) {
        gsap.set("#next-video", { visibility: "visible" });

        const tl = gsap.timeline();

        tl.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            if (nextVdRef.current) {
              nextVdRef.current.play().catch((err) => {
                console.log("Animation video play error:", err);
              });
            }
          },
        });

        tl.from(
          "#current-video",
          {
            transformOrigin: "center center",
            scale: 0,
            duration: 1.5,
            ease: "power1.inOut",
          },
          "-=0.5"
        );
      }
    },
    {
      dependencies: [currentIndex, hasClicked],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div
            className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className={`origin-center scale-50 transition-all duration-500 ease-in ${
                  isHovering ? "scale-100 opacity-100" : "opacity-0"
                }`}
              >
                <video
                  ref={currentVdRef}
                  src={`videos/hero-${(currentIndex % totalVideos) + 1}.mp4`}
                  loop
                  muted
                  playsInline
                  crossOrigin="anonymous"
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            src={`videos/hero-${currentIndex}.mp4`}
            loop
            muted
            playsInline
            crossOrigin="anonymous"
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          />
          <video
            ref={mainVdRef}
            src={`videos/hero-${currentIndex}.mp4`}
            autoPlay
            loop
            muted
            playsInline
            crossOrigin="anonymous"
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-white text-shadow-lg">
          King<b> of the Pirates</b>
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100 text-shadow-lg">
              ONE
              <b>
                {" "}
                <br />
                Piece
              </b>
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100 text-shadow-sm">
              The world is waiting for the next Pirate King... <br />
              Set sail, gather your crew, and claim the <b>One Piece!</b>
            </p>
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-white text-shadow-lg">
        King<b> of the Pirates</b>
      </h1>
    </div>
  );
};

export default Hero;
