const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["student", "tutor"],
      required: true,
    },
    subjects: [
      {
        type: String,
        required: true,
      },
    ],
    gradeLevel: {
      type: String,
      enum: ["freshman", "sophomore", "junior", "senior"],
      required: true,
    },
    tutoringAvailability: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Availability",
      },
    ],
    joinedStudyGroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudyGroup",
      },
    ],
  },
  { timestamps: true }
);

// Pre-save hook to ensure tutoringAvailability is only added for tutors
UserSchema.pre("save", function (next) {
  if (this.role === "student") {
    this.tutoringAvailability = undefined; // Remove tutoringAvailability if the user is a student
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
