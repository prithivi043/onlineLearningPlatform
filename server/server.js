require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const userRoutes =
  require("./routes/userRoutes");

const certificateRoutes =
  require(
    "./routes/certificateRoutes"
  );

const instructorRoutes =
  require("./routes/instructorRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://online-learning-platform-fmq5.vercel.app"
    ],
    credentials: true
  })
);
app.use(express.json());

// API Routes
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/courses",
  courseRoutes
);

app.use(
  "/api/enrollments",
  enrollmentRoutes
);

app.use(
  "/api/certificates",
  certificateRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/instructor",
  instructorRoutes
);

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "LMS Backend Running Successfully",
  });
});

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log(
      "MongoDB Connected Successfully"
    );

    app.listen(
      process.env.PORT || 5000,
      () => {
        console.log(
          `Server Running on Port ${
            process.env.PORT || 5000
          }`
        );
      }
    );
  })
  .catch((err) => {
    console.log(
      "MongoDB Connection Error:"
    );
    console.log(err);
  });