import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "", id = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isReadMore, link }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font text-shadow-lg">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base text-shadow max-md:hidden">
              {description}
            </p>
          )}
        </div>

        {isReadMore && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-white/90 px-5 py-2 text-xs uppercase text-black/80 max-md:hidden mt-2"
            onClick={() => {
              if (link && link.length > 0) {
                window.open(link, "_blank");
              }
            }}
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">explore more</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const BentoCard2 = ({ src, title, description, isReadMore, link }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-black">
        <div>
          <h1 className="bento-title special-font text-shadow-lg">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base text-shadow max-md:hidden">
              {description}
            </p>
          )}
        </div>

        {isReadMore && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black/75 px-5 py-2 text-xs uppercase text-white/80 max-md:hidden mt-2"
            onClick={() => {
              if (link && link.length > 0) {
                window.open(link, "_blank");
              }
            }}
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">explore more</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Into the Tournament Of The Power
        </p>
        {/* <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          When all 10 warriors of a Universe are eliminated, that Universe, its
          deities (barring the angels of said universe), and its inhabitants are
          immediately erased by Zeno and Future Zeno.
        </p> */}
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          The Universe with the most survivors by the end of the tournament will
          be the victor. The winner of the tournament is granted one limitless
          wish from the Super Dragon Balls.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/super-dragon.mp4"
          title={
            <>
              s<b>u</b>per dragon b<b>a</b>lls
            </>
          }
          description="The Super Dragon Balls are a set of seven planet-sized Dragon Balls created by the Dragon God, Zalama."
          isReadMore
          link={"https://dragonball.fandom.com/wiki/Super_Dragon_Ball"}
        />
      </BentoTilt>

      <div className="xl:grid xl:h-[135vh] w-full xl:grid-cols-2 xl:grid-rows-3 gap-7 flex flex-col items-center">
        <BentoTilt
          id="beerus"
          className="bento-tilt_1 row-span-1 xl:col-span-1 xl:ms-0 w-full border-2 border-blue-500"
        >
          <BentoCard2
            src="videos/beerus.mp4"
            title={
              <>
                l<b>o</b>rd <br /> Be<b>e</b>rus
              </>
            }
            description={
              <span>
                The God of Destruction <br /> of Universe 7.
              </span>
            }
            isReadMore
            link={"https://dragonball.fandom.com/wiki/Beerus"}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 xl:col-span-1 xl:me-0 w-full">
          <BentoCard
            src="videos/zeno.mp4"
            title={
              <>
                Gr<b>a</b>nd <br /> Z<b>e</b>no
              </>
            }
            description={
              <span className="font-medium">
                The Omni-King <br /> is the supreme ruler <br /> of all the
                Multiverse.
              </span>
            }
            isReadMore
            link={"https://dragonball.fandom.com/wiki/Zeno"}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 xl:col-span-1 xl:row-span-2 w-full h-full">
          <BentoCard2
            src="videos/golden-frieza.mp4"
            title={
              <>
                goldern <br /> frie<b>z</b>a
              </>
            }
            description={
              <span className="font-medium">
                This transformation <br />
                is the Ultimate Evolution <br /> of the Frieza Race.
              </span>
            }
            isReadMore
            link={"https://dragonball.fandom.com/wiki/Golden_Frieza"}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 w-full xl:col-span-1 xl:me-0">
          <BentoCard
            src="videos/minister.mp4"
            title={
              <>
                Gr<b>a</b>nd <br /> Mini<b>s</b>ter
              </>
            }
            description={
              <span className="font-medium">
                is an Angel serving as a <br />
                close adviser and guiding <br /> figure to Zeno.
              </span>
            }
            isReadMore
            link={"https://dragonball.fandom.com/wiki/Grand_Minister"}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2 w-full">
          <video
            src="videos/zeno2.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>

        {/* <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt> */}
      </div>
    </div>
  </section>
);

export default Features;
