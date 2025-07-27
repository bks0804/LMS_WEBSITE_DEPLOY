import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavData, SupportData } from "../_moke/NavData";

const Footer = () => {
  const location = useLocation();
  const isFooterHidden = location.pathname.startsWith("/admin");

  if (isFooterHidden) return null;

  return (
    <div className="">
      <div className="bg-gray-300 px-5 lg:px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 px-5 sm:px-0 py-10 space-y-5 lg:space-x-5">
          <div className="lg:col-span-3">
            <img src="./logo/logo8.png" className="w-36 h-14" alt="" />
            <p className="text-wrap text-primary text-md font-semibold mt-5">
              Discover endless learning opportunities with our eLearning
              platform. Unlock your potential through expertly curated courses
              designed to help you grow and succeed, anytime, anywhere.
            </p>
            <span className="mt-10 flex items-center space-x-3">
              <Link
                className="border border-black  hover:border-white p-1.5 hover:bg-primary hover:text-white"
                href=""
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={0}
                    d="M8.268 28H2.463V9.306h5.805zM5.362 6.756C3.506 6.756 2 5.218 2 3.362a3.362 3.362 0 0 1 6.724 0c0 1.856-1.506 3.394-3.362 3.394M29.994 28h-5.792v-9.1c0-2.169-.044-4.95-3.018-4.95-3.018 0-3.481 2.356-3.481 4.794V28h-5.799V9.306h5.567v2.55h.081c.775-1.469 2.668-3.019 5.492-3.019 5.875 0 6.955 3.869 6.955 8.894V28z"
                  />
                </svg>
              </Link>

              <Link className="border border-black hover:border-white p-1.5 hover:bg-primary hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="m3 21 7.548-7.548M21 3l-7.548 7.548m0 0L8 3H3l7.548 10.452m2.904-2.904L21 21h-5l-5.452-7.548"
                    color="currentColor"
                  />
                </svg>
              </Link>
              <Link
                className="border border-black  hover:border-white p-1.5 hover:bg-primary hover:text-white"
                href=""
              >
                {" "}
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                  <g fill="none">
                    <path
                      stroke="currentColor"
                      strokeWidth={2}
                      d="M3 11c0-3.771 0-5.657 1.172-6.828S7.229 3 11 3h2c3.771 0 5.657 0 6.828 1.172S21 7.229 21 11v2c0 3.771 0 5.657-1.172 6.828S16.771 21 13 21h-2c-3.771 0-5.657 0-6.828-1.172S3 16.771 3 13z"
                    />
                    <circle cx={16.5} cy={7.5} r={1.5} fill="currentColor" />
                    <circle
                      cx={12}
                      cy={12}
                      r={3}
                      stroke="currentColor"
                      strokeWidth={2}
                    />
                  </g>
                </svg>
              </Link>
              <Link className="border border-black hover:border-white p-1.5 hover:bg-primary hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                  <path
                    fill="currentColor"
                    d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z"
                  />
                </svg>
              </Link>
            </span>
          </div>
          <div className="px-10 lg:col-span-3 lg:ml-20">
            <h1 className="text-xl font-bold text-primary">Sitemap</h1>
            <ul className="space-y-1 mt-3">
              {NavData?.map((data, index) => (
                <li key={index} className="flex items-center rounded-md py-2">
                  <span>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="m10 17 5-5-5-5"
                      />
                    </svg>
                  </span>
                  <Link
                    className="text-lg font-semibold text-primary hover:text-secondary ml-0 transition-all duration-400 ease-linear hover:ml-2"
                    to={data.path}
                  >
                    {data.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-10 lg:col-span-3">
            <h1 className="text-xl font-bold text-primary">Support</h1>
            <ul className="space-y-1 mt-3">
              {SupportData?.map((data, index) => (
                <li key={index} className="flex items-center rounded-md py-2">
                  <span>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="m10 17 5-5-5-5"
                      />
                    </svg>
                  </span>
                  <Link
                    className="text-lg font-semibold text-primary hover:text-secondary ml-0 transition-all duration-400 ease-linear hover:ml-2"
                    to={data.path}
                  >
                    {data.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-3 lg:col-span-3">
            <h1 className="text-xl font-bold text-primary">Contact Us</h1>
            <ul className="space-y-3 pt-8">
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36}>
                  <path fill="" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>

                <span className="text-base text-primary font-medium">
                  789 Pine Road, North District, Montreal, Canada
                </span>
              </li>
              <li className="flex items-center gap-3  py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <g fill="" fillRule="evenodd">
                    <path d="m12.593 23.258-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
                    <path
                      fill=""
                      d="M16.552 22.133c-1.44-.053-5.521-.617-9.795-4.89-4.273-4.274-4.836-8.354-4.89-9.795-.08-2.196 1.602-4.329 3.545-5.162a1.47 1.47 0 0 1 1.445.159c1.6 1.166 2.704 2.93 3.652 4.317a1.504 1.504 0 0 1-.256 1.986l-1.951 1.449a.48.48 0 0 0-.142.616c.442.803 1.228 1.999 2.128 2.899s2.153 1.738 3.012 2.23a.483.483 0 0 0 .644-.162l1.27-1.933a1.503 1.503 0 0 1 2.056-.332c1.407.974 3.049 2.059 4.251 3.598a1.47 1.47 0 0 1 .189 1.485c-.837 1.953-2.955 3.616-5.158 3.535"
                    />
                  </g>
                </svg>
                <span className="text-base text-primary font-medium">
                  +91 9889107243
                </span>
              </li>
              <li className="flex items-center gap-3 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill=""
                    d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7L4 8v10h16V8zm0-2 8-5H4zM4 8V6v12z"
                  />
                </svg>
                <span className="text-base text-primary font-medium">
                  contact@yourmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-700 px-3 sm:px-5 lg:px-5">
        <div className="max-w-7xl mx-auto sm:flex items-center justify-between text-center md:text-start py-5 text-white">
          <p className="flex items-center text-nowrap">
            <span className="text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.23 13.697C14.974 15.095 13.767 16 12.142 16c-2.076 0-3.373-1.535-3.373-3.992v-.01C8.77 9.534 10.062 8 12.137 8c1.61 0 2.865 1.011 3.092 2.478M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10 10-4.477 10-10Z"
                />
              </svg>
            </span>{" "}
            Copyrights 2025 X7 e-Learning All rights reserved.
          </p>
          <p>Designed By X7 ITTechnology</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
