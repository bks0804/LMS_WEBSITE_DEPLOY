import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [nextPage, setNextpage] = useState(false);
  // const [isCollegeStudent, SetIsCollegeStudent] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    phoneNumber: "",
    dateOfBirth: "",
    permanentAddress: "",
    school_CollegeName: "",
    board_UniversityName: "",
    class_DegreeName: "",
    yearOfStudy: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      phoneNumber,
      dateOfBirth,
      permanentAddress,
      school_CollegeName,
      board_UniversityName,
      class_DegreeName,
      yearOfStudy,
    } = formData;

    if (!firstName.trim()) return "First name is required.";
    if (!lastName.trim()) return "Last name is required.";
    if (!email.trim()) return "Email is required.";
    if (!gender.trim()) return "Gender is required.";
    if (!phoneNumber.trim()) return "Phone number is required.";
    if (!dateOfBirth) return "Date of birth is required.";
    if (!permanentAddress) return "Permanenrt Address is required.";
    if (!school_CollegeName) return "School / College name is required.";
    if (!board_UniversityName) return "Board / University name is required.";
    if (!class_DegreeName) return "Class / degree name is required.";
    if (!yearOfStudy) return "year of study name is required.";

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return "Password must be atleast 8 characters with numbers and special characters.";
    }

    return null;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    } else {
      setError("");
    }

    try {
      const response = await axios.post(
        "FRONTEND_SERVER_API/api/user/register",
        formData
      );
      // console.log(response.data);
      alert("User Register SuccessFully");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        phoneNumber: "",
        dateOfBirth: "",
        permanentAddress: "",
        school_CollegeName: "",
        board_UniversityName: "",
        class_DegreeName: "",
        yearOfStudy: "",
      });

      navigate("/signin");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Response Error:", error.response.data, error);

        if (error.response.data.errors) {
          setError(error.response.data.errors);
        } else {
          setError([error.response.data.message]);
        }
      }
    }
  };

  return (
    <div className="flex min-h-full mt-5 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-primary">
          Create Your Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <form onSubmit={handleFormSubmit}>
          {nextPage ? (
            <>
              <div className="space-y-12">
                <button
                  className="border-2 rounded-full p-1.5 hover:bg-gray-800 hover:text-white"
                  onClick={(prev) => setNextpage(!prev)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M14.75 8a.75.75 0 0 1-.75.75H3.81l2.72 2.72a.75.75 0 1 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 1.06L3.81 7.25H14a.75.75 0 0 1 .75.75"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="permanentAddress"
                        className="block text-md font-medium text-primary"
                      >
                        Permanent Address{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="permanentAddress"
                          id="permanentAddress"
                          value={formData.permanentAddress}
                          onChange={handleInputChange}
                          placeholder="Jhone"
                          className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="school_CollegeName"
                        className="block text-md font-medium text-primary"
                      >
                        School / College Name{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="school_CollegeName"
                          id="school_CollegeName"
                          value={formData.school_CollegeName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="board_UniversityName"
                        className="block text-md font-medium text-primary"
                      >
                        Board / Univercity Name
                        <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          id="board_UniversityName"
                          name="board_UniversityName"
                          type="board_UniversityName"
                          value={formData.board_UniversityName}
                          onChange={handleInputChange}
                          className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="class_DegreeName"
                        className="block text-md font-medium text-primary"
                      >
                        Class / Degree Name{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="class_DegreeName"
                          name="class_DegreeName"
                          id="class_DegreeName"
                          value={formData.class_DegreeName}
                          onChange={handleInputChange}
                          placeholder=""
                          className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="yearOfStudy"
                        className="block text-md font-medium text-primary"
                      >
                        Year of Study <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="yearOfStudy"
                          name="yearOfStudy"
                          value={formData.yearOfStudy}
                          onChange={handleInputChange}
                          className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        >
                          <option value=""></option>
                          <option value="School">School</option>
                          <option value="1 Year">1 st Year</option>
                          <option value="2 Year">2 st Year</option>
                          <option value="3 Year">3 st Year</option>
                          <option value="4 Year">4 st Year</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {error && <p className="text-red-600 text-start mb-4">{error}</p>}
              <div className="mt-5">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-secondary px-3 py-2.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#4080e1fd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>

              <p className="mt-7 text-center text-md text-gray-600">
                Already have an account ?
                <a
                  href="/signin"
                  className="font-semibold text-orange-600 hover:underline hover:decoration-solid"
                >
                  Login Account
                </a>
              </p>
            </>
          ) : (
            <>
              <div className="space-y-12">
                <div className="pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="firstName"
                        className="block text-md font-medium text-primary"
                      >
                        First name <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Jhone"
                          className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="lastName"
                        className="block text-md font-medium text-primary"
                      >
                        Last name <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-md font-medium text-primary"
                      >
                        Email <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Jhone@gmail.com"
                          className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="password"
                        className="block text-md font-medium text-primary"
                      >
                        Password <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="*********"
                          className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="gender"
                        className="block text-md font-medium text-primary"
                      >
                        Gender <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-md font-medium text-primary"
                      >
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder=""
                          className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="dateOfBirth"
                        className="block text-md font-medium text-primary"
                      >
                        Date of Birth <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="dateOfBirth"
                          id="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          placeholder=""
                          className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {error && <p className="text-red-600 text-start mb-4">{error}</p>}

              <div className="mt-5">
                <button
                  type="submit"
                  onClick={setNextpage}
                  className="flex justify-center rounded-md bg-secondary px-5 py-2.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#4080e1fd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save & Next
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;

{
  /* <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleFormSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-primary"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="name"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                 
                  placeholder="Jhone Doe"
                  required
                  //   className="block w-full rounded-md bg-white px-3 py-2.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-md"

                  className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor=="email"
                className="block text-md font-medium text-primary"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  placeholder="Jhone123@gmail.com"
                  required
                  className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor=="password"
                  className="block text-md font-medium text-primary"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  placeholder="Password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                />
              </div>
              <p className="text-red-600 text-xs">{error}</p>
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-secondary px-3 py-2.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#4080e1fd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form> */
}

{
  /* <div className="col-span-full">
                    <label
                      htmlFor="permanentAddress"
                      className="block text-md font-medium text-primary"
                    >
                      Permanent address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="permanentAddress"
                        id="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleInputChange}
                        className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-md font-medium text-primary"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-md font-medium text-primary"
                    >
                      State
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="state"
                        id="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pincode"
                      className="block text-md font-medium text-primary"
                    >
                      Pincode
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="pincode"
                        id="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                      />
                    </div>
                  </div> */
}

// for school or college

// <div className="sm:col-span-6">
//                         <p>Please Select Are you a School or College Student</p>
//                         <div className="flex items-center">
//                           <button
//                             onClick={(prev) => SetIsCollegeStudent(!prev)}
//                             className="bg-gray-300 px-5 py-2 rounded-l-md"
//                           >
//                             School
//                           </button>
//                           <button
//                             onClick={SetIsCollegeStudent}
//                             className="bg-gray-500 px-5 py-2 rounded-r-md"
//                           >
//                             College
//                           </button>
//                         </div>

//                         {isCollegeStudent ? (
//                           <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                             {" "}
//                             <div className="sm:col-span-3">
//                               <label
//                                 htmlFor="lastName"
//                                 className="block text-md font-medium text-primary"
//                               >
//                                 College Name
//                                 <span className="text-red-600">*</span>
//                               </label>
//                               <div className="mt-2">
//                                 <input
//                                   type="text"
//                                   name="lastName"
//                                   id="lastName"
//                                   value={formData.lastName}
//                                   onChange={handleInputChange}
//                                   placeholder="Doe"
//                                   className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
//                                 />
//                               </div>
//                             </div>
//                             <div className="sm:col-span-3">
//                               <label
//                                 htmlFor="email"
//                                 className="block text-md font-medium text-primary"
//                               >
//                                 Univercity Name
//                                 <span className="text-red-600">*</span>
//                               </label>
//                               <div className="mt-2">
//                                 <input
//                                   id="email"
//                                   name="email"
//                                   type="email"
//                                   value={formData.email}
//                                   onChange={handleInputChange}
//                                   placeholder="Jhone@gmail.com"
//                                   className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
//                                 />
//                               </div>
//                             </div>
//                             <div className="sm:col-span-3">
//                               <label
//                                 htmlFor="password"
//                                 className="block text-md font-medium text-primary"
//                               >
//                                 Course Name{" "}
//                                 <span className="text-red-600">*</span>
//                               </label>
//                               <div className="mt-2">
//                                 <input
//                                   type="password"
//                                   name="password"
//                                   id="password"
//                                   value={formData.password}
//                                   onChange={handleInputChange}
//                                   placeholder="*********"
//                                   className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
//                                 />
//                               </div>
//                             </div>
//                             <div className="sm:col-span-3">
//                               <label
//                                 htmlFor="gender"
//                                 className="block text-md font-medium text-primary"
//                               >
//                                 Year Of Study{" "}
//                                 <span className="text-red-600">*</span>
//                               </label>
//                               <div className="mt-2 grid grid-cols-1">
//                                 <select
//                                   id="gender"
//                                   name="gender"
//                                   value={formData.gender}
//                                   onChange={handleInputChange}
//                                   className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
//                                 >
//                                   <option value="">Select Gender</option>
//                                   <option value="Male">Male</option>
//                                   <option value="Female">Female</option>
//                                 </select>
//                               </div>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                             {" "}
//                             <div className="sm:col-span-3">
//                               <label
//                                 htmlFor="lastName"
//                                 className="block text-md font-medium text-primary"
//                               >
//                                 School Name{" "}
//                                 <span className="text-red-600">*</span>
//                               </label>
//                               <div className="mt-2">
//                                 <input
//                                   type="text"
//                                   name="lastName"
//                                   id="lastName"
//                                   value={formData.lastName}
//                                   onChange={handleInputChange}
//                                   placeholder="Doe"
//                                   className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
//                                 />
//                               </div>
//                             </div>
//                             <div className="sm:col-span-3">
//                               <label
//                                 htmlFor="email"
//                                 className="block text-md font-medium text-primary"
//                               >
//                                 Board Name
//                                 <span className="text-red-600">*</span>
//                               </label>
//                               <div className="mt-2">
//                                 <input
//                                   id="email"
//                                   name="email"
//                                   type="email"
//                                   value={formData.email}
//                                   onChange={handleInputChange}
//                                   placeholder="Jhone@gmail.com"
//                                   className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
//                                 />
//                               </div>
//                             </div>
//                             <div className="sm:col-span-3">
//                               <label
//                                 htmlFor="password"
//                                 className="block text-md font-medium text-primary"
//                               >
//                                 Class <span className="text-red-600">*</span>
//                               </label>
//                               <div className="mt-2">
//                                 <input
//                                   type="password"
//                                   name="password"
//                                   id="password"
//                                   value={formData.password}
//                                   onChange={handleInputChange}
//                                   placeholder="*********"
//                                   className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
//                                 />
//                               </div>
//                             </div>
//                             <div className="sm:col-span-3">
//                               <label
//                                 htmlFor="gender"
//                                 className="block text-md font-medium text-primary"
//                               >
//                                 Year Of Study{" "}
//                                 <span className="text-red-600">*</span>
//                               </label>
//                               <div className="mt-2 grid grid-cols-1">
//                                 <select
//                                   id="gender"
//                                   name="gender"
//                                   value={formData.gender}
//                                   onChange={handleInputChange}
//                                   className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
//                                 >
//                                   <option value="">Select Gender</option>
//                                   <option value="Male">Male</option>
//                                   <option value="Female">Female</option>
//                                 </select>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>

// signup page

{
  /* <div className="space-y-12">
              <div className="pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="firstName"
                      className="block text-md font-medium text-primary"
                    >
                      First name <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Jhone"
                        className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="lastName"
                      className="block text-md font-medium text-primary"
                    >
                      Last name <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-md font-medium text-primary"
                    >
                      Email <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Jhone@gmail.com"
                        className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block text-md font-medium text-primary"
                    >
                      Password <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="*********"
                        className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="gender"
                      className="block text-md font-medium text-primary"
                    >
                      Gender <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-md font-medium text-primary"
                    >
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder=""
                        className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-md font-medium text-primary"
                    >
                      Date of Birth <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        placeholder=""
                        className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-primary outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

             {error && <p className="text-red-600 text-start mb-4">{error}</p>}

            <div className="mt-5">
              <button
                type="submit"
                onClick={setNextpage}
                className="flex justify-center rounded-md bg-secondary px-3 py-2.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#4080e1fd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save & Next
              </button>
            </div> */
}
