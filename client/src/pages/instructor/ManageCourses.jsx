import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaBookOpen,
} from "react-icons/fa";

import {
  getCourses,
  deleteCourse,
} from "../../services/courseService";

const ManageCourses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

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

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this course?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteCourse(id);

        fetchCourses();
      } catch (error) {
        console.log(error);
      }
    };

  const filteredCourses =
    courses.filter(
      (course) =>
        course.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        course.category
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}

      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                navigate(
                  "/instructor/dashboard"
                )
              }
              className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
            >
              <FaArrowLeft className="mx-auto" />
            </button>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Manage Courses
              </h1>

              <p className="text-slate-500">
                View, update and delete courses
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              navigate(
                "/create-course"
              )
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
          >
            <FaPlus />
            Create Course
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-slate-500">
              Total Courses
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {courses.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-slate-500">
              Published Courses
            </p>

            <h2 className="text-4xl font-bold mt-3 text-green-600">
              {courses.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-slate-500">
              Categories
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {
                new Set(
                  courses.map(
                    (course) =>
                      course.category
                  )
                ).size
              }
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-slate-500">
              Course Library
            </p>

            <h2 className="text-4xl font-bold mt-3 text-blue-600">
              <FaBookOpen />
            </h2>
          </div>
        </div>

        {/* Search */}

        <div className="bg-white rounded-3xl p-4 shadow-sm mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search courses..."
              value={
                searchTerm
              }
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Courses */}

        {filteredCourses.length >
        0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCourses.map(
              (course) => (
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
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900">
                      {
                        course.title
                      }
                    </h3>

                    <p className="text-slate-500 mt-2">
                      {
                        course.category
                      }
                    </p>

                    <div className="mt-4">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                        {
                          course.level
                        }
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 mt-4">
                      Instructor:
                      {" "}
                      {
                        course.instructor
                      }
                    </p>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() =>
                          navigate(
                            `/create-course?id=${course._id}`
                          )
                        }
                        className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-600 py-3 rounded-xl flex items-center justify-center gap-2"
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            course._id
                          )
                        }
                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 py-3 rounded-xl flex items-center justify-center gap-2"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-700">
              No Courses Found
            </h2>

            <p className="text-slate-500 mt-3">
              Create your first course
              and start teaching.
            </p>

            <button
              onClick={() =>
                navigate(
                  "/create-course"
                )
              }
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Create Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCourses;