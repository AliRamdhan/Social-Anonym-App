import React, { useState } from "react";
import { Link } from "react-router-dom";
import Register from "../../images/auth/signup.png";
import GoogleButton from "react-google-button";
import { register } from "../../actions/auth";
import { connect } from "react-redux";
import AuthService from "../../services/auth.service";
const SignUp = ({ register }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.register(username, email, password);
      console.log(response.data);
      alert("Registration successful");
      window.location.href = "/signin";
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        setError(error.response.data.message);
      } else if (error.request) {
        console.error("Request Error:", error.request);
        setError("Request to the server failed");
      } else {
        console.error("Error:", error.message);
        setError("An error occurred");
      }
    }
  };
  return (
    <section
      className="h-screen flex flex-col md:flex-row justify-center md:space-y-0 md
    :space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0"
    >
      <div className="w-[650px]">
        <img src={Register} alt="login" />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <label className="mr-1 font-medium">Sign in with</label>
        <div className="w-full flex items-center text-center md:text-left mt-4">
          <GoogleButton type="dark" />
        </div>
        <div className="mt-3 mb-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-600 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-600">
          <p className="mx-4 mb-0 text-center font-bold text-slate-500">Or</p>
        </div>
        <form onSubmit={handleRegister} className="font-semibold">
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-500 rounded-md"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-500 rounded-md my-4"
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-500 rounded-md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="text-red-600 mt-2">{error}</div>
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1 cursor-pointer" type="checkbox" />
              <span>Remember Me</span>
            </label>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white uppercase rounded-md text-sm tracking-wider"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Have an account?
          <Link
            className="pl-1 text-red-600 hover:underline hover:underline-offset-4"
            to="/signin"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};
export default SignUp;
