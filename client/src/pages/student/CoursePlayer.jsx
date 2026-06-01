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
  FaBars,
  FaTimes,
} from "react-icons/fa";

import {
  getCourseById,
} from "../../services/courseService";

import {
  updateProgress,
} from "../../services/enrollmentService";

const CoursePlayer = () => {
  const { id, enrollmentId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const data = await getCourseById(id);
      setCourse(data);
      if (data.videos && data.videos.length > 0) {
        setSelectedVideo(data.videos[0]);
        setCurrentIndex(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markCompleted = async () => {
    try {
      if (!course?.videos?.length) return;

      const nextIndex = currentIndex + 1;
      const percentage = Math.round(
        (nextIndex / course.videos.length) * 100
      );

      setProgress(percentage);
      await updateProgress(enrollmentId, percentage);

      if (nextIndex < course.videos.length) {
        setCurrentIndex(nextIndex);
        setSelectedVideo(course.videos[nextIndex]);
      } else {
        setCourseCompleted(true);
      }
    } catch (error) {
      console.log("Progress Update Error:", error);
    }
  };

  const nextLesson = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < course.videos.length) {
      setCurrentIndex(nextIndex);
      setSelectedVideo(course.videos[nextIndex]);
    }
  };

  const selectLesson = (video, index) => {
    setSelectedVideo(video);
    setCurrentIndex(index);
    setSidebarOpen(false); // close sidebar on mobile after selecting
  };

  const submitCourse = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await updateProgress(enrollmentId, 100);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/certificates`,
        {
          userId: user.id || user._id,
          courseId: course._id,
        }
      );

      const certificateId =
        response.data?.certificate?._id || response.data?._id;

      if (!certificateId) {
        alert("Certificate ID not found");
        return;
      }

      alert("🎉 Congratulations! Course Completed Successfully.");
      navigate(`/certificate/${certificateId}`);
    } catch (error) {
      console.log(error);
      alert("Failed to generate certificate");
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
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate("/my-courses")}
              className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
            >
              <FaArrowLeft />
            </button>

            <div className="min-w-0">
              <h1 className="text-base sm:text-2xl font-bold truncate">
                {course.title}
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm truncate">
                {course.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <p className="text-xs text-slate-500">Progress</p>
              <h3 className="text-lg sm:text-2xl font-bold text-blue-600">
                {progress}%
              </h3>
            </div>

            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center relative"
              aria-label="Toggle lessons"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {course.videos?.length || 0}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative lg:grid lg:grid-cols-4">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed top-0 right-0 h-full w-72 bg-white border-l shadow-xl z-30 overflow-y-auto p-5 transition-transform duration-300
            lg:static lg:translate-x-0 lg:h-auto lg:shadow-none lg:border-l-0 lg:border-r lg:min-h-screen
            ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex items-center justify-between mb-5 lg:block">
            <h2 className="text-xl font-bold">Course Lessons</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center"
            >
              <FaTimes size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {course.videos?.map((video, index) => (
              <button
                key={index}
                onClick={() => selectLesson(video, index)}
                className={`w-full text-left p-4 rounded-2xl transition ${
                  currentIndex === index
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaPlayCircle className="shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs opacity-80 mt-1 flex items-center gap-1">
                      <FaClock />
                      {video.duration}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 p-3 sm:p-6">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <iframe
              src={selectedVideo?.videoUrl}
              title={selectedVideo?.title}
              className="w-full h-[220px] sm:h-[380px] lg:h-[520px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-3xl font-bold">
                {selectedVideo?.title}
              </h2>

              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                {course.description}
              </p>

              {/* Progress */}
              <div className="mt-6 sm:mt-8">
                <div className="flex justify-between mb-2 text-sm sm:text-base">
                  <span>Course Progress</span>
                  <span className="font-semibold">{progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 sm:h-4">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 sm:h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:justify-between">
                <button
                  onClick={markCompleted}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-3 text-sm sm:text-base"
                >
                  <FaCheckCircle />
                  Mark Lesson Complete
                </button>

                {progress === 100 ? (
                  <button
                    onClick={submitCourse}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm sm:text-base"
                  >
                    Submit Course
                  </button>
                ) : (
                  <button
                    onClick={nextLesson}
                    disabled={currentIndex === course.videos.length - 1}
                    className={`px-6 py-3 rounded-2xl text-white text-sm sm:text-base ${
                      currentIndex === course.videos.length - 1
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    Next Lesson →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
