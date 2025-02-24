const express = require("express");
const router = express.Router();
const TutorBooking = require("../../models/tutor/TutorBooking");
const authMiddleware = require("../../middleware/auth");

// @route   POST /api/bookings
// @desc    Create a new tutor booking (student requests a session)
// @access  Private (students only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { tutor, subject, bookingTime, duration } = req.body;

    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can book tutors" });
    }

    const booking = new TutorBooking({
      student: req.user.id,
      tutor,
      subject,
      bookingTime,
      duration,
      status: "pending",
    });

    await booking.save();
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
      title: `${booking.subject} - ${booking.status}`,
      start: booking.bookingTime,
      end: new Date(
        new Date(booking.bookingTime).getTime() + booking.duration * 60000
      ),
      extendedProps: {
        student: booking.student.name,
        status: booking.status,
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
      title: `${booking.subject} - ${booking.status}`,
      start: booking.bookingTime,
      end: new Date(
        new Date(booking.bookingTime).getTime() + booking.duration * 60000
      ),
      extendedProps: {
        tutor: booking.tutor.name,
        status: booking.status,
      },
    }));

    res.json(events);
  } catch (err) {
    console.error("Error fetching student bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PATCH /api/bookings/:id
// @desc    Update booking status (confirm, complete, cancel), booking time & duration
// @access  Private (tutors & students)
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const { status, bookingTime, duration } = req.body;

    const booking = await TutorBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Status update logic (same as before)
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

    // Booking Time & Duration update logic (only student can request this)
    if (req.user.role === "student" && (bookingTime || duration)) {
      const newBookingTime = bookingTime
        ? new Date(bookingTime)
        : booking.bookingTime;
      const newDuration = duration || booking.duration;
      const newEndTime = new Date(
        newBookingTime.getTime() + newDuration * 60000
      ); // Convert duration to milliseconds

      // Check if the tutor has conflicting bookings
      const conflict = await TutorBooking.findOne({
        tutor: booking.tutor,
        _id: { $ne: booking._id }, // Exclude the current booking from the check
        bookingTime: { $lt: newEndTime }, // Starts before the new booking ends
        $expr: {
          $gte: [
            { $add: ["$bookingTime", { $multiply: ["$duration", 60000] }] },
            newBookingTime,
          ], // Ends after the new booking starts
        },
      });

      if (conflict) {
        return res
          .status(400)
          .json({ message: "This time slot is already booked for the tutor" });
      }

      // If no conflicts, update the booking
      booking.bookingTime = newBookingTime;
      booking.duration = newDuration;
    }

    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
