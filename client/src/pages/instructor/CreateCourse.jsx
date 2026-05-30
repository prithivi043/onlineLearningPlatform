import { useState,  useEffect, } from "react";
import { useNavigate, useSearchParams, } from "react-router-dom";

import {
  FaArrowLeft,
  FaBookOpen,
  FaImage,
  FaLayerGroup,
  FaTag,
  FaUserTie,
} from "react-icons/fa";

import {  createCourse,
  getCourseById,
  updateCourse, } from "../../services/courseService";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [videos, setVideos] =
    useState([
        {
        title: "",
        videoUrl: "",
        duration: "",
        },
    ]);

    const addLesson = () => {
    setVideos([
        ...videos,
        {
        title: "",
        videoUrl: "",
        duration: "",
        },
    ]);
    };

    const handleVideoChange = (
    index,
    field,
    value
    ) => {
    const updatedVideos =
        [...videos];

    updatedVideos[index][field] =
        value;

    setVideos(updatedVideos);
    };

  const [searchParams] =
  useSearchParams();

  const courseId =
  searchParams.get("id");

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      thumbnail: "",
      level: "",
      category: "",
      instructor:
        user.name || "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

        const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const courseData = {
            ...formData,

            videos: videos.map(
                (video) => ({
                title: video.title,
                videoUrl:
                    video.videoUrl,
                duration:
                    video.duration,
                })
            ),
            };

            if (courseId) {
            await updateCourse(
                courseId,
                courseData
            );

            alert(
                "Course Updated Successfully"
            );
            } else {
            await createCourse(
                courseData
            );

            alert(
                "Course Created Successfully"
            );
            }

            navigate(
            "/manage-courses"
            );
        } catch (error) {
            console.log(error);

            alert(
            courseId
                ? "Failed to update course"
                : "Failed to create course"
            );
        } finally {
            setLoading(false);
        }
        };   

        useEffect(() => {
        if (courseId) {
            fetchCourse();
        }
        }, [courseId]);

        const fetchCourse = async () => {
        try {
            const course =
            await getCourseById(
                courseId
            );

            setFormData({
            title:
                course?.title || "",
            description:
                course?.description ||
                "",
            thumbnail:
                course?.thumbnail ||
                "",
            level:
                course?.level || "",
            category:
                course?.category ||
                "",
            instructor:
                course?.instructor ||
                "",
            });

            setVideos(
            course?.videos?.length
                ? course.videos
                : [
                    {
                    title: "",
                    videoUrl: "",
                    duration: "",
                    },
                ]
            );
        } catch (error) {
            console.log(error);
        }
        };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                navigate(
                  "/instructor/dashboard"
                )
              }
              className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center"
            >
              <FaArrowLeft />
            </button>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {courseId
                    ? "Update Course"
                    : "Create Course"}
                </h1>

              <p className="text-slate-500">
                {courseId
                    ? "Update course information"
                    : "Add a new course for students"}
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}

      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-sm p-8">
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-6"
          >
            {/* Course Title */}

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Course Title
              </label>

              <div className="relative">
                <FaBookOpen className="absolute left-4 top-4 text-slate-400" />

                <input
                  type="text"
                  name="title"
                  value={
                    formData.title
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="React Complete Guide"
                  required
                  className="w-full border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Description */}

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Course Description
              </label>

              <textarea
                name="description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                rows="5"
                required
                placeholder="Write a detailed description about the course..."
                className="w-full border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Thumbnail */}

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Thumbnail URL
              </label>

              <div className="relative">
                <FaImage className="absolute left-4 top-4 text-slate-400" />

                <input
                  type="text"
                  name="thumbnail"
                  value={
                    formData.thumbnail
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://example.com/course-image.jpg"
                  required
                  className="w-full border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Level & Category */}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Level
                </label>

                <div className="relative">
                  <FaLayerGroup className="absolute left-4 top-4 text-slate-400" />

                  <select
                    name="level"
                    value={
                      formData.level
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="w-full border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">
                      Select Level
                    </option>

                    <option value="Beginner">
                      Beginner
                    </option>

                    <option value="Intermediate">
                      Intermediate
                    </option>

                    <option value="Advanced">
                      Advanced
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Category
                </label>

                <div className="relative">
                  <FaTag className="absolute left-4 top-4 text-slate-400" />

                  <input
                    type="text"
                    name="category"
                    value={
                      formData.category
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Web Development"
                    required
                    className="w-full border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Instructor */}

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Instructor
              </label>

              <div className="relative">
                <FaUserTie className="absolute left-4 top-4 text-slate-400" />

                <input
                  type="text"
                  name="instructor"
                  value={
                    formData.instructor
                  }
                  readOnly
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 pl-12 pr-4"
                />
              </div>
            </div>

            {/* Preview */}

            {formData.thumbnail && (
              <div>
                <label className="block mb-3 font-semibold text-slate-700">
                  Thumbnail Preview
                </label>

                <img
                  src={
                    formData.thumbnail
                  }
                  alt="Preview"
                  className="w-full max-h-80 object-cover rounded-2xl border"
                />
              </div>
            )}

            <div className="border-t pt-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                    Course Lessons
                    </h2>

                    <button
                    type="button"
                    onClick={addLesson}
                    className="bg-green-600 text-white px-5 py-3 rounded-xl"
                    >
                    + Add Lesson
                    </button>
                </div>

                {videos.map(
                    (
                    video,
                    index
                    ) => (
                    <div
                        key={index}
                        className="border rounded-2xl p-5 mb-5 bg-slate-50"
                    >
                        <h3 className="font-semibold mb-4">
                        Lesson {index + 1}
                        </h3>

                        <div className="grid gap-4">
                        <input
                            type="text"
                            placeholder="Lesson Title"
                            value={video.title}
                            onChange={(e) =>
                            handleVideoChange(
                                index,
                                "title",
                                e.target.value
                            )
                            }
                            className="border rounded-xl p-3"
                        />

                        <input
                            type="text"
                            placeholder="YouTube URL"
                            value={
                            video.videoUrl
                            }
                            onChange={(e) =>
                            handleVideoChange(
                                index,
                                "videoUrl",
                                e.target.value
                            )
                            }
                            className="border rounded-xl p-3"
                        />

                        <input
                            type="text"
                            placeholder="Duration (Ex: 15 min)"
                            value={
                            video.duration
                            }
                            onChange={(e) =>
                            handleVideoChange(
                                index,
                                "duration",
                                e.target.value
                            )
                            }
                            className="border rounded-xl p-3"
                        />
                        </div>
                    </div>
                    )
                )}
                </div>

            {/* Buttons */}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() =>
                  navigate(
                            courseId
                                ? "/manage-courses"
                                : "/instructor/dashboard"
                            )
                }
                className="px-6 py-3 border border-slate-300 rounded-xl font-medium"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
              >
                {
                loading
                    ? courseId
                    ? "Updating..."
                    : "Creating..."
                    : courseId
                    ? "Update Course"
                    : "Create Course"
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;