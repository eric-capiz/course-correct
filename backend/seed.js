const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user/User");
const TutorBooking = require("./models/tutorBooking/TutorBooking");
const StudyGroup = require("./models/studyGroup/StudyGroup");
const Availability = require("./models/tutor/Tutor");

require("dotenv").config();

// Seed data
const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully!");

    // Drop all collections before seeding
    await mongoose.connection.db.dropDatabase();
    console.log("Dropped existing database collections!");

    // Create 3 tutors
    const tutors = [
      {
        name: "John Doe",
        username: "johndoe",
        email: "johndoe@example.com",
        password: "demo",
        role: "tutor",
        subjects: ["Math", "Physics"],
        gradeLevel: "junior",
      },
      {
        name: "Jane Smith",
        username: "janesmith",
        email: "janesmith@example.com",
        password: "demo",
        role: "tutor",
        subjects: ["Biology", "Chemistry"],
        gradeLevel: "senior",
      },
      {
        name: "Emily Johnson",
        username: "emilyjohnson",
        email: "emilyjohnson@example.com",
        password: "demo",
        role: "tutor",
        subjects: ["History", "English"],
        gradeLevel: "sophomore",
      },
    ];

    // Create 3 students with different grade levels
    const students = [
      {
        name: "Alex Lee",
        username: "alexlee",
        email: "alexlee@example.com",
        password: "demo",
        role: "student",
        subjects: ["Math", "Biology"],
        gradeLevel: "freshman",
      },
      {
        name: "Mia Zhang",
        username: "miazhang",
        email: "miazhang@example.com",
        password: "demo",
        role: "student",
        subjects: ["Physics", "History"],
        gradeLevel: "junior",
      },
      {
        name: "Lucas Patel",
        username: "lucaspatel",
        email: "lucaspatel@example.com",
        password: "demo",
        role: "student",
        subjects: ["Chemistry", "English"],
        gradeLevel: "senior",
      },
    ];

    // Hash passwords and create tutor and student users
    const createUser = async (userData) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const user = new User({
        ...userData,
        password: hashedPassword,
      });

      await user.save();
      return user;
    };

    // Create tutors and students
    const createdTutors = await Promise.all(tutors.map(createUser));
    const createdStudents = await Promise.all(students.map(createUser));

    // Create 2 study groups
    const studyGroup1 = new StudyGroup({
      title: "Math Study Group",
      subject: "Math",
      date: new Date("2025-03-10T10:00:00Z"),
      time: "10:00 AM",
      duration: 60,
      creator: createdStudents[0]._id,
      participants: createdStudents
        .filter(
          (student) =>
            student._id.toString() !== createdStudents[0]._id.toString()
        ) // Exclude creator
        .map((student) => student._id), // Map other students as participants
    });

    const studyGroup2 = new StudyGroup({
      title: "Physics Study Group",
      subject: "Physics",
      date: new Date("2025-03-12T14:00:00Z"),
      time: "2:00 PM",
      duration: 90,
      creator: createdStudents[1]._id,
      participants: createdStudents
        .filter(
          (student) =>
            student._id.toString() !== createdStudents[1]._id.toString()
        ) // Exclude creator
        .map((student) => student._id), // Map other students as participants
    });

    // Save study groups
    await studyGroup1.save();
    await studyGroup2.save();

    // Update users' joinedStudyGroups
    const updateUserStudyGroups = async (userIds, studyGroup) => {
      await Promise.all(
        userIds.map(async (userId) => {
          await User.findByIdAndUpdate(userId, {
            $addToSet: { joinedStudyGroups: studyGroup._id }, // Add study group ID to the joinedStudyGroups array
          });
        })
      );
    };

    // Include the creator and participants in the joinedStudyGroups
    await updateUserStudyGroups(
      [
        createdStudents[0]._id,
        ...createdStudents.slice(1).map((student) => student._id),
      ],
      studyGroup1
    );

    await updateUserStudyGroups(
      [
        createdStudents[1]._id,
        ...createdStudents
          .filter(
            (student) =>
              student._id.toString() !== createdStudents[1]._id.toString()
          )
          .map((student) => student._id),
      ],
      studyGroup2
    );

    console.log(
      "Study groups and users updated with study group participation!"
    );

    // Create availability slots for tutors
    const availabilityData = [
      {
        tutor: createdTutors[0]._id,
        day: "Monday",
        subject: "Math",
        startTime: "2025-03-01T09:00:00Z",
        endTime: "2025-03-01T10:00:00Z",
      },
      {
        tutor: createdTutors[1]._id,
        day: "Tuesday",
        subject: "Biology",
        startTime: "2025-03-02T11:00:00Z",
        endTime: "2025-03-02T12:00:00Z",
      },
      {
        tutor: createdTutors[2]._id,
        day: "Wednesday",
        subject: "History",
        startTime: "2025-03-03T08:00:00Z",
        endTime: "2025-03-03T09:00:00Z",
      },
    ];

    // Create availability entries
    const createAvailability = async (availabilityData) => {
      const newAvailability = new Availability(availabilityData);
      await newAvailability.save();
    };

    // Save availability
    await Promise.all(availabilityData.map(createAvailability));

    console.log("Tutor availability added successfully!");

    // Seed completed
    console.log("Seed data inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
    mongoose.connection.close();
  }
};

// Run seed
seedData();
