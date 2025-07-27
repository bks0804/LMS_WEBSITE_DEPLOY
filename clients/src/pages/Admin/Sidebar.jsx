import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../components/ContextApi";

const Sidebar = () => {
  const location = useLocation();
  const { user, setUser } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  // console.log(location);

  const isActive =
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/admin");

  if (!isActive) return null;

  return (
    // <div className="hidden md:block w-64 sm:w-52 h-[82.7vh] space-y-8 border-r sticky border-gray-300 bg-slate-50 py-10 mt-20">
    //   <div className="space-y-4 pl-6 text-[#0c2e60]">
    //     <Link to="/admin/dashboardanalytics" className="flex gap-x-2">
    //       <span>
    //         <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20}>
    //           <path
    //             fill="currentColor"
    //             d="M3 22V8h4v14zm7 0V2h4v20zm7 0v-8h4v8z"
    //           />
    //         </svg>
    //       </span>
    //       <h1 className="text-md font-bold">Dashboard</h1>
    //     </Link>
    //     <Link to="/admin/courses" className="flex gap-x-2">
    //       <span>
    //         <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26}>
    //           <path
    //             fill="currentColor"
    //             d="M9.875 0a1 1 0 0 0-.406.156S8.204.952 6.844 1.813c-1.36.86-2.873 1.808-3.219 2l-.063.03C2.306 4.618 2.045 5.884 2 6.594c-.003.033 0 .06 0 .095-.011.266 0 .437 0 .437v13.063C2 22.087 4.213 23 6.313 23c.7 0 1.4-.113 2-.313.4-.2.687-.6.687-1v-10.5c0-2.3.5-3.38 2-4.28.4-.2 4.594-3.095 4.594-3.095.2-.2.406-.606.406-.906v-.094c0-.4-.2-.706-.5-.906s-.7-.2-1 0c-.1.1-6.2 4.207-7.5 4.907-1.3.8-2.513.993-2.813.593-.093-.093-.174-.378-.187-.656v-.063c.001-.272.071-.784.625-1.125.562-.313 1.957-1.204 3.313-2.062.573-.363.644-.402 1.093-.688A1 1 0 0 0 11 2.5V1a1 1 0 0 0-1.125-1m8 3.5a1 1 0 0 0-.438.188s-5.034 3.387-5.906 3.968l-.031.032c-.724.543-1.153 1.189-1.344 1.78A3.3 3.3 0 0 0 10 10.5v.313a1 1 0 0 0 0 .093V23c0 1.9 2.188 3 4.188 3 .9 0 1.712-.194 2.312-.594 1.2-.7 7-5.218 7-5.218.3-.2.5-.482.5-.782v-13c0-.5-.194-.8-.594-1-.3-.2-.793-.106-1.093.094-1.6 1.2-5.907 4.588-6.907 5.188-1.4.8-2.719 1-3.219.5-.2-.2-.187-.388-.187-.688q.008-.26.063-.438c.056-.174.17-.388.593-.718.02-.016.01-.015.031-.031.723-.483 2.934-1.99 4.376-2.97A1 1 0 0 0 19 6V4.5a1 1 0 0 0-1.125-1M22 10.813v2l-5 3.874v-2z"
    //           />
    //         </svg>
    //       </span>
    //       <h1 className="text-md font-bold">Courses</h1>
    //     </Link>
    //   </div>
    // </div>

    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-20 left-5 z-50 p-2 bg-gray-200 rounded-full shadow-md"
      >
        ☰
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-20 left-0 z-0 w-48 lg:w-64 h-screen transition-transform bg-gray-50 dark:bg-gray-800 border-r ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full z-40 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-4 text-lg font-medium ml-5 mt-12">
            <li>
              <Link to="/admin/dashboardanalytics" className="flex gap-x-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mr-3"
                  >
                    <path
                      fill="#0c2e60"
                      d="M3 22V8h4v14zm7 0V2h4v20zm7 0v-8h4v8z"
                    />
                  </svg>
                </span>
                <h1 className="text-md font-bold text-gray-500">Dashboard</h1>
              </Link>
            </li>

            <Link to="/admin/courses" className="flex gap-x-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mr-3"
                >
                  <path
                    fill="#0c2e60"
                    d="M9.875 0a1 1 0 0 0-.406.156S8.204.952 6.844 1.813c-1.36.86-2.873 1.808-3.219 2l-.063.03C2.306 4.618 2.045 5.884 2 6.594c-.003.033 0 .06 0 .095-.011.266 0 .437 0 .437v13.063C2 22.087 4.213 23 6.313 23c.7 0 1.4-.113 2-.313.4-.2.687-.6.687-1v-10.5c0-2.3.5-3.38 2-4.28.4-.2 4.594-3.095 4.594-3.095.2-.2.406-.606.406-.906v-.094c0-.4-.2-.706-.5-.906s-.7-.2-1 0c-.1.1-6.2 4.207-7.5 4.907-1.3.8-2.513.993-2.813.593-.093-.093-.174-.378-.187-.656v-.063c.001-.272.071-.784.625-1.125.562-.313 1.957-1.204 3.313-2.062.573-.363.644-.402 1.093-.688A1 1 0 0 0 11 2.5V1a1 1 0 0 0-1.125-1m8 3.5a1 1 0 0 0-.438.188s-5.034 3.387-5.906 3.968l-.031.032c-.724.543-1.153 1.189-1.344 1.78A3.3 3.3 0 0 0 10 10.5v.313a1 1 0 0 0 0 .093V23c0 1.9 2.188 3 4.188 3 .9 0 1.712-.194 2.312-.594 1.2-.7 7-5.218 7-5.218.3-.2.5-.482.5-.782v-13c0-.5-.194-.8-.594-1-.3-.2-.793-.106-1.093.094-1.6 1.2-5.907 4.588-6.907 5.188-1.4.8-2.719 1-3.219.5-.2-.2-.187-.388-.187-.688q.008-.26.063-.438c.056-.174.17-.388.593-.718.02-.016.01-.015.031-.031.723-.483 2.934-1.99 4.376-2.97A1 1 0 0 0 19 6V4.5a1 1 0 0 0-1.125-1M22 10.813v2l-5 3.874v-2z"
                  />
                </svg>
              </span>
              <h1 className="text-md font-bold text-gray-500">Courses</h1>
            </Link>

            <Link to="/admin/blog" className="flex gap-x-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mr-3"
                >
                  <path
                    fill="#0c2e60"
                    d="M19 5v14H5V5zm2-2H3v18h18zm-4 14H7v-1h10zm0-2H7v-1h10zm0-3H7V7h10z"
                  />
                </svg>
              </span>
              <h1 className="text-md font-bold text-gray-500">Blog</h1>
            </Link>
            {/* <Link to="/admin/liveclass" className="flex gap-x-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mr-3"
                >
                  <path
                    fill="#0c2e60"
                    d="M19 5v14H5V5zm2-2H3v18h18zm-4 14H7v-1h10zm0-2H7v-1h10zm0-3H7V7h10z"
                  />
                </svg>
              </span>
              <h1 className="text-md font-bold text-gray-500">Live Classes</h1>
            </Link> */}

            {user?.user?.role === "superadmin" && (
              <>
                <Link to="/admin/adminlist" className="flex gap-x-1">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mr-3.5"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        color="#0c2e60"
                      >
                        <path d="M2 2h14c1.886 0 2.828 0 3.414.586S20 4.114 20 6v6c0 1.886 0 2.828-.586 3.414S17.886 16 16 16H9m1-9.5h6M2 17v-4c0-.943 0-1.414.293-1.707S3.057 11 4 11h2m-4 6h4m-4 0v5m4-5v-6m0 6v5m0-11h6" />
                        <path d="M6 6.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
                      </g>
                    </svg>
                  </span>
                  <h1 className="text-md font-bold text-gray-500">Admin</h1>
                </Link>
                <Link to="/admin/studentlist" className="flex gap-x-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mr-3"
                    >
                      <path
                        fill="#0c2e60"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="m19 5-7-3-7 3 3.5 1.5v2S9.667 8 12 8s3.5.5 3.5.5v-2zm0 0v4m-3.5-.5v1a3.5 3.5 0 1 1-7 0v-1m-.717 8.203c-1.1.685-3.986 2.082-2.229 3.831C6.413 21.39 7.37 22 8.571 22h6.858c1.202 0 2.158-.611 3.017-1.466 1.757-1.749-1.128-3.146-2.229-3.83a7.99 7.99 0 0 0-8.434 0"
                        color="#0c2e60"
                      />
                    </svg>
                  </span>
                  <h1 className="text-md font-bold text-gray-500">Student</h1>
                </Link>
                <Link to="/admin/attendance" className="flex gap-x-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7 mr-2"
                    >
                      <path
                        fill="#0c2e60"
                        strokeWidth={1.5}
                        d="M24.954 21c1.13 0 2.046.915 2.046 2.045v.205c0 1.868-1.571 3.75-5.5 3.75S16 25.125 16 23.25v-.205c0-1.13.916-2.045 2.046-2.045zM19.25 2a.75.75 0 0 1 .75.75V4h.25A2.75 2.75 0 0 1 23 6.75v6.542A4 4 0 0 0 21.5 13V6.75c0-.69-.56-1.25-1.25-1.25H7.75c-.69 0-1.25.56-1.25 1.25v15.5c0 .69.56 1.25 1.25 1.25h7.258c.03.513.152 1.02.37 1.5H7.75A2.75 2.75 0 0 1 5 22.25V6.75A2.75 2.75 0 0 1 7.75 4H8V2.75a.75.75 0 0 1 1.5 0V4h3.75V2.75a.75.75 0 0 1 1.5 0V4h3.75V2.75a.75.75 0 0 1 .75-.75m2.25 12a3 3 0 1 1 0 6 3 3 0 0 1 0-6m-8.173 4.004a.75.75 0 0 1 0 1.492l-.077.004h-3.5a.75.75 0 0 1 0-1.5h3.5zm3-4.5a.75.75 0 0 1 0 1.492L16.25 15h-6.5a.75.75 0 0 1 0-1.5h6.5zm2-4.5a.75.75 0 0 1 0 1.492l-.077.004h-8.5a.75.75 0 0 1 0-1.5h8.5z"
                      />
                    </svg>{" "}
                  </span>
                  <h1 className="text-md font-bold text-gray-500">
                    Attendance
                  </h1>
                </Link>
              </>
            )}
          </ul>
        </div>
      </aside>

      {/* Overlay on Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
