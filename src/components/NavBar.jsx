import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";
import { AuthContext } from "../provider/AuthProvider";

AOS.init();

const Navbar = () => {
  const { user, logOut, setUser } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully");
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error.message);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-orange-500 font-semibold ${
              isActive ? "text-orange-500" : ""
            }`
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `hover:text-orange-500 font-semibold ${
              isActive ? "text-orange-500" : ""
            }`
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          All Movies
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/add-movie"
              className={({ isActive }) =>
                `hover:text-orange-500 font-semibold ${
                  isActive ? "text-orange-500" : ""
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Add Movie
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                `hover:text-orange-500 font-semibold ${
                  isActive ? "text-orange-500" : ""
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              My Favorites
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `hover:text-orange-500 font-semibold ${
              isActive ? "text-orange-500" : ""
            }`
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          About
        </NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                `hover:text-orange-500 font-semibold ${
                  isActive ? "text-orange-500" : ""
                } md:hidden`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auth/register"
              className={({ isActive }) =>
                `hover:text-orange-500 font-semibold ${
                  isActive ? "text-orange-500" : ""
                } md:hidden`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav
      className="bg-white px-5 py-3 animate__animated animate__fadeInDown fixed top-0 z-50 w-full "
      data-aos="fade-down"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            className="text-3xl text-orange-600 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Logo / Website Name */}
        <Link to="/" className="text-2xl font-bold text-orange-600 italic">
          <span className="hidden md:inline-block">🎬</span> Watchly
        </Link>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50 transition-all duration-300 ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="menu p-4 space-y-3">{navLinks}</ul>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <ul className="menu menu-horizontal gap-5 px-1">{navLinks}</ul>
        </div>

        {/* Desktop User Section */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User profile"
                  src={
                    user.photoURL || "https://i.ibb.co/2tRrRfq/default-user.png"
                  }
                  className="object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#F8F6F0] rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/updateProfile">Update</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogOut}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="menu menu-horizontal px-1 hidden lg:flex">
            <li>
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  `hover:text-orange-500 font-semibold ${
                    isActive ? "text-orange-500" : ""
                  }`
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/auth/register"
                className={({ isActive }) =>
                  `hover:text-orange-500 font-semibold ${
                    isActive ? "text-orange-500" : ""
                  }`
                }
              >
                Register
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
