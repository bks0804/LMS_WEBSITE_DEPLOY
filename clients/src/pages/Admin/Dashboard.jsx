import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import DashboardAnalytics from "./analytics/DashboardAnalytics";
import CourseTable from "./course/CourseTable";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("content1");

  return (
    // <div className="flex mt-20">
    //   <div>
    //     <Sidebar />
    //   </div>

    //   <div className="">hello from dashboard</div>
    // </div>
    // <div className="mt-20">
    //   <aside
    //     id="sidebar-multi-level-sidebar"
    //     className="fixed top-20 left-0 z-10 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    //     aria-label="Sidebar"
    //   >
    //     <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
    //       <ul className="space-y-4 font-medium ml-5 mt-12 text-[#0c2e60]">
    //         <li onClick={() => setActiveTab("content1")}>
    //           <Link className="flex gap-x-2">
    //             <span>
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width={20}
    //                 height={20}
    //               >
    //                 <path
    //                   fill="currentColor"
    //                   d="M3 22V8h4v14zm7 0V2h4v20zm7 0v-8h4v8z"
    //                 />
    //               </svg>
    //             </span>
    //             <h1 className="text-lg font-bold">Dashboard</h1>
    //           </Link>
    //         </li>

    //         <Link
    //           className="flex gap-x-2"
    //           onClick={() => setActiveTab("content2")}
    //         >
    //           <span>
    //             <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26}>
    //               <path
    //                 fill="currentColor"
    //                 d="M9.875 0a1 1 0 0 0-.406.156S8.204.952 6.844 1.813c-1.36.86-2.873 1.808-3.219 2l-.063.03C2.306 4.618 2.045 5.884 2 6.594c-.003.033 0 .06 0 .095-.011.266 0 .437 0 .437v13.063C2 22.087 4.213 23 6.313 23c.7 0 1.4-.113 2-.313.4-.2.687-.6.687-1v-10.5c0-2.3.5-3.38 2-4.28.4-.2 4.594-3.095 4.594-3.095.2-.2.406-.606.406-.906v-.094c0-.4-.2-.706-.5-.906s-.7-.2-1 0c-.1.1-6.2 4.207-7.5 4.907-1.3.8-2.513.993-2.813.593-.093-.093-.174-.378-.187-.656v-.063c.001-.272.071-.784.625-1.125.562-.313 1.957-1.204 3.313-2.062.573-.363.644-.402 1.093-.688A1 1 0 0 0 11 2.5V1a1 1 0 0 0-1.125-1m8 3.5a1 1 0 0 0-.438.188s-5.034 3.387-5.906 3.968l-.031.032c-.724.543-1.153 1.189-1.344 1.78A3.3 3.3 0 0 0 10 10.5v.313a1 1 0 0 0 0 .093V23c0 1.9 2.188 3 4.188 3 .9 0 1.712-.194 2.312-.594 1.2-.7 7-5.218 7-5.218.3-.2.5-.482.5-.782v-13c0-.5-.194-.8-.594-1-.3-.2-.793-.106-1.093.094-1.6 1.2-5.907 4.588-6.907 5.188-1.4.8-2.719 1-3.219.5-.2-.2-.187-.388-.187-.688q.008-.26.063-.438c.056-.174.17-.388.593-.718.02-.016.01-.015.031-.031.723-.483 2.934-1.99 4.376-2.97A1 1 0 0 0 19 6V4.5a1 1 0 0 0-1.125-1M22 10.813v2l-5 3.874v-2z"
    //               />
    //             </svg>
    //           </span>
    //           <h1 className="text-lg font-bold">Courses</h1>
    //         </Link>
    //       </ul>
    //     </div>
    //   </aside>

    //   <div className="p-4 sm:ml-64">
    //     <div className="md:p-4">
    //       {activeTab === "content1" ? (
    //         <div className="">
    //           <DashboardAnalytics />
    //         </div>
    //       ) : (
    //         <div className="">
    //           <CourseTable />
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>

    <div className="mt-24">
      <Sidebar />
    </div>
  );
};

export default Dashboard;
