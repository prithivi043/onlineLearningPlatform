const Enrollment = require(
  "../models/Enrollment"
);

const Course = require(
  "../models/Course"
);

// Enroll Student

exports.enrollCourse =
  async (req, res) => {
    try {
      console.log(
        "Enrollment Request:",
        req.body
      );

      const {
        userId,
        courseId,
        name,
        email,
        phone,
        organization,
      } = req.body;

      const alreadyEnrolled =
        await Enrollment.findOne({
          userId,
          courseId,
        });

      if (alreadyEnrolled) {
        return res.status(400).json({
          success: false,
          message:
            "Already enrolled in this course",
        });
      }

      const enrollment =
        await Enrollment.create({
          userId,
          courseId,
          name,
          email,
          phone,
          organization,
        });

      res.status(201).json({
        success: true,
        message:
          "Course enrolled successfully",
        enrollment,
      });
    } catch (error) {
      console.log(
        "Enrollment Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Get Student Courses

exports.getMyCourses =
  async (req, res) => {
    try {
      const enrollments =
        await Enrollment.find({
          userId:
            req.params.userId,
        })
          .populate(
            "courseId"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        enrollments
      );
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Get Single Enrollment

exports.getEnrollmentById =
  async (req, res) => {
    try {
      const enrollment =
        await Enrollment.findById(
          req.params.id
        )
          .populate(
            "courseId"
          )
          .populate(
            "userId"
          );

      if (!enrollment) {
        return res
          .status(404)
          .json({
            message:
              "Enrollment not found",
          });
      }

      res.json(
        enrollment
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Update Progress

exports.updateProgress =
  async (req, res) => {
    try {
      const {
        progress,
      } = req.body;

      const enrollment =
        await Enrollment.findByIdAndUpdate(
          req.params.id,
          {
            progress,
          },
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        enrollment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Unenroll

exports.unEnrollCourse =
  async (req, res) => {
    try {
      await Enrollment.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Course removed successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


exports.updateProgress =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const { progress } =
        req.body;

      const enrollment =
        await Enrollment.findByIdAndUpdate(
          id,
          { progress },
          { new: true }
        );

      if (!enrollment) {
        return res
          .status(404)
          .json({
            message:
              "Enrollment not found",
          });
      }

      res.status(200).json(
        enrollment
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to update progress",
      });
    }
  };