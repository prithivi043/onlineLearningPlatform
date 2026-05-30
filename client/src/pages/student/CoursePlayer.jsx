import {
  useEffect,
  useState,
} from "react";

import axios from "axios";



import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  FaPlayCircle,
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import {
  getCourseById,
} from "../../services/courseService";

import {
  updateProgress,
} from "../../services/enrollmentService";

const CoursePlayer = () => {
  const {
  id,
  enrollmentId,
} = useParams();

  const navigate =
    useNavigate();

  const [course, setCourse] =
    useState(null);

  const [
    selectedVideo,
    setSelectedVideo,
  ] = useState(null);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [progress, setProgress] =
    useState(0);

  const [
    courseCompleted,
    setCourseCompleted,
  ] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse =
    async () => {
      try {
        const data =
          await getCourseById(id);

        setCourse(data);

        if (
          data.videos &&
          data.videos.length > 0
        ) {
          setSelectedVideo(
            data.videos[0]
          );

          setCurrentIndex(0);
        }
      } catch (error) {
        console.log(error);
      }
    };

 const markCompleted =
  async () => {
    try {
      if (
        !course?.videos?.length
      )
        return;

      const nextIndex =
        currentIndex + 1;

      const percentage =
        Math.round(
          (nextIndex /
            course.videos.length) *
            100
        );

      setProgress(
        percentage
      );

      await updateProgress(
        enrollmentId,
        percentage
      );

      if (
        nextIndex <
        course.videos.length
      ) {
        setCurrentIndex(
          nextIndex
        );

        setSelectedVideo(
          course.videos[
            nextIndex
          ]
        );
      } else {
        setCourseCompleted(
          true
        );
      }
    } catch (error) {
      console.log(
        "Progress Update Error:",
        error
      );
    }
  };

  const nextLesson =
    () => {
      const nextIndex =
        currentIndex + 1;

      if (
        nextIndex <
        course.videos.length
      ) {
        setCurrentIndex(
          nextIndex
        );

        setSelectedVideo(
          course.videos[
            nextIndex
          ]
        );
      }
    };



const submitCourse =
  async () => {
    try {
      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        );

      // Update progress to 100%
      await updateProgress(
        enrollmentId,
        100
      );

      const response =
        await axios.post(
          `${import.meta.env.VITE_API_URL}/certificates`,
          {
            userId:
              user.id ||
              user._id,
            courseId:
              course._id,
          }
        );

      console.log(
        "Certificate Response:",
        response.data
      );

      const certificateId =
        response.data
          ?.certificate?._id ||
        response.data?._id;

      if (
        !certificateId
      ) {
        alert(
          "Certificate ID not found"
        );
        return;
      }

      alert(
        "🎉 Congratulations! Course Completed Successfully."
      );

      navigate(
        `/certificate/${certificateId}`
      );
    } catch (error) {
      console.log(error);

      alert(
        "Failed to generate certificate"
      );
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Course...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                navigate(
                  "/my-courses"
                )
              }
              className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
            >
              <FaArrowLeft />
            </button>

            <div>
              <h1 className="text-2xl font-bold">
                {course.title}
              </h1>

              <p className="text-slate-500">
                {course.category}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">
              Progress
            </p>

            <h3 className="text-2xl font-bold text-blue-600">
              {progress}%
            </h3>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4">
        {/* Sidebar */}

        <div className="bg-white border-r min-h-screen p-5">
          <h2 className="text-xl font-bold mb-5">
            Course Lessons
          </h2>

          <div className="space-y-3">
            {course.videos?.map(
              (
                video,
                index
              ) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedVideo(
                      video
                    );

                    setCurrentIndex(
                      index
                    );
                  }}
                  className={`w-full text-left p-4 rounded-2xl transition ${
                    currentIndex ===
                    index
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FaPlayCircle />

                    <div>
                      <h3 className="font-medium">
                        {
                          video.title
                        }
                      </h3>

                      <p className="text-xs opacity-80 mt-1 flex items-center gap-2">
                        <FaClock />

                        {
                          video.duration
                        }
                      </p>
                    </div>
                  </div>
                </button>
              )
            )}
          </div>
        </div>

        {/* Main Content */}

        <div className="lg:col-span-3 p-6">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <iframe
              src={
                selectedVideo?.videoUrl
              }
              title={
                selectedVideo?.title
              }
              className="w-full h-[600px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            <div className="p-6">
              <h2 className="text-3xl font-bold">
                {
                  selectedVideo?.title
                }
              </h2>

              <p className="text-slate-500 mt-2">
                {
                  course.description
                }
              </p>

              {/* Progress */}

              <div className="mt-8">
                <div className="flex justify-between mb-2">
                  <span>
                    Course Progress
                  </span>

                  <span className="font-semibold">
                    {progress}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-4 rounded-full transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
                <div className="mt-8 flex justify-between">
                <button
                    onClick={
                    markCompleted
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl flex items-center gap-3"
                >
                    <FaCheckCircle />
                    Mark Lesson Complete
                </button>

                {progress === 100 ? (
                    <button
                    onClick={
                        submitCourse
                    }
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-2xl font-semibold"
                    >
                    Submit Course
                    </button>
                ) : (
                    <button
                    onClick={
                        nextLesson
                    }
                    disabled={
                        currentIndex ===
                        course.videos.length - 1
                    }
                    className={`px-8 py-3 rounded-2xl text-white ${
                        currentIndex ===
                        course.videos.length - 1
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    >
                    Next Lesson →
                    </button>
                )}
                </div>

              {/* Certificate */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;