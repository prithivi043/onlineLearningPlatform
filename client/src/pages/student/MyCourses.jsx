import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaBookOpen,
  FaPlayCircle,
  FaClock,
  FaTrophy,
  FaArrowLeft,
} from "react-icons/fa";

import {
  getMyCourses,
} from "../../services/enrollmentService";

const MyCourses = () => {

const navigate = useNavigate();
  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    ) || {};

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses =
    async () => {
      try {
        const userId =
          user._id ||
          user.id;

        if (!userId) {
          console.error(
            "User ID not found"
          );
          return;
        }

        const data =
          await getMyCourses(
            userId
          );

        setCourses(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const completedCourses =
    courses.filter(
      (course) =>
        course.progress ===
        100
    ).length;

  const activeCourses =
    courses.filter(
      (course) =>
        course.progress < 100
    ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-xl font-semibold text-slate-600">
          Loading Courses...
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-slate-100">

    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="mb-8">

        <button
          onClick={() =>
            navigate("/student/dashboard")
          }
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
        >
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </button>

        <h1 className="text-3xl font-bold text-slate-900">
          My Courses
        </h1>

        <p className="text-slate-500 mt-2">
          Continue learning and track your course progress.
        </p>

      </div>

      {/* Dashboard Overview */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 mb-8 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* Student Info */}
            <div className="flex items-center gap-5">

            <img
                src={
                user?.profileImage
                    ? user.profileImage
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.name || "Student"
                    )}&background=0f172a&color=fff`
                }
                alt="Profile"
                className="w-20 h-20 rounded-2xl object-cover shadow-sm"
            />

            <div>

                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                Welcome Back
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {user?.name}
                </h2>

                <p className="text-slate-500 mt-2">
                Continue building your skills and complete your learning goals.
                </p>

            </div>

            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 min-w-fit">

            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-center">

                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-blue-100 flex items-center justify-center">
                <FaBookOpen className="text-blue-600" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                {courses.length}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                Courses
                </p>

            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-center">

                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-amber-100 flex items-center justify-center">
                <FaClock className="text-amber-600" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                {activeCourses}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                Active
                </p>

            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-center">

                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-green-100 flex items-center justify-center">
                <FaTrophy className="text-green-600" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                {completedCourses}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                Completed
                </p>

            </div>

            </div>

        </div>

        </div>

      {/* Empty State */}
      {courses.length === 0 ? (

        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">

          <FaBookOpen className="mx-auto text-5xl text-slate-400" />

          <h2 className="text-2xl font-semibold mt-5">
            No Courses Enrolled
          </h2>

          <p className="text-slate-500 mt-2">
            Enroll in a course to begin your learning journey.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {courses.map((enrollment) => (

            <div
              key={enrollment._id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition"
            >

              {/* Thumbnail */}
              <img
                src={enrollment.courseId.thumbnail}
                alt={enrollment.courseId.title}
                className="h-52 w-full object-cover"
              />

              {/* Content */}
              <div className="p-6">

                <div className="flex items-center justify-between mb-4">

                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                    {enrollment.courseId.category}
                  </span>

                  <span className="text-sm font-semibold text-slate-700">
                    {enrollment.progress}%
                  </span>

                </div>

                <h2 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2">
                  {enrollment.courseId.title}
                </h2>

                <p className="text-sm text-slate-500 mb-5">
                  Instructor: {enrollment.courseId.instructor}
                </p>

                {/* Progress */}
                <div className="mb-5">

                  <div className="flex justify-between text-sm mb-2">

                    <span className="text-slate-500">
                      Progress
                    </span>

                    <span className="font-medium">
                      {enrollment.progress}%
                    </span>

                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2">

                    <div
                      style={{
                        width: `${enrollment.progress}%`,
                      }}
                      className="bg-slate-900 h-2 rounded-full"
                    />

                  </div>

                </div>

                {/* Status + Button */}
                <div className="flex justify-between items-center">

                  {enrollment.progress === 100 ? (
                    <span className="text-green-600 text-sm font-medium">
                      Completed
                    </span>
                  ) : (
                    <span className="text-amber-600 text-sm font-medium">
                      In Progress
                    </span>
                  )}

                  <button
                    onClick={() =>
                      navigate(
                        `/course-player/${enrollment.courseId._id}/${enrollment._id}`
                      )
                    }
                    className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition"
                  >
                    <FaPlayCircle />
                    Continue
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>
);
};

export default MyCourses;