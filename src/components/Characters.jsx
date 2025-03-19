import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";

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

    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`
    );
  };

  return (
    <div
      ref={itemRef}
      className={className}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransformStyle("")}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isReadMore, link }) => {
  return (
    <div className="relative size-full">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-20 flex size-full flex-col justify-between p-5 text-white">
        <div>
          <h1 className="bento-title special-font text-shadow-lg">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base text-shadow">
              {description}
            </p>
          )}
        </div>

        {isReadMore && (
          <div
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-white/90 px-5 py-2 text-xs uppercase text-black/80 mt-2"
            onClick={() => link && window.open(link, "_blank")}
          >
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">Explore More</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Characters = () => (
  <section className="bg-black pb-32">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-20 text-center">
        <p className="font-circular-web text-lg text-amber-400 mb-2">
          The Legends Live On
        </p>
        <AnimatedTitle
          title="Masters of the <b>Grand Line</b>"
          className="special-font !text-4xl sm:!text-5xl md:!text-6xl lg:!text-[4rem] xl:!text-[5rem] font-zentry !font-black !leading-[0.9] text-white"
        />

        <p className="max-w-2xl mx-auto font-circular-web text-lg text-blue-50 opacity-80">
          Discover the strongest warriors, cunning strategists, and legendary
          pirates from the world of One Piece. Each character has a unique story
          and power that defines their legacy.
        </p>
      </div>

      {/* Two cards in a row layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 - Zoro */}
        <BentoTilt
          id="zoro"
          className="w-full border border-green-500/30 rounded-md overflow-hidden h-[500px]"
        >
          <BentoCard
            src="videos/zoro.mp4"
            title="Roronoa Zoro"
            description="The swordsman of the Straw Hat crew, mastering the Three-Sword Style."
            isReadMore
            link={"https://onepiece.fandom.com/wiki/Roronoa_Zoro"}
          />
        </BentoTilt>

        {/* Card 2 - Shanks */}
        <BentoTilt className="w-full border border-red-500/30 rounded-md overflow-hidden h-[500px]">
          <BentoCard
            src="videos/red-shanks.mp4"
            title="Red-Haired Shanks"
            description="One of the Four Emperors, the man who inspired Luffy to become a pirate."
            isReadMore
            link={"https://onepiece.fandom.com/wiki/Shanks"}
          />
        </BentoTilt>

        {/* Trafalgar Law */}
        <BentoTilt className="w-full border border-red-500/30 rounded-md overflow-hidden h-[500px]">
          <BentoCard
            src="videos/law.mp4"
            title={
              <>
                TRAFALGAR
                <br />
                D. WATER LAW
              </>
            }
            description="Surgeon of Death · Former Warlord · Ope Ope no Mi User"
            isReadMore
            link="https://onepiece.fandom.com/wiki/Trafalgar_D._Water_Law"
          />
        </BentoTilt>

        {/* Monkey D. Garp */}
        <BentoTilt className="w-full border border-red-500/30 rounded-md overflow-hidden h-[500px]">
          <BentoCard
            src="videos/garp.mp4"
            title={
              <>
                MONKEY D.
                <br />
                GARP
              </>
            }
            description="The Hero of Marines · Fist of Justice · Dragon's Father"
            isReadMore
            link="https://onepiece.fandom.com/wiki/Monkey_D._Garp"
          />
        </BentoTilt>

        {/* Gol D. Roger */}
        <BentoTilt className="w-full border border-red-500/30 rounded-md overflow-hidden h-[500px]">
          <BentoCard
            src="videos/roger.mp4"
            title={
              <>
                GOL D.
                <br />
                ROGER
              </>
            }
            description="The Pirate King · Conqueror of the Grand Line"
            isReadMore
            link="https://onepiece.fandom.com/wiki/Gol_D._Roger"
          />
        </BentoTilt>

        {/* Blackbeard */}
        <BentoTilt className="w-full border border-red-500/30 rounded-md overflow-hidden h-[500px]">
          <BentoCard
            src="videos/blackbeard.mp4"
            title={
              <>
                MARSHALL D.
                <br />
                TEACH
              </>
            }
            description="Two Devil Fruit Wielder · Emperor of the Sea"
            isReadMore
            link="https://onepiece.fandom.com/wiki/Marshall_D._Teach"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Characters;
