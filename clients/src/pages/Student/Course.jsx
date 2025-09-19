import { Link } from "react-router-dom";

const Course = ({ course }) => {
  const calculateAvgRating = (lectures) => {
    if (!lectures || lectures?.length === 0) return 0;

    let totalRating = 0;
    let ratingCount = 0;

    lectures.forEach((lecture) => {
      if (lecture?.ratings?.length) {
        lecture.ratings.forEach((ratingObj) => {
          if (typeof ratingObj.rating === "number") {
            totalRating += ratingObj.rating;
            ratingCount++;
          }
        });
      }
    });

    return ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : 0;
  };

  const avgRating = calculateAvgRating(course.lectures);

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (avgRating >= i) {
      stars.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="#f7b42f"
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21z"
          />
        </svg>
      ); // Full Star
    } else if (avgRating >= i - 0.5) {
      stars.push(
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
          <g fill="#f7b42f" fillRule="evenodd">
            <path
              fill="#e1dfdf"
              // fillOpacity={0.2}
              d="M12 16.667V2l2.5 7.5H22L16 14l3 8z"
            />
            <path d="M12 16.667 5 22l3-8-6-4.5h7.5L12 2z" />
          </g>
        </svg>
      ); // Half Star
    } else {
      stars.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="#e1dfdf"
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21z"
          />
        </svg>
      ); // Empty Star
    }
  }

  return (
    <Link
      className="mt-10 border p-3 rounded-lg max-w-fit pb-3 shadow-[0_6px_10px_rgba(0,0,0,0.3)]"
      to={`/course-details/${course._id}`}
    >
      <img
        className="object-cover aspect-auto rounded-t-lg transition-transform duration-300 delay-50 hover:scale-105"
        src={course.courseThumbnail}
        // src="./courseImg/hq720.jpg"
        alt=""
      />
      <div className="px-6 space-y-5">
        <div className="flex items-center justify-between text-[#4f536c] font-normal text-base py-3">
          <div className="flex items-center gap-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              viewBox="0 0 24 24"
            >
              <g
                fill="#4f536c"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                color="currentColor"
              >
                <path d="M2.5 6 8 4l5.5 2L11 7.5V9s-.667-.5-3-.5S5 9 5 9V7.5zm0 0v4" />
                <path d="M11 8.5v.889c0 1.718-1.343 3.111-3 3.111s-3-1.393-3-3.111V8.5m10.318 2.53s.485-.353 2.182-.353 2.182.352 2.182.352m-4.364 0V10L13.5 9l4-1.5 4 1.5-1.818 1v1.03m-4.364 0v.288a2.182 2.182 0 1 0 4.364 0v-.289M4.385 15.926c-.943.527-3.416 1.602-1.91 2.947C3.211 19.53 4.03 20 5.061 20h5.878c1.03 0 1.85-.47 2.586-1.127 1.506-1.345-.967-2.42-1.91-2.947-2.212-1.235-5.018-1.235-7.23 0M16 20h3.705c.773 0 1.387-.376 1.939-.902 1.13-1.076-.725-1.936-1.432-2.357A5.34 5.34 0 0 0 16 16.214" />
              </g>
            </svg>
            <span>{course?.enrolledStudents?.length} Students</span>
          </div>
          <div className="text-wrap text-base font-semibold">
            {course?.creator?.name || course?.creator?.firstName}{" "}
            {course?.creator?.lastName}
          </div>
        </div>
        <div className="flex items-center">
          {stars.map((svgItem, index) => {
            return <div key={index}>{svgItem}</div>;
          })}
          <span className="text-[#4f536c] text-lg font-normal ml-3">
            ({avgRating}/5 Ratings)
          </span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-primary hover:underline">
          {course.courseTitle}
        </h1>
        <div className="flex items-center justify-between">
          <span className="px-4 py-2 bg-green-400 rounded-md text-nowrap text-sm md:text-md lg:text-base font-semibold">
            Enroll Now
          </span>
          <div className="text-red-600 text-3xl font-semibold text-nowrap">
            ₹ {course?.coursePrice}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Course;
{
  /* <Link to={`/course-details/${course._id}`}>
<div>
  

  <div key={index} className="mt-10 ">
    <div className="">
      <div className="border p-3 rounded-lg max-w-fit pb-5 shadow-[0_6px_10px_rgba(0,0,0,0.3)]">
        <img
          className="object-cover aspect-auto rounded-t-lg transition-transform duration-300 delay-50 hover:scale-105"
          src={course.courseThumbnail}
          alt=""
        />
        <div className="px-6 space-y-5">
          <div className="flex items-center justify-between text-[#4f536c] font-normal text-base py-3">
            <div className="flex items-center gap-2 ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={28}
                  height={28}
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="#4f536c"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    color="currentColor"
                  >
                    <path d="M2.5 6 8 4l5.5 2L11 7.5V9s-.667-.5-3-.5S5 9 5 9V7.5zm0 0v4" />
                    <path d="M11 8.5v.889c0 1.718-1.343 3.111-3 3.111s-3-1.393-3-3.111V8.5m10.318 2.53s.485-.353 2.182-.353 2.182.352 2.182.352m-4.364 0V10L13.5 9l4-1.5 4 1.5-1.818 1v1.03m-4.364 0v.288a2.182 2.182 0 1 0 4.364 0v-.289M4.385 15.926c-.943.527-3.416 1.602-1.91 2.947C3.211 19.53 4.03 20 5.061 20h5.878c1.03 0 1.85-.47 2.586-1.127 1.506-1.345-.967-2.42-1.91-2.947-2.212-1.235-5.018-1.235-7.23 0M16 20h3.705c.773 0 1.387-.376 1.939-.902 1.13-1.076-.725-1.936-1.432-2.357A5.34 5.34 0 0 0 16 16.214" />
                  </g>
                </svg>
              </span>
              <span>250 Students</span>
            </div>
            <div className="text-wrap">{course.creator.name}</div>
          </div>
          <div className="flex items-center">
            {Array.from({ length: 5 })?.map((_, index) => {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  key={index}
                >
                  <path
                    fill="#f7b42f"
                    d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21z"
                  />
                </svg>
              );
            })}
            <span className="text-[#4f536c] text-lg font-normal ml-3">
              (5.0/5 Ratings)
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-primary hover:underline">
            {course.courseTitle}
          </h1>
          <div className="flex items-center justify-between">
            <div>
              <Link
                className="px-4 py-2 bg-green-400 rounded-md text-nowrap text-sm md:text-md lg:text-base font-semibold"
                to=""
              >
                Enroll Now
              </Link>
            </div>
            <div className="text-red-600 text-3xl font-semibold text-nowrap">
              ₹ {course.coursePrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</Link> */
}
