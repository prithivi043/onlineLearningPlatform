const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const Certificate = require("../models/Certificate");

exports.getInstructorStudents =
  async (req, res) => {
    try {

      const enrollments =
        await Enrollment.find()
          .populate(
            "courseId",
            "title"
          )
          .sort({
            createdAt: -1,
          });

      const students =
        enrollments.map(
          (enrollment) => ({
            _id:
              enrollment._id,
            name:
              enrollment.name,
            email:
              enrollment.email,
            phone:
              enrollment.phone,
            organization:
              enrollment.organization,
            courseTitle:
              enrollment.courseId
                ?.title,
            progress:
              enrollment.progress,
            enrolledAt:
              enrollment.enrolledAt,
          })
        );

      res.status(200).json(
        students
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch students",
      });

    }
  };


  exports.getInstructorDashboard =
async (req, res) => {
  try {

    const totalCourses =
      await Course.countDocuments();

    const totalEnrollments =
      await Enrollment.countDocuments();

    const totalStudents =
      await Enrollment.distinct(
        "email"
      );

    const totalCertificates =
      await Certificate.countDocuments();

    res.json({
      totalCourses,
      totalStudents:
        totalStudents.length,
      totalEnrollments,
      totalCertificates,
    });

  } catch (error) {
    res.status(500).json({
      message:
        "Dashboard stats error",
    });
  }
};


exports.getRecentCourses =
async (req, res) => {
  try {

    const courses =
      await Course.find()
        .sort({ createdAt: -1 })
        .limit(5);

    res.json(courses);

  } catch (error) {

    res.status(500).json({
      message:
        "Failed to fetch courses",
    });

  }
};