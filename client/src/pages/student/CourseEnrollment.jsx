import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  FaPhone,
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaBookOpen,
} from "react-icons/fa";

import {
  getCourseById,
} from "../../services/courseService";

import {
  enrollCourse,
} from "../../services/enrollmentService";

const CourseEnrollment = () => {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    ) || {};

  const [loading, setLoading] =
    useState(false);

  const [course, setCourse] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name:
        user.name || "",
      email:
        user.email || "",
      phone: "",
      organization: "",
    });

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

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await enrollCourse({
        userId: user._id || user.id,
        courseId: id,
        ...formData,
        });

        alert(
          "Course Enrollment Successful!"
        );

        navigate(
          "/my-courses"
        );
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Enrollment Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Course Card */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
          <img
            src={
              course.thumbnail
            }
            alt={
              course.title
            }
            className="w-full h-72 object-cover"
          />

          <div className="p-6">
            <h2 className="text-3xl font-bold">
              {course.title}
            </h2>

            <p className="mt-4 text-slate-600">
              {
                course.description
              }
            </p>

            <div className="flex gap-3 mt-6">
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

              <p className="text-slate-600">
                {
                  course.instructor
                }
              </p>
            </div>
          </div>
        </div>

        {/* Enrollment Form */}

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <FaBookOpen className="text-blue-600 text-3xl" />

            <h2 className="text-3xl font-bold">
              Course Enrollment
            </h2>
          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-6"
          >
            {/* Name */}

            <div>
              <label className="font-medium block mb-2">
                Full Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-4 text-slate-400" />

                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-xl py-3 pl-12 pr-4"
                    />
              </div>
            </div>

            {/* Email */}

            <div>
              <label className="font-medium block mb-2">
                Email
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-4 text-slate-400" />

                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-xl py-3 pl-12 pr-4"
                    />
              </div>
            </div>

            {/* Phone */}

            <div>
              <label className="font-medium block mb-2">
                Phone Number
              </label>

              <div className="relative">
                <FaPhone className="absolute left-4 top-4 text-slate-400" />

                <input
                  type="tel"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter phone number"
                  required
                  className="w-full border rounded-xl py-3 pl-12 pr-4"
                />
              </div>
            </div>

            {/* Organization */}

            <div>
              <label className="font-medium block mb-2">
                College / Organization
              </label>

              <div className="relative">
                <FaBuilding className="absolute left-4 top-4 text-slate-400" />

                <input
                  type="text"
                  name="organization"
                  value={
                    formData.organization
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter organization"
                  required
                  className="w-full border rounded-xl py-3 pl-12 pr-4"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:scale-[1.02] transition-all duration-300"
            >
              {loading
                ? "Processing..."
                : "Confirm Enrollment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollment;