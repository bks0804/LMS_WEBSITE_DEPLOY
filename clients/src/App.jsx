import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Courses from "./pages/Student/Courses";
import MyLearning from "./pages/Student/My learning/MyLearning";
import MyProfile from "./pages/Student/MyProfile/MyProfile";
import { AppProvider } from "./components/ContextApi";
import Navbar from "./components/Navbar";
import AddCourse from "./pages/Admin/course/AddCourse";
import Dashboard from "./pages/Admin/Dashboard";
import CourseTable from "./pages/Admin/course/CourseTable";
import DashboardAnalytics from "./pages/Admin/analytics/DashboardAnalytics";
import EditCourse from "./pages/Admin/course/EditCourse";
import Sidebar from "./pages/Admin/Sidebar";
import CreateLecture from "./pages/Admin/lecture/CreateLecture";
import EditLecture from "./pages/Admin/lecture/EditLecture";
import CourseDetails from "./pages/Student/CourseDetails";
import CourseProgress from "./pages/Student/CourseProgress";
import SearchPage from "./pages/Student/SearchPage";
import Rating from "./pages/Student/Rating/Rating";
import {
  AdminRoute,
  AuthenticateUser,
  ProtectedRoute,
} from "./components/ui/ProtectedRoute";
import { PurchasedCourseProtectedRoute } from "./components/ui/PurchasedCourseProtectedRoute";
import AdminList from "./pages/Admin/AdminList";
import StudentList from "./pages/Admin/StudentList";
import TeacherCards from "./pages/TeacherCards";
import ContactUs from "./pages/ContactUs";
import Footer from "./pages/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Blogs from "./pages/blog/Blogs";
import BlogDetails from "./pages/blog/BlogDetails";
import BlogTable from "./pages/blog/BlogTable";
import LiveClass from "./pages/Admin/live_classes/LiveClass";
import ZoomMeeting from "./pages/Admin/live_classes/ZoomMeeting";
import AddLiveClasses from "./pages/Admin/live_classes/AddLiveClasses";
import MyAttendance from "./pages/Student/MyAttendance";
import UserAttendanceInCourses from "./pages/Admin/attendance/UserAttendanceInCourses";
import UserAttendanceDash from "./pages/Admin/attendance/UserAttendanceDash";
import AddBlog from "./pages/blog/AddBlog";
import EditBlog from "./pages/blog/EditBlog";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <>
      {/* <AppProvider>
        <Router>
          <Navbar />
          <Sidebar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/search" element={<SearchPage />} />
            <Route path="/rating" element={<Rating />} />
            <Route
              path="/course-details/:courseId"
              element={<CourseDetails />}
            />
            <Route
              path="/course-progress/:courseId"
              element={<CourseProgress />}
            />
            <Route path="/mylearning" element={<MyLearning />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/courses" element={<CourseTable />} />
            <Route
              path="/admin/dashboardanalytics"
              element={<DashboardAnalytics />}
            />
            <Route
              path="/admin/editcourse/:courseId"
              element={<EditCourse />}
            />
            <Route
              path="/admin/editcourse/:courseId/createlecture"
              element={<CreateLecture />}
            />{" "}
            <Route
              path="/admin/editcourse/:courseId/createlecture/:lectureId"
              element={<EditLecture />}
            />
          </Routes>
        </Router>
      </AppProvider> */}

      <AppProvider>
        <Router>
          <Navbar />
          <Sidebar />
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faculty" element={<TeacherCards />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogdetails" element={<BlogDetails />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            />
            <Route
              path="/signup"
              element={
                <AuthenticateUser>
                  <SignUp />
                </AuthenticateUser>
              }
            />
            <Route
              path="/signin"
              element={
                <AuthenticateUser>
                  <SignIn />
                </AuthenticateUser>
              }
            />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/search" element={<SearchPage />} />
            <Route path="/rating" element={<Rating />} />
            <Route
              path="/course-details/:courseId"
              element={<CourseDetails />}
            />
            <Route path="/:blogId/blog-details" element={<BlogDetails />} />
            <Route
              path="/course-progress/:courseId"
              element={
                <PurchasedCourseProtectedRoute>
                  <CourseProgress />
                </PurchasedCourseProtectedRoute>
              }
            />
            <Route path="/mylearning" element={<MyLearning />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/admin/addblog" element={<AddBlog />} />
            <Route path="/myattendance" element={<MyAttendance />} />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route path="/admin/courses" element={<CourseTable />} />
            <Route
              path="/admin/dashboardanalytics"
              element={<DashboardAnalytics />}
            />
            <Route
              path="/admin/editcourse/:courseId"
              element={<EditCourse />}
            />
            <Route path="/admin/editblog/:blogId" element={<EditBlog />} />
            <Route
              path="/admin/editcourse/:courseId/createlecture"
              element={<CreateLecture />}
            />{" "}
            <Route
              path="/admin/editcourse/:courseId/createlecture/:lectureId"
              element={<EditLecture />}
            />
            <Route path="/admin/adminlist" element={<AdminList />} />
            <Route path="/admin/studentlist" element={<StudentList />} />
            <Route path="/admin/blog" element={<BlogTable />} />
            <Route path="/admin/liveclass" element={<LiveClass />} />
            <Route path="/zoommeeting" element={<ZoomMeeting />} />
            <Route
              path="/admin/liveclass/addliveclass"
              element={<AddLiveClasses />}
            />
            <Route
              path="/admin/attendance"
              element={<UserAttendanceInCourses />}
            />
            <Route
              path="/admin/:courseId/:lectureId/attendancedash"
              element={<UserAttendanceDash />}
            />
          </Routes>
          <Footer />
        </Router>
      </AppProvider>
    </>
  );
}

export default App;
