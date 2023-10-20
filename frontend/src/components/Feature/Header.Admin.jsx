import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../services/admin.service";
import AuthService from "../../services/auth.service";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
const HeaderAdmin = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    AdminService.getAdminBoard().then((response) => {
      setUser(response.data.User);
    });
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <div
      className="w-full h-16 flex justify-between items-center font-bold py-4 px-2"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 12px 8px -8px, rgba(0, 0, 0, 0.3) 0px 3px 4px -3px",
      }}
    >
      <div className="w-full z-8 flex justify-center items-center">
        <div className="w-1/2 text-right text-3xl">
          <Link className="cursor-default" to="/">
            EDUCSOS Admin
          </Link>
        </div>
        <div className="w-1/2 flex justify-end items-center">
          <div className="w-4/6 flex justify-evenly items-center">
            <Link to="/admin/dashboard">
              Dashboard
            </Link>
            <Link to="/admin/artikel">
              Artikel
            </Link>
            <Link to="/admin/genre">
              Genre
            </Link>
          </div>
        </div>
        <div className="w-1/6">
          {user ? (
            <div className="w-full flex justify-center">
              <button
                className="font-medium rounded-lg text-sm w-32 h-10 py-1 text-center flex justify-center gap-2 items-center border-2"
                type="button"
                onClick={() => setDropdown(!dropdown)}
              >
                <div>{user.User_username}</div>
                <svg
                  className={`w-4 h-4 ml-2.5 transition-transform duration-300 ${
                    dropdown ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {dropdown && (
                <div className="absolute top-16 mt-2 right-12 right-2 divide-y divide-gray-500 rounded-lg shadow w-36 bg-white">
                  <ul
                    className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownInformationButton"
                  >
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Profile
                      </Link>
                    </li>
                  </ul>
                  <div className="py-2">
                    <button
                      type="button"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full flex justify-center relative">
              <Link to="/signin">
                <button
                  type="button"
                  className="py-1.5 px-10 text-base font-semibold text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
                >
                  Log In
                </button>
              </Link>
              <p className="absolute top-8 mt-1 text-xs text-gray-400">
                {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default connect(null, { logout })(HeaderAdmin);
