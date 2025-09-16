import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../components/ContextApi";

const ResetPassword = () => {
  const { setUser } = useContext(AppContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const { id, token } = useParams();
  // console.log(id, token);

  // const [formData, setFormData] = useState({
  //   email: "",
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData({ ...formData, [name]: value });
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("resetapi");
      const response = await axios.post(
        `/api/user/reset-password/${id}/${token}`,
        {
          password,
        }
      );
      console.log(response.data);
      navigate("/signin");
    } catch (error) {
      // console.log(error);
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
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 pt-32 lg:px-8">
        <h2 className="sm:mx-auto sm:w-full sm:max-w-sm mt-10 text-center text-2xl/9 font-bold tracking-tight text-primary">
          Reset Your Password
        </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleFormSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-primary"
              >
                New Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  // value={formData.password}
                  // onChange={handleInputChange}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="email"
                  placeholder="Jhone123@gmail.com"
                  required
                  className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                />
              </div>
            </div>

            {error && <p className="text-red-600 text-start mb-4">{error}</p>}

            <div className="mt-5">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-secondary px-3 py-2.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#4080e1fd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Password
              </button>
            </div>
          </form>

          {/* <p className="mt-8 text-center text-md text-gray-600">
            Don’t have an account?
            <Link
              to="/signup"
              className="font-semibold text-orange-600 hover:underline hover:decoration-solid"
            >
              Signup Now
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
