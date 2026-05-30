import { Routes, Route } from "react-router-dom";

// Public Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student
import StudentDashboard from "./pages/student/StudentDashboard";
import CourseDetails from "./pages/student/CourseDetails";
import CourseEnrollment from "./pages/student/CourseEnrollment";
import MyCourses from "./pages/student/MyCourses";
import CoursePlayer from "./pages/student/CoursePlayer";
import Certificate from "./pages/student/Certificate";
import MyCertificates from "./pages/student/MyCertificates";
import StudentSettings from "./pages/student/StudentSettings";

// Instructor
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import CreateCourse from "./pages/instructor/CreateCourse";
import ManageCourses from "./pages/instructor/ManageCourses";
import InstructorStudents from "./pages/instructor/InstructorStudents";


// Protected Route
import ProtectedRoute from "./components/protected/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Student Dashboard */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      {/* Course Details */}
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute allowedRole="student">
              <CourseDetails />
            </ProtectedRoute>
          }
        />
      {/* Course Enrollment */}
      <Route
        path="/course-enrollment/:id"
        element={
          <ProtectedRoute allowedRole="student">
            <CourseEnrollment />
          </ProtectedRoute>
        }
      />

      {/* My Courses */}
      <Route
        path="/my-courses"
        element={
          <ProtectedRoute allowedRole="student">
            <MyCourses />
          </ProtectedRoute>
        }
      />

      {/* Course Player */}
      <Route
        path="/course-player/:id"
        element={
          <ProtectedRoute
            allowedRole="student"
          >
            <CoursePlayer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/certificate/:id"
        element={
          <ProtectedRoute allowedRole="student">
            <Certificate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-certificates"
        element={
          <ProtectedRoute allowedRole="student">
            <MyCertificates />
          </ProtectedRoute>
        }
      />

      <Route
        path="/course-player/:id/:enrollmentId"
        element={<CoursePlayer />}
      />

      <Route
        path="/student/settings"
        element={<StudentSettings />}
      />

      {/* Instructor Dashboard */}
      <Route
        path="/instructor/dashboard"
        element={
          <ProtectedRoute allowedRole="instructor">
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Create Course */}
      <Route
        path="/create-course"
        element={
          <ProtectedRoute allowedRole="instructor">
            <CreateCourse />
          </ProtectedRoute>
        }
      />

      {/* Manage Courses */}
      <Route
        path="/manage-courses"
        element={
          <ProtectedRoute
            allowedRole="instructor"
          >
            <ManageCourses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/instructor/students"
        element={
          <ProtectedRoute allowedRole="instructor">
            <InstructorStudents />
          </ProtectedRoute>
        }
      />
     
      

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
            404 - Page Not Found
          </div>
        }
      />
    </Routes>
  );
}

export default App;