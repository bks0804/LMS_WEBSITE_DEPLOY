import FullscreenButton from "../components/FullscreenButton";
import Carousel from "../components/Home pages/Carousel";
import CourseCategories from "./CourseCategories";
import Courses from "./Student/Courses";
import TeacherCards from "./TeacherCards";

const Home = () => {
  return (
    <div>
      <Carousel />
      {/* <FullscreenButton /> */}

      <div className="mx-auto mt-16 sm:px-6">
        <h2 className="text-3xl md:text-5xl py-12 font-semibold text-primary text-center">
          Top Course Categories
        </h2>
        <CourseCategories />
      </div>

      <div className="pt-20">
        <h1 className="text-3xl md:text-5xl font-semibold text-primary text-center">
          Our Popular Courses
        </h1>
        <div className="px-2">
          <Courses />
        </div>
      </div>
      <TeacherCards />
    </div>
  );
};

export default Home;
