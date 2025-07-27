import React from "react";
import Star from "./Star";

const Rating = ({
  rating,
  setRating,
  handleSubmitRating,
  setShowRatingModal,
  handleUpdateExistedRating,
  setUpdateRatingModel,
  updateRatingModel,
  showRatingModal,
}) => {
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white p-3 sm:p-4 sm:pb-4">
                <div className="sm:flex sm:items-start items-center">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={48}
                      height={48}
                      viewBox="0 0 20 20"
                    >
                      <g fill="none">
                        <path
                          fill="url(#a)"
                          d="M10 12.755a6.97 6.97 0 0 0 4-1.255v6a.5.5 0 0 1-.79.407L10 16l-3.21 1.907A.5.5 0 0 1 6 17.5v-6a6.97 6.97 0 0 0 4 1.255"
                        />
                        <path
                          fill="url(#b)"
                          d="M16 8A6 6 0 1 1 4 8a6 6 0 0 1 12 0"
                        />
                        <path
                          fill="url(#c)"
                          d="M10.164 5.102a.175.175 0 0 0-.318 0L9.13 6.655a.18.18 0 0 1-.138.1l-1.699.202a.175.175 0 0 0-.098.302L8.451 8.42a.18.18 0 0 1 .053.163L8.17 10.26a.175.175 0 0 0 .257.187l1.493-.835a.18.18 0 0 1 .17 0l1.493.835c.13.073.286-.04.257-.187l-.333-1.677a.18.18 0 0 1 .053-.163l1.255-1.161a.175.175 0 0 0-.098-.302l-1.698-.202a.18.18 0 0 1-.139-.1z"
                        />
                        <defs>
                          <radialGradient
                            id="a"
                            cx={0}
                            cy={0}
                            r={1}
                            gradientTransform="matrix(0 10.2442 -17.6591 0 10 10.486)"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#163697" />
                            <stop offset={1} stopColor="#29c3ff" />
                          </radialGradient>
                          <radialGradient
                            id="b"
                            cx={0}
                            cy={0}
                            r={1}
                            gradientTransform="rotate(56.615 26.168 -40.357) scale(66.981 57.3661)"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset={0.772} stopColor="#ffcd0f" />
                            <stop offset={0.991} stopColor="#e67505" />
                          </radialGradient>
                          <radialGradient
                            id="c"
                            cx={0}
                            cy={0}
                            r={1}
                            gradientTransform="matrix(-2.86665 -9.57203 13.81794 -4.13822 11.438 10.47)"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#b03111" />
                            <stop offset={1} stopColor="#e67505" />
                          </radialGradient>
                        </defs>
                      </g>
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-3xl font-semibold text-gray-900"
                      id="modal-title"
                    >
                      Rate this Lecture
                    </h3>
                    <div className="mt-2 py-6 flex gap-2">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          index={index}
                          rating={rating}
                          setRating={setRating}
                        />
                      ))}
                    </div>
                    <p className="text-2xl text-gray-500 font-bold">
                      {rating} Out of 5
                    </p>
                    <p className="text-md font-semibold">
                      Please provide rating before moving to next lecture
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={handleSubmitRating || handleUpdateExistedRating}
                >
                  Submit
                </button>
                {updateRatingModel&&(<button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  // onClick={() =>
                  //   setShowRatingModal(false)
                  // }
                  onClick={() => {
                     if (updateRatingModel) setUpdateRatingModel(false);
                  }}
                >
                  Cancel
                </button>)}

                {/* <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  // onClick={() =>
                  //   setShowRatingModal(false)
                  // }
                  onClick={() => {
                    if (showRatingModal) setShowRatingModal(false);
                    else if (updateRatingModel) setUpdateRatingModel(false);
                  }}
                >
                  Cancel
                </button> */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
