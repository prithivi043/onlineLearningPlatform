import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaHome,
  FaBookOpen,
  FaVideo,
  FaCertificate,
  FaCog,
  FaSearch,
  FaSignOutAlt,
  FaStar,
   FaBars,
  FaTimes,
} from "react-icons/fa";

import {
  getCourses,
} from "../../services/courseService";


import {
  getMyCourses,
} from "../../services/enrollmentService";



const StudentDashboard = () => {
  const navigate = useNavigate();

  const [courses, setCourses] =
    useState([]);

 const [
  sidebarOpen,
  setSidebarOpen,
] = useState(false);

    const [
    enrollments,
    setEnrollments,
    ] = useState([]);

    const [
    certificates,
    setCertificates,
    ] = useState([]);

    const [searchTerm, setSearchTerm] =
  useState("");

  const filteredCourses =
  courses.filter((course) =>
    course.title
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      ) ||
    course.description
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      ) ||
    course.category
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      ) ||
    course.instructor
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  );

  const activeCourse =
  enrollments.find(
    (course) =>
      course.progress < 100
  );

const completedCourses =
  enrollments.filter(
    (course) =>
      course.progress === 100
  ).length;

const totalCertificates =
  certificates.length;

const averageProgress =
  enrollments.length > 0
    ? Math.round(
        enrollments.reduce(
          (total, enrollment) =>
            total +
            enrollment.progress,
          0
        ) /
          enrollments.length
      )
    : 0;

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    ) || {};

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses =
    async () => {
      try {
        const data =
          await getCourses();

        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    };

   useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard =
  async () => {
    try {
      const userId =
        user._id || user.id;

      const [
        coursesData,
        enrollmentsData,
        certificatesData,
      ] = await Promise.all([
        getCourses(),
        getMyCourses(userId),
        axios.get(
          `${import.meta.env.VITE_API_URL}/certificates/user/${userId}`
        ),
      ]);

      setCourses(coursesData);
      setEnrollments(
        enrollmentsData
      );
      setCertificates(
        certificatesData.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
            <>
        {/* Mobile Overlay */}
        {sidebarOpen && (
            <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() =>
                setSidebarOpen(false)
            }
            />
        )}

                    {/* Sidebar */}
            <aside
                className={`
                fixed
                top-0
                left-0
                w-80
                h-screen
                bg-white
                z-50
                border-r
                border-slate-200

                ${
                    sidebarOpen
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"
                }

                transition-transform
                duration-300
                `}
            >

            {/* Header */}
            <div className="p-6 border-b">

                <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    LearnHub
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                    Learning Management System
                    </p>

                </div>

                <button
                    onClick={() =>
                    setSidebarOpen(false)
                    }
                    className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center"
                >
                    <FaTimes />
                </button>

                </div>

            </div>

            {/* Student Profile */}
            <div className="p-5">

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-4 flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                    {user?.name
                    ? user.name
                        .charAt(0)
                        .toUpperCase()
                    : "S"}
                </div>

                <div>

                    <h3 className="font-bold text-slate-800">
                    {user?.name ||
                        "Student"}
                    </h3>

                    <p className="text-sm text-slate-500">
                    Student Account
                    </p>

                </div>

                </div>

            </div>

            {/* Menu */}
            <div className="px-5 flex-1">

                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-4">
                Main Menu
                </p>

                <div className="space-y-2">

                {/* Dashboard */}
                <button
                    onClick={() => {
                    navigate(
                        "/student/dashboard"
                    );
                    setSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-4 bg-blue-600 text-white p-4 rounded-2xl shadow-lg shadow-blue-200"
                >

                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <FaHome />
                    </div>

                    <span className="font-medium">
                    Dashboard
                    </span>

                </button>

                {/* Courses */}
                <button
                    onClick={() => {
                    navigate(
                        "/my-courses"
                    );
                    setSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl text-slate-700 hover:bg-slate-100 transition"
                >

                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <FaBookOpen />
                    </div>

                    <span>
                    My Courses
                    </span>

                </button>

                {/* Certificates */}
                <button
                    onClick={() => {
                    navigate(
                        "/my-certificates"
                    );
                    setSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl text-slate-700 hover:bg-slate-100 transition"
                >

                    <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-500 flex items-center justify-center">
                    <FaCertificate />
                    </div>

                    <span>
                    Certificates
                    </span>

                </button>

                {/* Settings */}
                <button
                onClick={() =>
                    navigate("/student/settings")
                }
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-slate-700 hover:bg-slate-100 transition"
                >
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                    <FaCog />
                </div>

                <span>
                    Settings
                </span>
                </button>

                </div>

            </div>

            {/* Footer */}
            <div className="p-5 border-t">

                <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl transition"
                >
                <FaSignOutAlt />
                Logout
                </button>

            </div>

            </aside>
        </>

      {/* Main */}
      <div className="lg:ml-80">
      {/* Top Navbar */}
        <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-slate-200">

        <div className="px-4 lg:px-8 py-4">

            <div className="flex items-center justify-between gap-4">

            {/* Left Side */}
            <div className="flex items-center gap-4">

                <button
                onClick={() =>
                    setSidebarOpen(true)
                }
                className="lg:hidden w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"
                >
                <FaBars size={18} />
                </button>

                <div>

                <h2 className="font-bold text-slate-800 text-lg lg:text-xl">
                    Welcome Back 👋
                </h2>

                <p className="text-xs lg:text-sm text-slate-500">
                    {user?.name || "Student"}
                </p>

                </div>

            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">

                <div className="relative w-full">

                <FaSearch
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) =>
                    setSearchTerm(
                        e.target.value
                    )
                    }
                    placeholder="Search courses, instructors..."
                    className="
                    w-full
                    pl-14
                    pr-12
                    py-3.5
                    rounded-2xl
                    bg-slate-100
                    border-0
                    focus:ring-2
                    focus:ring-blue-500
                    focus:bg-white
                    transition-all
                    "
                />

                {searchTerm && (
                    <button
                    onClick={() =>
                        setSearchTerm("")
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
                    >
                    ✕
                    </button>
                )}

                </div>

            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3">

                <div className="hidden sm:block text-right">

                <h4 className="font-semibold text-slate-800">
                    {user?.name || "Student"}
                </h4>

                <p className="text-xs text-slate-500">
                    Student Account
                </p>

                </div>

                <div className="relative">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    {user?.name
                    ? user.name
                        .charAt(0)
                        .toUpperCase()
                    : "S"}
                </div>

                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>

                </div>

            </div>

            </div>

            {/* Mobile Search */}
            <div className="md:hidden mt-4">

            <div className="relative">

                <FaSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(
                    e.target.value
                    )
                }
                placeholder="Search courses..."
                className="
                    w-full
                    pl-12
                    pr-10
                    py-3
                    rounded-2xl
                    bg-slate-100
                    border-0
                    focus:ring-2
                    focus:ring-blue-500
                "
                />

                {searchTerm && (
                <button
                    onClick={() =>
                    setSearchTerm("")
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                    ✕
                </button>
                )}

            </div>

            </div>

        </div>

        </div>

        {/* Content */}
        <div className="p-8">
         {/* Welcome & Learning Overview */}

            <div className="grid lg:grid-cols-3 gap-8 mb-10">

                    {/* Hero Learning Card */}

                    <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl overflow-hidden relative">


                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                    <div className="relative z-10">

                    <p className="text-blue-100 text-lg">
                        Welcome Back 👋
                    </p>

                    <h1 className="text-4xl font-bold mt-2">
                        {user.name || "Student"}
                    </h1>

                    <p className="text-blue-100 mt-3">
                        Keep learning and unlock new achievements.
                    </p>

                    {activeCourse ? (
                        <div className="mt-8 flex flex-col md:flex-row gap-6 items-center">

                        <img
                            src={
                            activeCourse.courseId?.thumbnail
                            }
                            alt={
                            activeCourse.courseId?.title
                            }
                            className="w-40 h-40 rounded-3xl object-cover border-4 border-white/20"
                        />

                        <div className="flex-1">

                            <div className="inline-flex bg-white/20 px-4 py-1 rounded-full text-sm mb-3">
                            Continue Learning
                            </div>

                            <h2 className="text-2xl font-bold">
                            {
                                activeCourse.courseId?.title
                            }
                            </h2>

                            <p className="text-blue-100 mt-2">
                            Instructor:
                            {" "}
                            {
                                activeCourse.courseId?.instructor
                            }
                            </p>

                            <div className="mt-5">

                            <div className="flex justify-between text-sm mb-2">
                                <span>Progress</span>
                                <span>
                                {
                                    activeCourse.progress
                                }%
                                </span>
                            </div>

                            <div className="h-3 bg-white/20 rounded-full overflow-hidden">

                                <div
                                className="h-full bg-white rounded-full transition-all duration-500"
                                style={{
                                    width: `${activeCourse.progress}%`,
                                }}
                                />

                            </div>

                            </div>

                        </div>

                        <button
                            onClick={() =>
                            navigate(
                                `/course-player/${activeCourse.courseId._id}/${activeCourse._id}`
                            )
                            }
                            className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
                        >
                            Resume →
                        </button>

                        </div>
                    ) : (
                        <div className="mt-8 bg-white/10 rounded-2xl p-6">
                        No active course available.
                        </div>
                    )}

                    </div>


                    </div>

                    {/* Stats */}

                    <div className="grid gap-5">


                    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

                    <div className="flex justify-between items-center">

                        <div>
                        <p className="text-slate-500">
                            Enrolled Courses
                        </p>

                        <h2 className="text-4xl font-bold text-blue-600 mt-2">
                            {enrollments.length}
                        </h2>
                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                        <FaBookOpen className="text-blue-600 text-2xl" />
                        </div>

                    </div>

                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

                    <div className="flex justify-between items-center">

                        <div>
                        <p className="text-slate-500">
                            Completed
                        </p>

                        <h2 className="text-4xl font-bold text-green-600 mt-2">
                            {completedCourses}
                        </h2>
                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                        <FaCertificate className="text-green-600 text-2xl" />
                        </div>

                    </div>

                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

                    <div className="flex justify-between items-center">

                        <div>
                        <p className="text-slate-500">
                            Certificates
                        </p>

                        <h2 className="text-4xl font-bold text-yellow-500 mt-2">
                            {totalCertificates}
                        </h2>
                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
                        <FaStar className="text-yellow-500 text-2xl" />
                        </div>

                    </div>

                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

                    <div className="flex justify-between items-center">

                        <div>
                        <p className="text-slate-500">
                            Progress
                        </p>

                        <h2 className="text-4xl font-bold text-purple-600 mt-2">
                            {averageProgress}%
                        </h2>
                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
                        <FaVideo className="text-purple-600 text-2xl" />
                        </div>

                    </div>

                    </div>


                    </div>

            </div>


          {/* Courses */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              Available Courses
            </h2>

            <button className="text-blue-600 font-medium">
              View All
            </button>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCourses.length >
            0 ? (
              filteredCourses.map(
                (
                  course
                ) => (
                  <div
                    key={
                      course._id
                    }
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={
                        course.thumbnail
                      }
                      alt={
                        course.title
                      }
                      className="h-52 w-full object-cover"
                    />

                    <div className="p-6">
                      <h3 className="font-bold text-xl">
                        {
                          course.title
                        }
                      </h3>

                      <p className="text-slate-500 mt-2 line-clamp-2">
                        {
                          course.description
                        }
                      </p>

                      <div className="flex justify-between items-center mt-4">
                        <span className="text-slate-500">
                          {
                            course.level
                          }
                        </span>

                        <span className="flex items-center gap-1 text-yellow-500">
                          <FaStar />
                          4.8
                        </span>
                      </div>

                      <p className="text-sm text-slate-500 mt-3">
                        Instructor:
                        {" "}
                        {
                          course.instructor
                        }
                      </p>

                      <button
                        onClick={() =>
                            navigate(`/course/${course._id}`)
                        }
                        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                        >
                        Enroll Now
                    </button>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="col-span-full text-center py-10">
                {searchTerm
                    ? `No courses found for "${searchTerm}"`
                    : "No courses available yet."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;