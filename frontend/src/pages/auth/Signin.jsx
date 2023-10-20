import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../../images/auth/signin.png";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import AuthService from "../../services/auth.service";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return alert("Email and password are required");
      }
      const response = await AuthService.login(email, password);
      if (response) {
        if (response.User.User_role === 1) {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/solusi";
        }
      } else {
        return alert("Email or Password invalid");
      }
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        return alert("Login failed: Email and password are invalid");
      } else {
        console.error("Login error:", error.message);
        setError("Email or Password invalid");
        return alert("Login failed: " + error.message);
      }
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="w-[550px]">
        <img src={Login} alt="" />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <label className="mr-1 font-medium">Sign in with</label>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Or
          </p>
        </div>
        <form onSubmit={handleLogin} className="font-semibold">
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-500 rounded-md"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-500 rounded-md mt-4"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="text-red-600 mt-2">{error}</div>
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
            <Link
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              href="#"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white uppercase rounded-md text-base tracking-wider"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don't have an account?{" "}
          <Link
            className="text-red-600 hover:underline hover:underline-offset-4"
            to="/signup"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default connect(null, { login })(Signin);
