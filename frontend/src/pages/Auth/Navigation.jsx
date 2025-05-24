import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-10 left-[30rem] transform translate-x-1/2 translate-y-1/2 z-50 bg-[#0f0f0f] border border-gray-700 w-[30%] px-[4rem] mb-[2rem] rounded-lg shadow-xl backdrop-blur-sm">
      <section className="flex justify-between items-center">
        {/* Section 1 */}
        <div className="flex justify-center items-center mb-[2rem]">
          <Link
            to="/"
            className="flex items-center transition-all duration-300 hover:translate-x-2 hover:text-blue-400 text-gray-300"
          >
            <AiOutlineHome className="mr-2 mt-[3rem]" size={28} />
            <span className="hidden nav-item-name mt-[3rem] font-medium">Home</span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center transition-all duration-300 hover:translate-x-2 hover:text-blue-400 text-gray-300 ml-[1.5rem]"
          >
            <MdOutlineLocalMovies className="mr-2 mt-[3rem]" size={28} />
            <span className="hidden nav-item-name mt-[3rem] font-medium">MOVIES</span>
          </Link>
        </div>
        {/* Section 2 */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-gray-300 hover:text-blue-400 transition-colors duration-300 focus:outline-none flex items-center"
          >
            {userInfo ? (
              <span className="font-medium">{userInfo.username}</span>
            ) : (
              <></>
            )}

            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform duration-300 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>

          {dropdownOpen && userInfo && (
            <ul
              className={`absolute right-0 mt-2 mr-14 w-[10rem] space-y-1 bg-[#1a1a1a] text-gray-300 rounded-lg shadow-xl border border-gray-700 ${
                !userInfo.isAdmin ? "-top-20" : "-top-24"
              }`}
            >
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/movies/dashboard"
                      className="block px-4 py-2 hover:bg-gray-800 hover:text-blue-400 rounded-t-lg transition-colors duration-300"
                    >
                      Dashboard
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-300"
                >
                  Profile
                </Link>
              </li>

              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-800 hover:text-blue-400 rounded-b-lg transition-colors duration-300"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}

          {!userInfo && (
            <ul className="flex">
              <li>
                <Link
                  to="/login"
                  className="flex items-center mt-5 transition-all duration-300 hover:translate-x-2 hover:text-blue-400 text-gray-300 mb-[2rem]"
                >
                  <AiOutlineLogin className="mr-2 mt-[4px]" size={28} />
                  <span className="hidden nav-item-name font-medium">LOGIN</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="flex items-center mt-5 transition-all duration-300 hover:translate-x-2 hover:text-blue-400 text-gray-300 ml-[1.5rem]"
                >
                  <AiOutlineUserAdd size={28} />
                  <span className="hidden nav-item-name font-medium">REGISTER</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;
