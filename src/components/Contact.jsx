import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} className="object-cover w-full h-full" />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/ship.jpg"
            clipClass="w-[30dvw] lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute top-[-11rem] left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-10 lg:w-80">
          <ImageClipBox
            src="/img/shanks.png"
            clipClass="sword-man-clip-path md:scale-125 pt-24"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Set Sail for the Grand Line
          </p>

          <AnimatedTitle
            title="J<b>o</b>in the cre<b>w</b> and <br /> chase y<b>o</b>ur <br /> p<b>i</b>rate dreams!"
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button
            title="Join the Crew"
            containerClass="mt-10 cursor-pointer"
            link={"https://github.com/prateekraiger"}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
