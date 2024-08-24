import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, provider, signInWithPopup, signOut } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Close the dropdown and navbar when navigating to another page
    setIsDropdownOpen(false);
    setIsNavbarOpen(false);
  }, [location]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  // Helper function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  const handleNavItemClick = () => {
    setIsDropdownOpen(false);
    setIsNavbarOpen(false);
  };

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-6xl text-blue-600 font-semibold whitespace-nowrap dark:text-white">
            <TbTruckDelivery />
          </span>
        </Link>
        <div className="flex items-center md:order-2 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <>
              <div className="relative">
                <button
                  type="button"
                  className="flex text-sm rounded-full md:me-0"
                  id="user-menu-button"
                  aria-expanded={isDropdownOpen}
                  onClick={toggleDropdown}
                  ref={profileButtonRef}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full mx-2"
                    src={
                      user.photoURL ||
                      "/docs/images/people/profile-picture-3.jpg"
                    }
                    alt="user photo"
                  />
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
                    id="user-dropdown"
                    style={{ top: "120%", left: "-370%" }} // Adjust these values as needed
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {user.displayName || "User"}
                      </span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.email}
                      </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center p-2 text-gray-500 hover:text-blue-500"
            >
              <FaUserCircle className="w-8 h-8" />
              <span className="ml-2">Sign in with Google</span>
            </button>
          )}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isNavbarOpen}
            onClick={toggleNavbar}
          >
            <span className="sr-only">Open main menu</span>
            <FaBars />
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isNavbarOpen ? "block" : "hidden"
          }`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                  isActive("/") ? "text-blue-600 md:bg-white bg-slate-100" : "text-gray-900"
                } hover:bg-gray-100 md:hover:bg-transparent dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white`}
                aria-current={isActive("/") ? "page" : undefined}
                onClick={handleNavItemClick}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/cars"
                className={`block py-2 px-3 rounded ${
                  isActive("/cars") ? "text-blue-600 md:bg-white bg-slate-100" : "text-gray-900"
                } hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white`}
                onClick={handleNavItemClick}
              >
                Cars
              </Link>
            </li>
            <li>
              <Link
                to="/buses"
                className={`block py-2 px-3 rounded ${
                  isActive("/buses") ? "text-blue-600 md:bg-white bg-slate-100" : "text-gray-900"
                } hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white`}
                onClick={handleNavItemClick}
              >
                Buses
              </Link>
            </li>
            <li>
              <Link
                to="/vans"
                className={`block py-2 px-3 rounded ${
                  isActive("/vans") ? "text-blue-600 md:bg-white bg-slate-100" : "text-gray-900"
                } hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white`}
                onClick={handleNavItemClick}
              >
                Vans
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`block py-2 px-3 rounded ${
                  isActive("/contact") ? "text-blue-600 md:bg-white bg-slate-100" : "text-gray-900"
                } hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white`}
                onClick={handleNavItemClick}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
