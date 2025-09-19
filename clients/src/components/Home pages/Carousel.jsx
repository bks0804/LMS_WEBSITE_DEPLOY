import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
const Carousel = () => {
  const [counterOn, setCounterOn] = useState(false);

  return (
    <ScrollTrigger
      onEnter={() => setCounterOn(true)}
      onLeave={() => setCounterOn(false)}
    >
      <div
        className="mt-20 grid space-x-16 grid-col-1 lg:grid-cols-2 items-center max-w-7xl space-y-12 lg:space-y-0 mx-auto px-5 md:px-16 lg:px-5 "
        id="make-fullscreen"
      >
        <div className="mt-5">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#1f1c35] py-3 text-wrap">
            Explore Your Learning
            <p> Potetial with us</p>
          </h1>
          <p className="text-[#4f536c] py-6 md:py-10">
            Discover endless learning opportunities with our eLearning platform.
            Unlock your potential through expertly curated courses designed to
            help you grow and succeed, anytime, anywhere.
          </p>

          <div>
            <button className="flex mt-3 gap-2 group items-center justify-center w-48 py-4 border-2 border-primary text-primary text-base font-semibold  hover:bg-[#edfc67] rounded-full transition-all ease-in-out duration-500">
              <span className="text-base">Explore Now</span>
              <span className="group-hover:pl-2 transition-all ease-in-out duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={28}
                  height={28}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M14.707 7.293a1 1 0 1 0-1.414 1.414L15.586 11H6a1 1 0 1 0 0 2h9.586l-2.293 2.293a1 1 0 0 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="hidden md:block z-0">
          <div className="flex">
            <div className="relative z-10">
              <div className="mb-3">
                <img src="./carousel/img-10.png" alt="" />
              </div>
              <div className="flex items-center justify-center lg:gap-x-3 border-2 border-orange-400 py-3 rounded-full mx-16">
                <div className="">
                  <ul className="flex">
                    <li>
                      <img src="./carousel/1.webp" alt="" />
                    </li>
                    <li className="relative right-2">
                      <img src="./carousel/2.webp" alt="" />
                    </li>{" "}
                    <li className="relative right-3.5">
                      <img src="./carousel/3.webp" alt="" />
                    </li>{" "}
                    <li className="relative right-6">
                      <img src="./carousel/4.webp" alt="" />
                    </li>
                  </ul>
                </div>
                <div className="text-center text-[#1f1c35]">
                  <h3 className="text-2xl font-bold text-black">
                    {counterOn && (
                      <CountUp start={0} end={3000} duration={2} delay={0} />
                    )}
                    +
                  </h3>
                  <p className="text-sm text-nowrap">Knowledge Seekers</p>
                </div>
              </div>
            </div>
            {/* <div className="space-y-8">
              <div className="text-center flex items-center justify-between bg-[#57f2d0] px-12 py-5 h-20 rounded-full text-[#1f1c35]"></div>
              <div>
                <img src="./carousel/img-2.webp" alt="" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </ScrollTrigger>
  );
};

export default Carousel;
