const mongoose =
  require("mongoose");

const certificateSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      courseId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "Course",
      },

      studentName: {
        type: String,
        required: true,
      },

      certificateNumber: {
        type: String,
        unique: true,
      },

      issuedDate: {
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
    "Certificate",
    certificateSchema
  );