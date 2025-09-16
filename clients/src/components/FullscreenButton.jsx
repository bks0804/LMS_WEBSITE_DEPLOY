import handleFullScreen from "../utils/fullscreen";

const FullscreenButton = () => {
  return (
    <button
      className="flex mt-3 gap-2 group items-center justify-center w-48 py-4 border-2 border-primary text-primary text-base font-semibold  hover:bg-[#edfc67] rounded-full transition-all ease-in-out duration-500"
      onClick={() => {
        handleFullScreen();
      }}
    >
      <span className="text-base">Make FUllscreen</span>
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
  );
};

export default FullscreenButton;
