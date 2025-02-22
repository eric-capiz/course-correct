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
    });

    // Automatically set status to pending when booking is created
    booking.status = "pending";

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/bookings/tutor
// @desc    Get all bookings for a tutor
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
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching tutor bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/bookings/student
// @desc    Get all bookings for a student
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
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching student bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PATCH /api/bookings/:id/update-status
// @desc    Update the status of a booking (confirm, cancel, complete)
// @access  Private
router.patch("/:id/update-status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body; // status could be "confirmed", "cancelled", or "completed"

    if (!["confirmed", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const booking = await TutorBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only allow the tutor to confirm the booking
    if (status === "confirmed" && booking.tutor.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Only tutors can confirm bookings" });
    }

    // Allow the tutor or student to cancel the booking
    if (
      status === "cancelled" &&
      booking.student.toString() !== req.user.id &&
      booking.tutor.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "You can only cancel your own bookings" });
    }

    // Only the tutor can mark the session as completed
    if (status === "completed" && booking.tutor.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Only tutors can mark bookings as completed" });
    }

    // Update the status
    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error("Error updating booking status:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
