const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user/User");
const TutorBooking = require("./models/tutorBooking/TutorBooking");
const StudyGroup = require("./models/studyGroup/StudyGroup");
const Availability = require("./models/tutorAvailability/tutorAvailbility");

require("dotenv").config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully!");
    await mongoose.connection.db.dropDatabase();
    console.log("Dropped existing database collections!");

    // Tutor
    const tutorData = {
      name: "John Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      password: "demo",
      role: "tutor",
      subjects: ["Math", "Physics"],
      gradeLevel: "Uni-Freshman",
    };

    // Students
    const studentsData = [
      {
        name: "Alex Lee",
        username: "alexlee",
        email: "alexlee@example.com",
        password: "demo",
        role: "student",
        subjects: ["Math", "Physics"],
        gradeLevel: "H.S-Senior",
      },
      {
        name: "Mia Zhang",
        username: "miazhang",
        email: "miazhang@example.com",
        password: "demo",
        role: "student",
        subjects: ["Math", "Physics"],
        gradeLevel: "H.S-Senior",
      },
    ];

    // Hash passwords
    const hashPassword = async (userData) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      return { ...userData, password: hashedPassword };
    };

    // Create users
    const tutor = await new User(await hashPassword(tutorData)).save();
    const students = await Promise.all(
      studentsData.map(async (student) =>
        new User(await hashPassword(student)).save()
      )
    );

    console.log("Users created!");

    // Create a study group
    const studyGroup = new StudyGroup({
      title: "Math Study Group",
      subject: "Math",
      date: new Date("2025-03-10T10:00:00Z"),
      time: "10:00 AM",
      duration: 60,
      creator: students[0]._id,
      participants: students.map((s) => s._id),
    });

    await studyGroup.save();
    console.log("Study group created!");

    // Assign study group to students
    await Promise.all(
      students.map((student) =>
        User.findByIdAndUpdate(student._id, {
          $addToSet: { joinedStudyGroups: studyGroup._id },
        })
      )
    );

    console.log("Students assigned to study group!");

    // Create tutor availability (4 days)
    const availabilityData = [
      { day: "Monday", subject: "Math", startTime: "09:00", endTime: "10:00" },
      {
        day: "Tuesday",
        subject: "Physics",
        startTime: "11:00",
        endTime: "12:00",
      },
      {
        day: "Wednesday",
        subject: "Math",
        startTime: "14:00",
        endTime: "15:00",
      },
      {
        day: "Thursday",
        subject: "Physics",
        startTime: "16:00",
        endTime: "17:00",
      },
    ].map((slot) => ({ tutor: tutor._id, ...slot }));

    const createdAvailability = await Availability.insertMany(availabilityData);
    console.log("Tutor availability added!");

    // Update tutor with tutoringAvailability
    await User.findByIdAndUpdate(tutor._id, {
      $push: {
        tutoringAvailability: { $each: createdAvailability.map((a) => a._id) },
      },
    });

    console.log("Tutor availability linked to tutor profile!");

    // Create 2 tutor bookings per student
    const bookings = [];
    students.forEach((student) => {
      bookings.push(
        {
          student: student._id,
          tutor: tutor._id,
          subject: "Math",
          bookingTime: new Date("2025-03-03T09:00:00Z"),
          duration: 60,
          status: "pending",
        },
        {
          student: student._id,
          tutor: tutor._id,
          subject: "Physics",
          bookingTime: new Date("2025-03-04T11:00:00Z"),
          duration: 60,
          status: "confirmed",
        }
      );
    });

    const createdBookings = await TutorBooking.insertMany(bookings);
    console.log("Tutor sessions booked!");

    // Update users to include tutor sessions
    const updateUserTutorSessions = async (userId, sessionIds) => {
      await User.findByIdAndUpdate(userId, {
        $push: { tutorSessions: { $each: sessionIds } },
      });
    };

    await Promise.all(
      students.map((student, index) =>
        updateUserTutorSessions(student._id, [
          createdBookings[index * 2]._id,
          createdBookings[index * 2 + 1]._id,
        ])
      )
    );

    // Update tutor with all booked sessions
    await updateUserTutorSessions(
      tutor._id,
      createdBookings.map((b) => b._id)
    );

    console.log("Tutor sessions linked to users!");

    console.log("Seed data inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
    mongoose.connection.close();
  }
};

// Run seed
seedData();
