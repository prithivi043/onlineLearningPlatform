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

import { getCourses } from "../../services/courseService";
import { getMyCourses } from "../../services/enrollmentService";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCourse = enrollments.find((course) => course.progress < 100);
  const completedCourses = enrollments.filter((c) => c.progress === 100).length;
  const totalCertificates = certificates.length;
  const averageProgress =
    enrollments.length > 0
      ? Math.round(
          enrollments.reduce((total, e) => total + e.progress, 0) /
            enrollments.length
        )
      : 0;

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const userId = user._id || user.id;
      const [coursesData, enrollmentsData, certificatesData] =
        await Promise.all([
          getCourses(),
          getMyCourses(userId),
          axios.get(
            `${import.meta.env.VITE_API_URL}/certificates/user/${userId}`
          ),
        ]);
      setCourses(coursesData);
      setEnrollments(enrollmentsData);
      setCertificates(certificatesData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navTo = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 w-72 h-screen bg-white z-50 border-r border-slate-200
          flex flex-col
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-5 border-b shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LearnWme
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Learning Management System
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center"
            >
              <FaTimes size={14} />
            </button>
          </div>
        </div>

        {/* Profile */}
        <div className="p-4 shrink-0">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-lg font-bold shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-800 truncate">
                {user?.name || "Student"}
              </h3>
              <p className="text-xs text-slate-500">Student Account</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="px-4 flex-1 overflow-y-auto">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Main Menu
          </p>
          <div className="space-y-1">
            <button
              onClick={() => navTo("/student/dashboard")}
              className="w-full flex items-center gap-3 bg-blue-600 text-white p-3.5 rounded-2xl shadow-md shadow-blue-200"
            >
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <FaHome />
              </div>
              <span className="font-medium">Dashboard</span>
            </button>

            {[
              { label: "My Courses", icon: <FaBookOpen />, path: "/my-courses", bg: "bg-blue-100 text-blue-600" },
              { label: "Certificates", icon: <FaCertificate />, path: "/my-certificates", bg: "bg-yellow-100 text-yellow-500" },
              { label: "Settings", icon: <FaCog />, path: "/student/settings", bg: "bg-slate-100 text-slate-600" },
            ].map(({ label, icon, path, bg }) => (
              <button
                key={path}
                onClick={() => navTo(path)}
                className="w-full flex items-center gap-3 p-3.5 rounded-2xl text-slate-700 hover:bg-slate-100 transition"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                  {icon}
                </div>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3.5 rounded-2xl transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-72 min-w-0">
        {/* Top Navbar */}
        <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-slate-200">
          <div className="px-4 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-3">
              {/* Left */}
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center shrink-0"
                >
                  <FaBars size={18} />
                </button>
                <div className="min-w-0">
                  <h2 className="font-bold text-slate-800 text-base lg:text-xl truncate">
                    Welcome Back 👋
                  </h2>
                  <p className="text-xs text-slate-500 truncate">
                    {user?.name || "Student"}
                  </p>
                </div>
              </div>

              {/* Desktop Search */}
              <div className="hidden md:flex flex-1 max-w-xl mx-6">
                <div className="relative w-full">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search courses, instructors..."
                    className="w-full pl-12 pr-10 py-3 rounded-2xl bg-slate-100 border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden sm:block text-right">
                  <h4 className="font-semibold text-slate-800 text-sm">
                    {user?.name || "Student"}
                  </h4>
                  <p className="text-xs text-slate-500">Student Account</p>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-lg">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                </div>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden mt-3">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full pl-12 pr-10 py-2.5 rounded-2xl bg-slate-100 border-0 focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
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
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Hero + Stats */}
          <div className="grid lg:grid-cols-3 gap-5 lg:gap-8 mb-8 lg:mb-10">
            {/* Hero Card */}
            <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-5 sm:p-8 text-white shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <p className="text-blue-100 text-sm sm:text-lg">
                  Welcome Back 👋
                </p>
                <h1 className="text-2xl sm:text-4xl font-bold mt-1">
                  {user.name || "Student"}
                </h1>
                <p className="text-blue-100 mt-2 text-sm sm:text-base">
                  Keep learning and unlock new achievements.
                </p>

                {activeCourse ? (
                  <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:items-center">
                    <img
                      src={activeCourse.courseId?.thumbnail}
                      alt={activeCourse.courseId?.title}
                      className="w-full sm:w-32 h-40 sm:h-32 rounded-2xl object-cover border-4 border-white/20"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="inline-flex bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm mb-2">
                        Continue Learning
                      </div>
                      <h2 className="text-lg sm:text-2xl font-bold leading-snug">
                        {activeCourse.courseId?.title}
                      </h2>
                      <p className="text-blue-100 mt-1 text-sm">
                        Instructor: {activeCourse.courseId?.instructor}
                      </p>
                      <div className="mt-4">
                        <div className="flex justify-between text-xs sm:text-sm mb-1">
                          <span>Progress</span>
                          <span>{activeCourse.progress}%</span>
                        </div>
                        <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${activeCourse.progress}%` }}
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
                      className="bg-white text-blue-600 px-5 py-2.5 rounded-2xl font-semibold hover:scale-105 transition text-sm sm:text-base w-full sm:w-auto text-center"
                    >
                      Resume →
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 bg-white/10 rounded-2xl p-5 text-sm">
                    No active course available.
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {[
                {
                  label: "Enrolled Courses",
                  value: enrollments.length,
                  color: "text-blue-600",
                  bg: "bg-blue-100",
                  icon: <FaBookOpen className="text-blue-600 text-xl" />,
                },
                {
                  label: "Completed",
                  value: completedCourses,
                  color: "text-green-600",
                  bg: "bg-green-100",
                  icon: <FaCertificate className="text-green-600 text-xl" />,
                },
                {
                  label: "Certificates",
                  value: totalCertificates,
                  color: "text-yellow-500",
                  bg: "bg-yellow-100",
                  icon: <FaStar className="text-yellow-500 text-xl" />,
                },
                {
                  label: "Avg Progress",
                  value: `${averageProgress}%`,
                  color: "text-purple-600",
                  bg: "bg-purple-100",
                  icon: <FaVideo className="text-purple-600 text-xl" />,
                },
              ].map(({ label, value, color, bg, icon }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-slate-500 text-xs sm:text-sm">
                        {label}
                      </p>
                      <h2 className={`text-2xl sm:text-3xl font-bold mt-1 ${color}`}>
                        {value}
                      </h2>
                    </div>
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center ${bg}`}
                    >
                      {icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl sm:text-3xl font-bold">Available Courses</h2>
            <button className="text-blue-600 font-medium text-sm sm:text-base">
              View All
            </button>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-44 sm:h-52 w-full object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-bold text-lg sm:text-xl leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-slate-500 mt-2 line-clamp-2 text-sm">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-slate-500 text-sm">{course.level}</span>
                      <span className="flex items-center gap-1 text-yellow-500 text-sm">
                        <FaStar /> 4.8
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Instructor: {course.instructor}
                    </p>
                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="w-full mt-5 bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition text-sm font-medium"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-slate-500 text-sm">
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
