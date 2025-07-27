import React, { useContext, useEffect, useState } from "react";
import { NavData } from "../_moke/NavData";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./ContextApi";
import axios from "axios";

const Navbar = () => {
  const { getNewQuery, setGetNewQuery, user, setUser } = useContext(AppContext);
  const [openNot, setOpenNot] = useState(false);
  const [replyText, setReplyText] = useState({});
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobNavOpen, setIsMobNavOpen] = useState(false);
  const [viewNot, setViewNOt] = useState(true);

  const navigate = useNavigate();
  // Notification
  // console.log(getNewQuery)
  const notificationHandler = () => {
    setOpenNot((prevState) => !prevState);
  };

  const queryDeleteHandle = async (queryId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `FRONTEND_SERVER_API/api/contactus/${queryId}/deletequery`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setGetNewQuery((prevList) =>
        prevList.filter((x) => x._id !== response.data.deletedQuery._id)
      );
    } catch (error) {
      // console.log(error);
    }
  };

  const getAllQueryHandle = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "FRONTEND_SERVER_API/api/contactus/getallquery",

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setGetNewQuery(response.data.query);
      // console.log(response.data.query);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getAllQueryHandle();
  }, []);

  const viewNotificationHandle = () => {
    setViewNOt(false);
  };

  // Profile Image
  // const firstLettor = user
  // user.user?.firstName?.charAt(0).toUpperCase()
  //     : " ";

  const firstLettor = user?.user?.firstName?.charAt(0).toUpperCase() || " ";

  const textColor = () => {
    if (["A", "C", "E", "G", "I", "K", "B"].includes(firstLettor)) {
      return "bg-[#f2ae66]";
    } else if (["D", "F", "H", "J", "L"].includes(firstLettor)) {
      return "bg-[#9f5255]";
    } else if (["M", "O", "Q", "S", "U"].includes(firstLettor)) {
      return "bg-[#eb5a3c]";
    } else if (["N", "P", "R", "T", "V"].includes(firstLettor)) {
      return "bg-[#4c585b]";
    } else if (["W", "X", "Y", "Z"].includes(firstLettor)) {
      return "bg-[#86a788]";
    }
  };

  var User = user;

  const MobileNavHandle = () => {
    setIsMobNavOpen((PrevState) => !PrevState);
  };

  const ProfileHandle = () => {
    setIsProfileOpen((PreState) => !PreState);
  };

  const handleReplyChange = (e, queryId) => {
    setReplyText((prev) => ({
      ...prev,
      [queryId]: e.target.value,
    }));
  };

  const handleReplyText = async (userId, queryId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `FRONTEND_SERVER_API/api/contactus/${queryId}/replytoquery`,
        { replyText, userId },

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // setGetNewQuery(response.data.query);
      alert("Query replied successfully");
      // console.log(response.data);
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <div className="relative z-10">
      {isMobNavOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.8)] transition-opacity"
          aria-hidden="true"
        ></div>
      )}

      <nav className="bg-gray-300 fixed top-0 sm:block w-full z-40 lg:px-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex h-20 items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="absolute left-3 flex items-center md:hidden z-10">
              <button
                type="button"
                className="flex items-center justify-center rounded-md p-0.5 text-primary bg-gray-300 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={isMobNavOpen ? "true" : "false"}
                onClick={MobileNavHandle}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {isMobNavOpen ? (
                    <path
                      fill="currentColor"
                      d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    />
                  ) : (
                    <path
                      fill="currentColor"
                      d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
                    />
                  )}
                </svg>
              </button>
            </div>

            <div className="relative flex w-full items-center justify-between">
              <div className="flex items-center">
                <img
                  src="./logo/logo8.png"
                  className="w-36 h-14 hidden md:block"
                  alt=""
                />
              </div>

              <div className="md:hidden ml-12 flex items-center text-2xl font-bold">
                <img src="./logo/logo8.png" className="w-24 h-10" alt="" />
              </div>

              {/* Profile and Notification Icons */}

              <div className="relative flex items-center">
                <ul className="hidden md:flex space-x-5 text-lg font-bold">
                  {NavData.map((data, index) => (
                    <li
                      key={index}
                      className="rounded-md px-3 py-2 text-primary hover:text-secondary"
                    >
                      <Link to={data.path}>{data.title}</Link>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="rounded-full ml-12 mr-3 bg-gray-300 text-sm hover:outline-primary hover:outline hover:outline-offset-1"
                  onClick={ProfileHandle}
                >
                  {user ? (
                    user?.user?.photoUrl ? (
                      <img
                        className="h-12 w-12 md:h-14 md:w-14 rounded-full"
                        src={user.user?.photoUrl}
                        alt=""
                      />
                    ) : (
                      <span
                        className={`h-12 w-12 md:h-14 md:w-14 flex items-center ${textColor()} text-white justify-center rounded-full pt-[4px] pr-[8px] font-semibold text-3xl p-2.5`}
                      >
                        {firstLettor}
                      </span>
                    )
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={48}
                      height={48}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                      />
                    </svg>
                  )}
                </button>

                {/* <span onClick={} className="px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={32}
                    height={32}
                    viewBox="0 0 16 16"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                    >
                      <circle cx={8} cy={2.5} r={0.75} />
                      <circle cx={8} cy={8} r={0.75} />
                      <circle cx={8} cy={13.5} r={0.75} />
                    </g>
                  </svg>
                </span> */}

                {User ? (
                  isProfileOpen && (
                    <div
                      className="absolute right-0 lg:-right-25 top-20 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      {["student", "admin", "superadmin"].includes(
                        user.user.role
                      ) && (
                        <Link
                          to="/myattendance"
                          className="block px-4 py-2 mx-2 hover:rounded-md hover:bg-gray-100 text-md font-semibold text-primary"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-0"
                        >
                          Attendance
                        </Link>
                      )}

                      {["student", "admin"].includes(user.user.role) && (
                        <Link
                          to="/mylearning"
                          className="block px-4 py-2 mx-2 hover:rounded-md hover:bg-gray-100 text-md font-semibold text-primary"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-0"
                        >
                          My learning
                        </Link>
                      )}
                      <Link
                        to="/myprofile"
                        className="block px-4 py-2 mx-2 hover:rounded-md hover:bg-gray-100 text-md font-semibold text-primary"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-1"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        My Profile
                      </Link>
                      <button
                        className="flex items-center justify-start gap-12 px-4 py-2 mx-2 hover:rounded-md hover:bg-gray-100 text-md font-semibold text-primary"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                        onClick={() => {
                          localStorage.removeItem("token");
                          setUser(null);
                          setIsProfileOpen(false);
                          navigate("/signin");
                        }}
                      >
                        <span> Sign out</span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
                            />
                          </svg>
                        </span>
                      </button>

                      {["superadmin", "admin"].includes(user.user.role) && (
                        <Link
                          to="/admin/dashboardanalytics"
                          className="block px-6 py-2 mx-2 mt-2 rounded-md bg-gray-600 text-md font-semibold text-white"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-2"
                          onClick={() => {
                            setIsProfileOpen(false);
                          }}
                        >
                          Dashboard
                        </Link>
                      )}
                    </div>
                  )
                ) : (
                  <button
                    className="text-base font-semibold font-sans ml-2 px-3 py-2 bg-green-300 rounded-md"
                    onClick={() => navigate("/signin")}
                  >
                    Sign in
                  </button>
                )}

                <div className="relative">
                  {["superadmin", "admin"].includes(user?.user?.role) &&
                    getNewQuery.length !== 0 && (
                      <div className="absolute left-5 -top-3 bg-red-500 px-1.5 font-semibold rounded-full text-white text-sm">
                        {getNewQuery.length ? getNewQuery.length : ""}
                      </div>
                    )}

                  {["superadmin", "admin"].includes(user?.user?.role) && (
                    <button
                      onClick={notificationHandler}
                      type="button"
                      className="rounded-full bg-gray-500 p-1 hover:text-white text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>

                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {openNot && (
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

            <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-md transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="relative overflow-x-auto shadow-[0px_2px_10px_rgba(0,0,0,0.1)] sm:rounded-lg">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <caption className="p-5 text-xl font-bold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                          Our Queries
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              sr
                            </th>
                            <th scope="col" className="px-6 py-3">
                              name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              email
                            </th>
                            <th scope="col" className="px-6 py-3">
                              subject
                            </th>
                            <th scope="col" className="px-6 py-3">
                              phone no.
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Query
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Reply
                            </th>
                            <th scope="col" className="px-6 py-3">
                              delete
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {getNewQuery.map((item, index) => (
                            <tr
                              key={index}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                            >
                              <td scope="col" className="px-6 py-3 text-black">
                                {index + 1} .
                              </td>
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {item.fullName}
                              </th>
                              <td className="px-6 py-4">{item.email}</td>
                              <td className="px-6 py-4">{item.subject}</td>
                              <td className="px-6 py-4">{item.phoneNumber}</td>
                              <td className="px-6 py-4 text-start">
                                {item.message}
                              </td>
                              {/* Reply section */}
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <textarea
                                    value={replyText[item._id] || ""}
                                    onChange={(e) =>
                                      handleReplyChange(e, item._id)
                                    }
                                    className="p-2 border rounded-md w-64 resize-none"
                                    placeholder="Write your reply here..."
                                  />
                                  <button
                                    type="button"
                                    className="text-blue-600 hover:underline font-medium"
                                    onClick={() =>
                                      handleReplyText(item.userId, item._id)
                                    }
                                  >
                                    Reply
                                  </button>
                                </div>
                              </td>

                              <td className="px-6 py-4 text-right text-red-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={26}
                                  height={26}
                                  className="cursor-pointer"
                                  onClick={() => queryDeleteHandle(item._id)}
                                >
                                  <path
                                    fill="currentColor"
                                    d="M11.5-.031c-1.958 0-3.531 1.627-3.531 3.594V4H4c-.551 0-1 .449-1 1v1H2v2h2v15c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V8h2V6h-1V5c0-.551-.449-1-1-1h-3.969v-.438c0-1.966-1.573-3.593-3.531-3.593zm0 2.062h3c.804 0 1.469.656 1.469 1.531V4H10.03v-.438c0-.875.665-1.53 1.469-1.53zM6 8h5.125c.124.013.247.031.375.031h3c.128 0 .25-.018.375-.031H20v15c0 .563-.437 1-1 1H7c-.563 0-1-.437-1-1zm2 2v12h2V10zm4 0v12h2V10zm4 0v12h2V10z"
                                  />
                                </svg>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={viewNotificationHandle}
                      className="inline-flex w-full justify-center rounded-md text-red-600 border border-red-600 px-4 py-1.5 text-md font-semibold shadow-xs sm:ml-3 sm:w-auto"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenNot(false)}
                      className="mt-3 inline-flex w-full justify-center  rounded-md bg-white px-4 py-1.5 text-md font-semibold text-g ring-1 shadow-xs ring-gray-900 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${isMobNavOpen ? "block" : "hidden"} `}
          id="mobile-menu"
        >
          <ul className="space-y-1 px-2 pb-3 pt-2 text-lg font-semibold">
            {NavData.map((data, index) => (
              <li
                key={index}
                className="rounded-md px-3 py-2 text-primary hover:text-secondary"
              >
                <Link to={data.path}>{data.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
