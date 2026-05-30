import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import learningImage from "../assets/learning-hero.png";

import {
  FaBookOpen,
  FaCertificate,
  FaUsers,
  FaVideo,
  FaChalkboardTeacher,
  FaArrowRight,
} from "react-icons/fa";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const LandingPage = () => {
  const features = [
    {
      icon: <FaBookOpen />,
      title: "Interactive Courses",
      desc: "Structured learning paths designed by experts.",
    },
    {
      icon: <FaVideo />,
      title: "Live Classes",
      desc: "Real-time instructor-led sessions.",
    },
    {
      icon: <FaCertificate />,
      title: "Certificates",
      desc: "Earn verified certificates after completion.",
    },
    {
      icon: <FaUsers />,
      title: "Community",
      desc: "Collaborate with learners worldwide.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="bg-slate-50 overflow-hidden">
        {/* Hero */}
        <section className="relative pt-36 pb-24">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{
                  opacity: 0,
                  x: -50,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                  Modern Learning Platform
                </span>

                <h1 className="text-6xl font-bold text-slate-900 mt-6 leading-tight">
                  Learn Skills.
                  <br />

                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Get Certified.
                  </span>

                  <br />

                  Build Your Future.
                </h1>

                <p className="text-slate-600 text-lg mt-6">
                  Learn from industry experts,
                  attend live classes, complete
                  assessments and earn verified
                  certificates.
                </p>

                <div className="flex flex-wrap gap-4 mt-8">
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2 hover:bg-blue-700"
                  >
                    Get Started
                    <FaArrowRight />
                  </Link>

                  <Link
                    to="/login"
                    className="border border-slate-300 px-8 py-4 rounded-2xl"
                  >
                    Login
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-12">
                  <div>
                    <h3 className="text-4xl font-bold">
                      15K+
                    </h3>

                    <p className="text-slate-500">
                      Students
                    </p>
                  </div>

                  <div>
                    <h3 className="text-4xl font-bold">
                      500+
                    </h3>

                    <p className="text-slate-500">
                      Courses
                    </p>
                  </div>

                  <div>
                    <h3 className="text-4xl font-bold">
                      200+
                    </h3>

                    <p className="text-slate-500">
                      Instructors
                    </p>
                  </div>
                </div>
              </motion.div>

             <motion.div
  initial={{
    opacity: 0,
    x: 50,
  }}
  animate={{
    opacity: 1,
    x: 0,
  }}
  transition={{
    duration: 0.8,
  }}
  className="relative flex justify-center"
>
  {/* Floating Background */}
  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>

  <img
    src={learningImage}
    alt="Online Learning"
    className="
      w-full
      max-w-2xl
      drop-shadow-2xl
      hover:scale-105
      transition-all
      duration-500
      relative
      z-10
    "
  />

  {/* Floating Badge */}
  <div
    className="
      absolute
      top-10
      -left-4
      bg-white
      shadow-xl
      rounded-2xl
      px-5
      py-3
      animate-bounce
    "
  >
    <p className="font-bold text-blue-600">
      15K+ Students
    </p>
  </div>

  {/* Floating Badge */}
  <div
    className="
      absolute
      bottom-10
      -right-4
      bg-white
      shadow-xl
      rounded-2xl
      px-5
      py-3
    "
  >
    <p className="font-bold text-green-600">
      500+ Courses
    </p>
  </div>
            </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="py-24 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-bold text-center">
              Platform Features
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {features.map(
                (
                  feature,
                  index
                ) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -10,
                    }}
                    className="bg-white border rounded-3xl p-8 shadow-lg"
                  >
                    <div className="text-5xl text-blue-600 mb-5">
                      {feature.icon}
                    </div>

                    <h3 className="text-xl font-bold">
                      {feature.title}
                    </h3>

                    <p className="text-slate-500 mt-3">
                      {feature.desc}
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Instructors */}
        <section
          id="instructors"
          className="py-24"
        >
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-bold text-center">
              Expert Instructors
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="bg-white rounded-3xl p-8 text-center shadow-lg"
                  >
                    <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                      <FaChalkboardTeacher className="text-4xl text-blue-600" />
                    </div>

                    <h3 className="font-bold text-xl mt-5">
                      Senior Instructor
                    </h3>

                    <p className="text-slate-500 mt-2">
                      Web Development &
                      Software Engineering
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="py-24 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-bold text-center">
              Student Success Stories
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="bg-slate-50 rounded-3xl p-8"
                  >
                    <div className="text-yellow-400">
                      ★★★★★
                    </div>

                    <p className="mt-4 text-slate-600">
                      LearnHub helped me
                      improve my skills
                      and earn valuable
                      certifications.
                    </p>

                    <h4 className="font-bold mt-5">
                      Student
                    </h4>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-5xl font-bold">
              Start Learning Today
            </h2>

            <p className="mt-6 text-xl">
              Join thousands of learners
              building their future.
            </p>

            <Link
              to="/register"
              className="inline-block mt-10 bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold"
            >
              Create Free Account
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default LandingPage;