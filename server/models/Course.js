const mongoose = require("mongoose");

const videoSchema =
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      default: "10 min",
    },
  });

const courseSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      thumbnail: {
        type: String,
        required: true,
      },

      level: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      instructor: {
        type: String,
        required: true,
      },

      videos: [videoSchema],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Course",
    courseSchema
  );