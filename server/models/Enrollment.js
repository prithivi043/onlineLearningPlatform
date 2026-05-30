const mongoose = require("mongoose");

const enrollmentSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      courseId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },

      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      organization: {
        type: String,
        required: true,
      },

      progress: {
        type: Number,
        default: 0,
      },

      enrolledAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Enrollment",
    enrollmentSchema
  );