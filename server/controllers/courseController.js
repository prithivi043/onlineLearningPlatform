const Course =
  require("../models/Course");

const convertToEmbedUrl =
  (url) => {
    if (
      url.includes(
        "youtube.com/watch?v="
      )
    ) {
      const videoId =
        url
          .split("v=")[1]
          .split("&")[0];

      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (
      url.includes(
        "youtu.be/"
      )
    ) {
      const videoId =
        url.split(
          "youtu.be/"
        )[1];

      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  };

// Create Course

exports.createCourse =
  async (req, res) => {
    try {
      const courseData =
        req.body;

      if (
        courseData.videos
      ) {
        courseData.videos =
          courseData.videos.map(
            (
              video
            ) => ({
              ...video,
              videoUrl:
                convertToEmbedUrl(
                  video.videoUrl
                ),
            })
          );
      }

      const course =
        await Course.create(
          courseData
        );

      res.status(201).json(
        course
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Get All Courses

exports.getCourses =
  async (req, res) => {
    try {
      const courses =
        await Course.find().sort(
          {
            createdAt: -1,
          }
        );

      res.json(courses);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Get Single Course

exports.getCourseById =
  async (req, res) => {
    try {
      const course =
        await Course.findById(
          req.params.id
        );

      if (!course) {
        return res
          .status(404)
          .json({
            message:
              "Course not found",
          });
      }

      res.json(course);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Update Course

exports.updateCourse =
  async (req, res) => {
    try {
      const courseData =
        req.body;

      if (
        courseData.videos
      ) {
        courseData.videos =
          courseData.videos.map(
            (
              video
            ) => ({
              ...video,
              videoUrl:
                convertToEmbedUrl(
                  video.videoUrl
                ),
            })
          );
      }

      const course =
        await Course.findByIdAndUpdate(
          req.params.id,
          courseData,
          {
            new: true,
          }
        );

      res.json(course);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Delete Course

exports.deleteCourse =
  async (req, res) => {
    try {
      await Course.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Course deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };