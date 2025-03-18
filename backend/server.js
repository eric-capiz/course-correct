const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth/auth");
const tutorRoutes = require("./routes/tutorAvailability/tutorAvailability");
const bookingRoutes = require("./routes/tutorBooking/tutorBooking");
const studyGroupRoutes = require("./routes/studyGroup/studyGroup");
const userRoutes = require("./routes/user/users");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://course-correct-red.vercel.app",
      "https://course-correct-git-main-eric-capizs-projects.vercel.app",
      "https://course-correct-iqgzt2vbq-eric-capizs-projects.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Course Correct API is up and running!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/studyGroups", studyGroupRoutes);
app.use("/api/users", userRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
