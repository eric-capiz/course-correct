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

    // Define users data
    const tutorsData = [
      {
        name: "John Smith",
        username: "johnsmith",
        email: "johnsmith@example.com",
        password: "demo",
        role: "tutor",
        subjects: ["Math", "Physics", "Chemistry", "Computer Science"],
        gradeLevel: "Uni-Senior",
      },
      {
        name: "Maria Garcia",
        username: "mariagarcia",
        email: "mariagarcia@example.com",
        password: "demo",
        role: "tutor",
        subjects: ["Biology", "Chemistry", "Environmental Science", "Math"],
        gradeLevel: "Uni-Junior",
      },
      {
        name: "David Chen",
        username: "davidchen",
        email: "davidchen@example.com",
        password: "demo",
        role: "tutor",
        subjects: [
          "History",
          "English",
          "Literature",
          "Political Science",
          "Economics",
        ],
        gradeLevel: "Uni-Senior",
      },
    ];

    const studentsData = [
      {
        name: "Emma Wilson",
        username: "emmawilson",
        email: "emmawilson@example.com",
        password: "demo",
        role: "student",
        subjects: ["Math", "Physics", "Computer Science", "Chemistry"],
        gradeLevel: "H.S-Senior",
      },
      {
        name: "James Lee",
        username: "jameslee",
        email: "jameslee@example.com",
        password: "demo",
        role: "student",
        subjects: [
          "Biology",
          "Chemistry",
          "Environmental Science",
          "Math",
          "Physics",
        ],
        gradeLevel: "H.S-Junior",
      },
      {
        name: "Sofia Rodriguez",
        username: "sofiarodriguez",
        email: "sofiarodriguez@example.com",
        password: "demo",
        role: "student",
        subjects: ["History", "English", "Literature", "Economics"],
        gradeLevel: "H.S-Senior",
      },
      {
        name: "Lucas Kim",
        username: "lucaskim",
        email: "lucaskim@example.com",
        password: "demo",
        role: "student",
        subjects: [
          "Math",
          "Chemistry",
          "Physics",
          "Computer Science",
          "Biology",
        ],
        gradeLevel: "H.S-Sophomore",
      },
      {
        name: "Olivia Brown",
        username: "oliviabrown",
        email: "oliviabrown@example.com",
        password: "demo",
        role: "student",
        subjects: [
          "Biology",
          "English",
          "History",
          "Environmental Science",
          "Political Science",
        ],
        gradeLevel: "H.S-Senior",
      },
    ];

    // Hash passwords and create users
    const hashPassword = async (userData) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      return { ...userData, password: hashedPassword };
    };

    const tutors = await Promise.all(
      tutorsData.map(async (tutor) =>
        new User(await hashPassword(tutor)).save()
      )
    );

    const students = await Promise.all(
      studentsData.map(async (student) =>
        new User(await hashPassword(student)).save()
      )
    );

    console.log("Users created successfully!");

    // Create study groups
    const studyGroupsData = [
      {
        title: "Advanced Physics & Computer Science",
        subject: "Physics",
        description: "Computational physics and programming applications",
        date: new Date("2024-03-20T14:00:00Z"),
        time: "2:00 PM",
        duration: 90,
        creator: students[0]._id,
        participants: [students[0]._id, students[3]._id],
      },
      {
        title: "Environmental Biology Research",
        subject: "Biology",
        description: "Ecosystem studies and environmental impact analysis",
        date: new Date("2024-03-21T15:00:00Z"),
        time: "3:00 PM",
        duration: 120,
        creator: students[1]._id,
        participants: [students[1]._id, students[4]._id],
      },
      {
        title: "Modern Literature Analysis",
        subject: "Literature",
        description: "Contemporary authors and literary techniques",
        date: new Date("2024-03-22T16:00:00Z"),
        time: "4:00 PM",
        duration: 90,
        creator: students[2]._id,
        participants: [students[2]._id, students[4]._id],
      },
      {
        title: "Chemistry & Environmental Science",
        subject: "Chemistry",
        description: "Chemical processes in environmental systems",
        date: new Date("2024-03-23T13:00:00Z"),
        time: "1:00 PM",
        duration: 120,
        creator: students[1]._id,
        participants: [students[1]._id, students[3]._id, students[4]._id],
      },
      {
        title: "Political Economics Forum",
        subject: "Political Science",
        description: "Discussion of economic policies and political systems",
        date: new Date("2024-03-24T17:00:00Z"),
        time: "5:00 PM",
        duration: 90,
        creator: students[2]._id,
        participants: [students[2]._id, students[4]._id],
      },
      {
        title: "Advanced Mathematics Workshop",
        subject: "Math",
        description: "Complex problem-solving and theoretical concepts",
        date: new Date("2024-03-25T14:00:00Z"),
        time: "2:00 PM",
        duration: 120,
        creator: students[0]._id,
        participants: [students[0]._id, students[1]._id, students[3]._id],
      },
    ];

    const createdStudyGroups = await StudyGroup.insertMany(studyGroupsData);
    console.log("Study groups created successfully!");

    // Update users with their study groups
    for (const group of createdStudyGroups) {
      await Promise.all(
        group.participants.map((participantId) =>
          User.findByIdAndUpdate(participantId, {
            $addToSet: { joinedStudyGroups: group._id },
          })
        )
      );
    }

    // Create availability slots for tutors (current month)
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const generateAvailabilitySlots = (tutor) => {
      const slots = [];
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      // Generate 7-10 slots per tutor
      const numSlots = Math.floor(Math.random() * 4) + 7; // 7-10 slots

      for (let i = 0; i < numSlots; i++) {
        const day =
          Math.floor(Math.random() * (daysInMonth - currentDate.getDate())) +
          currentDate.getDate();
        const hour = Math.floor(Math.random() * 8) + 9; // 9 AM to 5 PM
        const subject =
          tutor.subjects[Math.floor(Math.random() * tutor.subjects.length)];

        // Create the date objects
        const startTime = new Date(currentYear, currentMonth, day, hour);
        const endTime = new Date(currentYear, currentMonth, day, hour + 1);

        slots.push({
          tutor: tutor._id,
          day: startTime.toLocaleDateString("en-CA"),
          subject,
          startTime: startTime.toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          endTime: endTime.toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          isActive: true,
        });
      }
      return slots;
    };

    let allAvailabilitySlots = [];
    for (const tutor of tutors) {
      const tutorSlots = generateAvailabilitySlots(tutor);
      allAvailabilitySlots = [...allAvailabilitySlots, ...tutorSlots];
    }

    const createdAvailability = await Availability.insertMany(
      allAvailabilitySlots
    );
    console.log("Availability slots created successfully!");

    // Update tutors with their availability slots
    for (const tutor of tutors) {
      const tutorSlots = createdAvailability.filter(
        (slot) => slot.tutor.toString() === tutor._id.toString()
      );
      await User.findByIdAndUpdate(tutor._id, {
        $push: {
          tutoringAvailability: { $each: tutorSlots.map((slot) => slot._id) },
        },
      });
    }

    // Create bookings for half of the availability slots
    const bookingStatuses = ["pending", "confirmed", "completed", "cancelled"];
    const bookingsData = [];
    const usedSlots = new Set(); // To track which slots are already booked
    const usedTimes = new Map(); // To track student booking times

    for (let i = 0; i < Math.floor(createdAvailability.length / 2); i++) {
      let slot;
      do {
        slot =
          createdAvailability[
            Math.floor(Math.random() * createdAvailability.length)
          ];
      } while (usedSlots.has(slot._id.toString()));

      const student = students[Math.floor(Math.random() * students.length)];
      const startTime = new Date(slot.startTime);

      // Check if student already has a booking at this time
      if (usedTimes.has(student._id.toString())) {
        const studentTimes = usedTimes.get(student._id.toString());
        if (studentTimes.some((time) => Math.abs(time - startTime) < 3600000)) {
          // 1 hour in milliseconds
          continue;
        }
      }

      usedSlots.add(slot._id.toString());
      if (!usedTimes.has(student._id.toString())) {
        usedTimes.set(student._id.toString(), []);
      }
      usedTimes.get(student._id.toString()).push(startTime);

      bookingsData.push({
        student: student._id,
        tutor: slot.tutor,
        subject: slot.subject,
        bookingTime: new Date(slot.startTime).toLocaleString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        duration: 60,
        status:
          bookingStatuses[Math.floor(Math.random() * bookingStatuses.length)],
      });
    }

    const createdBookings = await TutorBooking.insertMany(bookingsData);
    console.log("Tutor bookings created successfully!");

    // Update users with their bookings
    for (const booking of createdBookings) {
      await User.findByIdAndUpdate(booking.student, {
        $push: { tutorSessions: booking._id },
      });
      await User.findByIdAndUpdate(booking.tutor, {
        $push: { tutorSessions: booking._id },
      });
    }

    console.log("All data seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
    mongoose.connection.close();
  }
};

// Run seed
seedData();
