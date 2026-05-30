const express =
  require("express");

const router =
  express.Router();

const {
  enrollCourse,
  getMyCourses,
  getEnrollmentById,
  updateProgress,
  unEnrollCourse,
} = require(
  "../controllers/enrollmentController"
);

// Enroll Course

router.post(
  "/",
  enrollCourse
);

// My Courses

router.get(
  "/my-courses/:userId",
  getMyCourses
);

// Single Enrollment

router.get(
  "/:id",
  getEnrollmentById
);

// Update Progress

router.put(
  "/:id",
  updateProgress
);

// Unenroll Course

router.delete(
  "/:id",
  unEnrollCourse
);

router.put(
  "/progress",
  updateProgress
);

module.exports =
  router;