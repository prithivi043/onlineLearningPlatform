import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaGraduationCap,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 20
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const navLinks = [
    {
      name: "Features",
      href: "#features",
    },
    {
      name: "Instructors",
      href: "#instructors",
    },
    {
      name: "Reviews",
      href: "#testimonials",
    },
  ];

  return (
    <nav
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50
        transition-all
        duration-300
        ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-slate-200"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <FaGraduationCap />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                LearnWMe
              </h1>

              <p className="text-xs text-slate-500">
                Learning Platform
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="
                  relative
                  text-slate-700
                  font-medium
                  transition-all
                  duration-300
                  hover:text-blue-600
                  after:absolute
                  after:left-0
                  after:-bottom-1
                  after:w-0
                  after:h-[2px]
                  after:bg-blue-600
                  after:transition-all
                  after:duration-300
                  hover:after:w-full
                "
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/login"
              className="
                px-5
                py-2.5
                font-medium
                rounded-xl
                text-slate-700
                hover:bg-slate-100
                transition-all
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                shadow-lg
                hover:shadow-blue-300
                hover:scale-105
                transition-all
                duration-300
              "
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="
              lg:hidden
              w-12
              h-12
              rounded-xl
              bg-white
              shadow-md
              flex
              items-center
              justify-center
              text-xl
            "
          >
            {menuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              lg:hidden
              bg-white
              border-t
              border-slate-200
              shadow-xl
            "
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="
                    text-slate-700
                    font-medium
                    hover:text-blue-600
                  "
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  {link.name}
                </a>
              ))}

              <Link
                to="/login"
                className="
                  py-3
                  text-center
                  border
                  rounded-xl
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  py-3
                  text-center
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  text-white
                  font-semibold
                "
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;