const express = require("express");
const router = express.Router();
const TutorBooking = require("../../models/tutorBooking/TutorBooking");
const Availability = require("../../models/tutorAvailability/tutorAvailbility");
const User = require("../../models/user/User");
const authMiddleware = require("../../middlware/auth");

// @route   POST /api/bookings
// @desc    Create a new tutor booking (student requests a session)
// @access  Private (students only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { tutor, subject, bookingTime, availabilityId, duration } = req.body;

    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can book tutors" });
    }

    // Mark the availability slot as inactive
    const availabilitySlot = await Availability.findById(availabilityId);
    if (!availabilitySlot) {
      return res.status(404).json({ message: "Availability slot not found" });
    }

    availabilitySlot.isActive = false;
    await availabilitySlot.save();

    const booking = new TutorBooking({
      student: req.user.id,
      tutor,
      subject,
      bookingTime,
      duration,
      status: "pending",
    });

    await booking.save();

    // Update student and tutor documents with the new session
    await User.findByIdAndUpdate(req.user.id, {
      $push: { tutorSessions: booking._id },
    });

    await User.findByIdAndUpdate(tutor, {
      $push: { tutorSessions: booking._id },
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/bookings/tutor
// @desc    Get all bookings for a tutor (formatted for FullCalendar)
// @access  Private (tutors only)
router.get("/tutor", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "tutor") {
      return res.status(403).json({ message: "Only tutors can view bookings" });
    }

    const bookings = await TutorBooking.find({ tutor: req.user.id }).populate(
      "student",
      "name email"
    );

    const events = bookings.map((booking) => ({
      id: booking._id,
      title: `${booking.subject}`,
      start: booking.bookingTime,
      end: new Date(
        new Date(booking.bookingTime).getTime() + booking.duration * 60000
      ).toISOString(),
      extendedProps: {
        student: booking.student.name,
        status: booking.status,
        duration: booking.duration,
      },
    }));

    res.json(events);
  } catch (err) {
    console.error("Error fetching tutor bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/bookings/student
// @desc    Get all bookings for a student (formatted for FullCalendar)
// @access  Private (students only)
router.get("/student", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res
        .status(403)
        .json({ message: "Only students can view bookings" });
    }

    const bookings = await TutorBooking.find({ student: req.user.id }).populate(
      "tutor",
      "name email"
    );

    const events = bookings.map((booking) => ({
      id: booking._id,
      title: `${booking.subject}`,
      start: booking.bookingTime,
      end: new Date(
        new Date(booking.bookingTime).getTime() + booking.duration * 60000
      ).toISOString(), // End time logic will be handled in frontend
      extendedProps: {
        tutor: booking.tutor.name,
        status: booking.status,
        duration: booking.duration,
      },
    }));

    res.json(events);
  } catch (err) {
    console.error("Error fetching student bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PATCH /api/bookings/:id
// @desc    Update booking status (confirm, complete, cancel), booking time
// @access  Private (tutors & students)
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const { status, bookingTime } = req.body;

    const booking = await TutorBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Status update logic
    if (status) {
      if (!["confirmed", "completed", "cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status update" });
      }

      if (req.user.role === "tutor") {
        if (status === "confirmed" || status === "completed") {
          booking.status = status;
        } else {
          return res
            .status(403)
            .json({ message: "Tutors cannot cancel student bookings" });
        }
      } else if (req.user.role === "student") {
        if (status === "cancelled") {
          booking.status = status;
        } else {
          return res
            .status(403)
            .json({ message: "Students can only cancel bookings" });
        }
      }
    }

    // Booking Time update (check availability logic should be handled before this step)
    if (bookingTime) {
      // Logic to ensure the new booking time fits into the tutor's availability
      booking.bookingTime = bookingTime;
    }

    await booking.save();
    res.status(200).json(booking);
  } catch (err) {
    console.error("Booking update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
