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
      subjects: [
        "Math",
        "Physics",
        "History",
        "English",
        "Biology",
        "Chemistry",
      ],
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
      {
        name: "Breezy",
        username: "breezy",
        email: "breezy@gmail.com",
        password: "demo",
        role: "student",
        subjects: ["History", "Math", "English", "Biology", "Chemistry"],
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

    // Create the original Math study group (Alex and Mia only)
    const mathStudyGroup = new StudyGroup({
      title: "Math Study Group",
      subject: "Math",
      description:
        "Weekly study session focusing on calculus and advanced algebra concepts. Open discussion and problem-solving practice.",
      date: new Date("2025-03-10T10:00:00Z"),
      time: "10:00 AM",
      duration: 60,
      creator: students[0]._id, // Alex Lee
      participants: [students[0]._id, students[1]._id], // Alex Lee and Mia Zhang
    });

    await mathStudyGroup.save();
    console.log("Original Math study group created!");

    // Assign original study group to Alex and Mia only
    await Promise.all([
      User.findByIdAndUpdate(students[0]._id, {
        $addToSet: { joinedStudyGroups: mathStudyGroup._id },
      }),
      User.findByIdAndUpdate(students[1]._id, {
        $addToSet: { joinedStudyGroups: mathStudyGroup._id },
      }),
    ]);

    // Create Breezy's study groups
    const breezyStudyGroups = [
      {
        title: "History Deep Dive",
        subject: "History",
        description:
          "Exploring major historical events and their impact on modern society. Focus on analytical thinking and document interpretation.",
        date: new Date("2025-03-15T14:00:00Z"),
        time: "2:00 PM",
        duration: 90,
        creator: students[2]._id, // Breezy
        participants: [students[2]._id], // Just Breezy
      },
      {
        title: "Algebra Practice Session",
        subject: "Algebra",
        description:
          "Interactive session working through complex algebraic equations and word problems. Bring your textbook and calculator!",
        date: new Date("2025-03-16T15:00:00Z"),
        time: "3:00 PM",
        duration: 75,
        creator: students[2]._id,
        participants: [students[2]._id],
      },
      {
        title: "English Literature Discussion",
        subject: "English",
        description:
          "Book club-style discussion on current reading assignments. We'll analyze themes, characters, and writing techniques.",
        date: new Date("2025-03-17T13:00:00Z"),
        time: "1:00 PM",
        duration: 60,
        creator: students[2]._id,
        participants: [students[2]._id],
      },
      {
        title: "Biology Study Session",
        subject: "Biology",
        description:
          "Comprehensive review of cellular biology and genetics. Will include diagram analysis and lab report preparation tips.",
        date: new Date("2025-03-18T16:00:00Z"),
        time: "4:00 PM",
        duration: 120,
        creator: students[2]._id,
        participants: [students[2]._id, students[0]._id, students[1]._id], // Breezy, Alex, and Mia
      },
      {
        title: "Chemistry Concepts Review",
        subject: "Chemistry",
        description:
          "Focus on chemical reactions and stoichiometry. Will work through practice problems and lab safety procedures.",
        date: new Date("2025-03-19T17:00:00Z"),
        time: "5:00 PM",
        duration: 90,
        creator: students[2]._id,
        participants: [students[2]._id],
      },
    ];

    const createdBreezyGroups = await StudyGroup.insertMany(breezyStudyGroups);
    console.log("Breezy's study groups created!");

    // Update Breezy's joinedStudyGroups
    await User.findByIdAndUpdate(students[2]._id, {
      $addToSet: {
        joinedStudyGroups: {
          $each: createdBreezyGroups.map((group) => group._id),
        },
      },
    });

    // Update Alex and Mia's joinedStudyGroups to include only the Biology group
    const biologyGroup = createdBreezyGroups.find(
      (group) => group.subject === "Biology"
    );
    await Promise.all([
      User.findByIdAndUpdate(students[0]._id, {
        $addToSet: { joinedStudyGroups: biologyGroup._id },
      }),
      User.findByIdAndUpdate(students[1]._id, {
        $addToSet: { joinedStudyGroups: biologyGroup._id },
      }),
    ]);

    console.log("All study groups assigned to appropriate students!");

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
