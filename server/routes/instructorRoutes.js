const express =
  require("express");

const router =
  express.Router();

const {
  getInstructorStudents,
  getInstructorDashboard,
   getRecentCourses,
} = require(
  "../controllers/instructorController"
);

router.get(
  "/students/:instructorId",
  getInstructorStudents
);

router.get(
  "/dashboard/:instructorId",
  getInstructorDashboard
);

router.get(
  "/recent-courses",
  getRecentCourses
);

module.exports = router;