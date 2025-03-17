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
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white">
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
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-white/90 px-5 py-2 text-xs uppercase text-black/80 max-md:hidden mt-2"
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

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Enter the **Grand Line**
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          The journey to becoming the **Pirate King** begins here. **Legends,
          myths, and the strongest warriors** await beyond the horizon.
        </p>
      </div>

      {/* Featured Bento Card - Luffy Gear 5 */}
      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/luffy-gear5.mp4"
          title={<>**Luffy - Gear 5**</>}
          description="Luffy's most powerful transformation, **liberating his true potential with the power of the Sun God Nika.**"
          isReadMore
          link={"https://onepiece.fandom.com/wiki/Gear_Fifth"}
        />
      </BentoTilt>

      <div className="xl:grid xl:h-[135vh] w-full xl:grid-cols-2 xl:grid-rows-3 gap-7 flex flex-col items-center">
        {/* Zoro */}
        <BentoTilt
          id="zoro"
          className="bento-tilt_1 xl:col-span-1 w-full border-2 border-green-500"
        >
          <BentoCard
            src="videos/zoro.mp4"
            title={
              <>
                R<b>o</b>r<b>o</b>n<b>o</b>a Z<b>o</b>ro
              </>
            }
            description="The **swordsman of the Straw Hat crew**, mastering the **Three-Sword Style.**"
            isReadMore
            link={"https://onepiece.fandom.com/wiki/Roronoa_Zoro"}
          />
        </BentoTilt>

        {/* Shanks */}
        <BentoTilt className="bento-tilt_1 xl:col-span-1 w-full">
          <BentoCard
            src="videos/shanks.mp4"
            title={<>**Red-Haired Shanks**</>}
            description="One of the **Four Emperors**, the man who inspired **Luffy** to become a pirate."
            isReadMore
            link={"https://onepiece.fandom.com/wiki/Shanks"}
          />
        </BentoTilt>

        {/* Gol D. Roger */}
        <BentoTilt className="bento-tilt_1 row-span-1 xl:col-span-1 xl:row-span-2 w-full h-full">
          <BentoCard
            src="videos/roger.mp4"
            title={
              <>
                G<b>o</b>l D. R<b>o</b>ger
              </>
            }
            description="The **legendary Pirate King**, who conquered the **Grand Line** and left the **One Piece**."
            isReadMore
            link={"https://onepiece.fandom.com/wiki/Gol_D._Roger"}
          />
        </BentoTilt>

        {/* Blackbeard */}
        <BentoTilt className="bento-tilt_1 w-full xl:col-span-1 xl:me-0">
          <BentoCard
            src="videos/blackbeard.mp4"
            title={<>**Marshall D. Teach (Blackbeard)**</>}
            description="The only pirate to **wield two Devil Fruits** and a dangerous rival to Luffy."
            isReadMore
            link={"https://onepiece.fandom.com/wiki/Marshall_D._Teach"}
          />
        </BentoTilt>

        {/* One Piece Map Animation */}
        <BentoTilt className="bento-tilt_2 w-full">
          <video
            src="videos/onepiece-map.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
