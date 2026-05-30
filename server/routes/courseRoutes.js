const express =
  require("express");

const router =
  express.Router();

const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require(
  "../controllers/courseController"
);

// Create Course
router.post(
  "/",
  createCourse
);

// Get All Courses
router.get(
  "/",
  getCourses
);

// Get Single Course
router.get(
  "/:id",
  getCourseById
);

// Update Course
router.put(
  "/:id",
  updateCourse
);

// Delete Course
router.delete(
  "/:id",
  deleteCourse
);

module.exports =
  router;