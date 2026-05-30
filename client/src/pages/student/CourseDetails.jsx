import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  getCourseById,
} from "../../services/courseService";

import {
  enrollCourse,
} from "../../services/enrollmentService";

const CourseDetails = () => {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [course, setCourse] =
    useState(null);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    ) || {};

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse =
    async () => {
      try {
        const data =
          await getCourseById(
            id
          );

        setCourse(data);
      } catch (error) {
        console.log(error);
      }
    };

    const handleEnroll = () => {
    navigate(
        `/course-enrollment/${course._id}`
    );
    };
  if (!course)
    return (
      <div>
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden shadow">
        <img
          src={
            course.thumbnail
          }
          alt={
            course.title
          }
          className="w-full h-96 object-cover"
        />

        <div className="p-8">
          <h1 className="text-4xl font-bold">
            {course.title}
          </h1>

          <p className="mt-4 text-slate-600">
            {
              course.description
            }
          </p>

          <div className="mt-6 flex gap-4">
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
              {
                course.category
              }
            </span>

            <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full">
              {
                course.level
              }
            </span>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">
              Instructor
            </h3>

            <p>
              {
                course.instructor
              }
            </p>
          </div>

            <div className="mt-10 border-t pt-8">
                <h2 className="text-2xl font-bold mb-4">
                    Ready to Start Learning?
                </h2>

                <p className="text-slate-600 mb-6">
                    Register for this course and gain access
                    to videos, notes, quizzes, certificates,
                    and instructor support.
                </p>

                <button
                    onClick={() =>
                    navigate(
                        `/course-enrollment/${course._id}`
                    )
                    }
                    className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                    Register For Course
                </button>
                </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;