import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../components/ContextApi";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const { setGetNewQuery } = useContext(AppContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    phoneNumber: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleContactDetails = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/api/contactus/querycreate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data);
      setGetNewQuery((prevList) => [...prevList, response.data.createQuery]);

      alert("query is created");
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        phoneNumber: "",
        message: "",
      });
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="mt-20 bg-gray-200">
      <div className="relative">
        <div
          className="absolute inset-0 bg-[rgba(0,0,0,0.5)]"
          aria-hidden="true"
        ></div>
        <img
          src="./contact/page-banner-1.jpg"
          className="h-80 w-full object-cover"
          alt=""
        />
      </div>

      <div className="max-w-7xl grid lg:grid-flow-col grid-cols-12 gap-8 px-3 sm:px-12 md:px-16 lg:px-0 mt-12 pb-12 mx-auto">
        <div className="col-span-12 lg:col-span-7 bg-white rounded-lg p-5 sm:p-8 md:p-12">
          <div className="space-y-5">
            <h1 className="text-2xl font-bold text-primary relative after:absolute after:content-[''] after:left-0 after:-bottom-[3px] after:w-12 after:h-[2.5px] after:bg-yellow-500">
              Contact Us
            </h1>
            <h2 className="text-5xl font-bold">Keep in touch</h2>
          </div>

          <form action="" onSubmit={handleContactDetails}>
            <div className="space-y-12 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3 mt-2">
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-[##8a8a8a] outline outline-1 -outline-offset-1 outline-[#a1a1a1] placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                  />
                </div>

                <div className="sm:col-span-3 mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-[#a1a1a1] placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                  />
                </div>

                <div className="sm:col-span-3 mt-2">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-[#a1a1a1] placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                  />
                </div>
                <div className="sm:col-span-3 mt-2">
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-[#a1a1a1] placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                  />
                </div>

                <div className="sm:col-span-6 mt-2">
                  <div className="mt-2">
                    <textarea
                      name="message"
                      id="message"
                      cols="30"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      maxLength={100}
                      placeholder="Message"
                      className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-[#a1a1a1] placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            {/* {error && <p className="text-red-600 text-start mb-4">{error}</p>} */}
            <button
              type="submit"
              className="flex justify-center rounded-md bg-secondary px-6 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-[#4080e1fd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send
            </button>
          </form>
        </div>
        <div className="col-span-12 lg:col-span-5 space-y-5">
          <div className="p-5 sm:p-8 md:p-12 lg:px-7 lg:py-12 bg-white rounded-lg">
            <ul className="space-y-5">
              <li className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={48}
                  height={48}
                  viewBox="0 0 24 24"
                  className="border border-primary p-2 rounded-full"
                >
                  <path
                    fill="#0c2e60"
                    d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
                  />
                </svg>

                <p className="text-base text-gray-600 font-medium">
                  789 Pine Road, North District, Montreal, Canada
                </p>
              </li>
              <li className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={48}
                  height={48}
                  viewBox="0 0 24 24"
                  className="border border-primary p-2.5 rounded-full"
                >
                  <g fill="#0c2e60" fillRule="evenodd">
                    <path d="m12.593 23.258-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
                    <path
                      fill="#0c2e60"
                      d="M16.552 22.133c-1.44-.053-5.521-.617-9.795-4.89-4.273-4.274-4.836-8.354-4.89-9.795-.08-2.196 1.602-4.329 3.545-5.162a1.47 1.47 0 0 1 1.445.159c1.6 1.166 2.704 2.93 3.652 4.317a1.504 1.504 0 0 1-.256 1.986l-1.951 1.449a.48.48 0 0 0-.142.616c.442.803 1.228 1.999 2.128 2.899s2.153 1.738 3.012 2.23a.483.483 0 0 0 .644-.162l1.27-1.933a1.503 1.503 0 0 1 2.056-.332c1.407.974 3.049 2.059 4.251 3.598a1.47 1.47 0 0 1 .189 1.485c-.837 1.953-2.955 3.616-5.158 3.535"
                    />
                  </g>
                </svg>
                <p className="text-base text-gray-600 font-medium">
                  +91 9889107243 <br /> +91 9340578838
                </p>
              </li>
              <li className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={48}
                  height={48}
                  viewBox="0 0 24 24"
                  className="border border-primary p-2.5 rounded-full"
                >
                  <path
                    fill="#0c2e60"
                    d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7L4 8v10h16V8zm0-2 8-5H4zM4 8V6v12z"
                  />
                </svg>
                <p className="text-base text-gray-600 font-medium">
                  contact@yourmail.com <br />
                  help.pixelcurve@gmail.com
                </p>
              </li>
              <li className="flex items-center gap-5 pt-3 pl-2">
                <Link className="border border-primary text-primary p-2 hover:text-white hover:bg-primary">
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
                <Link className="border border-primary text-primary p-2 hover:text-white hover:bg-primary">
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
                      d="m3 21 7.548-7.548M21 3l-7.548 7.548m0 0L8 3H3l7.548 10.452m2.904-2.904L21 21h-5l-5.452-7.548"
                      color="currentColor"
                    />
                  </svg>
                </Link>
                <Link
                  className="border border-primary text-primary p-2 hover:text-white hover:bg-primary"
                  href=""
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                  >
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
                <Link className="border border-primary text-primary p-2 hover:text-white hover:bg-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                  >
                    <path
                      fill="currentColor"
                      d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d357583.38175502646!2d-74.3357248039348!3d45.557965900928814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a541c64b70d%3A0x654e3138211fefef!2sMontreal%2C%20QC%2C%20Canada!5e0!3m2!1sen!2sin!4v1742476297225!5m2!1sen!2sin"
            height="350"
            style={{ border: 0 }}
            className="rounded-lg w-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
