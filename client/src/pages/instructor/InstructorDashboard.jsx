import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import {
  FaHome,
  FaBookOpen,
  FaAward,
  FaUsers,
  FaClipboardList,
 FaBars ,
  FaCog, 
  FaSignOutAlt,
  FaPlus,

} from "react-icons/fa";

const InstructorDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
  totalCourses: 0,
  totalStudents: 0,
  totalEnrollments: 0,
  totalCertificates: 0,
});

useEffect(() => {
  fetchDashboardStats();
}, []);

const [recentCourses, setRecentCourses] =
  useState([]);

  useEffect(() => {
  fetchRecentCourses();
}, []);

const fetchRecentCourses =
  async () => {
    try {

      const res =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/instructor/recent-courses`
        );

      setRecentCourses(
        res.data
      );

    } catch (error) {
      console.log(error);
    }
  };

const fetchDashboardStats = async () => {
  try {
    const instructor = JSON.parse(
      localStorage.getItem("user")
    );

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/instructor/dashboard/${instructor._id}`
    );

    setStats(res.data);

  } catch (error) {
    console.log(error);
  }
};

  const [sidebarOpen, setSidebarOpen] =
  useState(false);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  

  return (
    <div className="min-h-screen bg-slate-50 flex">
   
      {/* Overlay */}
    {sidebarOpen && (
    <div
        onClick={() =>
        setSidebarOpen(false)
        }
        className="fixed inset-0 bg-black/40 z-40 lg:hidden"
    />
    )}

    {/* Sidebar */}
    <aside
        className={`
            fixed top-0 left-0 z-50
            h-screen w-72
            bg-white border-r border-slate-200
            flex flex-col
            overflow-y-auto
            transition-transform duration-300
            ${
            sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
        `}
        >

    {/* Logo */}
    <div className="p-8 border-b border-slate-200 flex items-center justify-between">

        <div>
        <h1 className="text-2xl font-bold text-slate-900">
            LearnWMe
        </h1>

        <p className="text-sm text-slate-500">
            Instructor Portal
        </p>
        </div>

        <button
        onClick={() =>
            setSidebarOpen(false)
        }
        className="lg:hidden text-slate-500"
        >
        ✕
        </button>

    </div>

    {/* Menu */}
    <div className="p-5 flex flex-col gap-2">

        <button className="flex items-center gap-4 bg-slate-900 text-white p-4 rounded-2xl font-medium">
        <FaHome />
        Dashboard
        </button>

        <button
        onClick={() =>
            navigate("/create-course")
        }
        className="flex items-center gap-4 p-4 rounded-2xl text-slate-600 hover:bg-slate-100 transition"
        >
        <FaBookOpen />
        Create Course
        </button>

        <button
        onClick={() =>
            navigate("/manage-courses")
        }
        className="flex items-center gap-4 p-4 rounded-2xl text-slate-600 hover:bg-slate-100 transition"
        >
        <FaBookOpen />
        Manage Courses
        </button>

        <button
        onClick={() =>
            navigate("/instructor/students")
        }
        className="flex items-center gap-4 p-4 rounded-2xl text-slate-600 hover:bg-slate-100 transition"
        >
        <FaUsers />
        Students
        </button>

        <button
        className="flex items-center gap-4 p-4 rounded-2xl text-slate-600 hover:bg-slate-100 transition"
        >
        <FaCog />
        Settings
        </button>

    </div>

    {/* User Profile */}
    <div className="mx-5 mt-auto mb-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">

        <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">
            {user?.name?.charAt(0)}
        </div>

        <div>

            <p className="font-medium text-slate-900">
            {user?.name}
            </p>

            <p className="text-xs text-slate-500">
            Instructor
            </p>

        </div>

        </div>

    </div>

    {/* Logout */}
    <div className="p-5">

        <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-3 bg-red-500 text-white py-4 rounded-2xl hover:bg-red-600 transition"
        >
        <FaSignOutAlt />
        Logout
        </button>

    </div>

    </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72">
        {/* Top Navbar */}
        <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-5">

        <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-4">

            {/* Mobile Only */}
            <button
                onClick={() =>
                setSidebarOpen(true)
                }
                className="lg:hidden w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center"
            >
                <FaBars />
            </button>

            </div>

        </div>

        </div>

        {/* Content */}
        <div className="p-8">
          {/* Welcome */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 mb-8">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">
                    {user?.name?.charAt(0)}
                </div>

                <div>

                    <p className="text-sm text-slate-500 uppercase tracking-wider">
                    Instructor Dashboard
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-1">
                    Welcome back, {user?.name}
                    </h1>

                    <p className="text-slate-500 mt-2">
                    Manage your courses, students and learning content.
                    </p>

                </div>

                </div>

                <button
                onClick={() =>
                    navigate("/create-course")
                }
                className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
                >
                + Create Course
                </button>

            </div>

         </div>

          {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                <div className="bg-white border border-slate-200 rounded-3xl p-6">

                    <div className="flex justify-between items-start">

                    <div>
                        <p className="text-sm text-slate-500">
                        Total Courses
                        </p>

                        <h2 className="text-4xl font-bold mt-3">
                        {stats.totalCourses}
                        </h2>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                        <FaBookOpen className="text-blue-600" />
                    </div>

                    </div>

                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6">

                    <div className="flex justify-between items-start">

                    <div>
                        <p className="text-sm text-slate-500">
                        Students
                        </p>

                        <h2 className="text-4xl font-bold mt-3">
                        {stats.totalStudents}
                        </h2>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
                        <FaUsers className="text-green-600" />
                    </div>

                    </div>

                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6">

                    <div className="flex justify-between items-start">

                    <div>
                        <p className="text-sm text-slate-500">
                        Enrollments
                        </p>

                        <h2 className="text-4xl font-bold mt-3">
                        {stats.totalEnrollments}
                        </h2>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                        <FaClipboardList className="text-orange-600" />
                    </div>

                    </div>

                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6">

                    <div className="flex justify-between items-start">

                    <div>
                        <p className="text-sm text-slate-500">
                        Certificates
                        </p>

                        <h2 className="text-4xl font-bold mt-3">
                        {stats.totalCertificates}
                        </h2>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
                        <FaAward className="text-purple-600" />
                    </div>

                    </div>

                </div>

            </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            <button
              onClick={() =>
                navigate("/create-course")
              }
              className="bg-blue-600 text-white p-6 rounded-3xl flex flex-col items-center gap-3 hover:bg-blue-700"
            >
              <FaPlus size={24} />
              Create Course
            </button>

          <button
            onClick={() =>
                navigate("/manage-courses")
            }
            className="bg-green-600 text-white p-6 rounded-3xl flex flex-col items-center gap-3 hover:bg-green-700 transition"
            >
            <FaClipboardList size={24} />
            Manage Courses
            </button>

          </div>

          {/* Recent Courses */}
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">

            <div>

                <h2 className="text-2xl font-bold">
                Recent Courses
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                Latest courses created on the platform
                </p>

            </div>

            <button
                onClick={() =>
                navigate("/manage-courses")
                }
                className="text-slate-900 font-medium hover:text-blue-600"
            >
                View All
            </button>

            </div>

            <div className="p-6">

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

                {recentCourses.map(
                (course) => (

                    <div
                    key={course._id}
                    className="border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition"
                    >

                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-40 w-full object-cover"
                    />

                    <div className="p-4">

                        <h3 className="font-semibold text-lg line-clamp-2">
                        {course.title}
                        </h3>

                        <p className="text-sm text-slate-500 mt-2">
                        {course.category}
                        </p>

                        <p className="text-sm text-slate-400 mt-1">
                        Instructor: {course.instructor}
                        </p>

                    </div>

                    </div>

                )
                )}

            </div>

            </div>

        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;