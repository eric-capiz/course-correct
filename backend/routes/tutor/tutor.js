const express = require("express");
const router = express.Router();
const Availability = require("../../models/tutorAvailability/tutorAvailbility");
const TutorBooking = require("../../models/tutorBooking/TutorBooking");
const authMiddleware = require("../../middlware/auth");

// @route   POST /api/tutors/availability
// @desc    Set tutor availability (days, times, subjects)
// @access  Private (tutors only)
router.post("/availability", authMiddleware, async (req, res) => {
  try {
    const { availability } = req.body;

    if (req.user.role !== "tutor") {
      return res
        .status(403)
        .json({ message: "Only tutors can add availability" });
    }

    const tutorId = req.user.id;

    for (let slot of availability) {
      const { day, subject, startTime, endTime } = slot;

      // Validate that start time is not in the past
      if (new Date(startTime) < new Date()) {
        return res
          .status(400)
          .json({ message: "Start time cannot be in the past" });
      }

      // Get existing availability for the day
      const existingAvailability = await Availability.find({
        tutor: tutorId,
        day: day,
      }).sort({ startTime: 1 });

      let earliestAvailableStartTime = startTime;

      if (existingAvailability.length > 0) {
        const lastSlot = existingAvailability[existingAvailability.length - 1];
        earliestAvailableStartTime = lastSlot.endTime;
      }

      if (new Date(startTime) < new Date(earliestAvailableStartTime)) {
        return res.status(400).json({
          message: `The start time for ${subject} must be after ${earliestAvailableStartTime}.`,
        });
      }

      const duration = (new Date(endTime) - new Date(startTime)) / 60000;

      const newAvailability = new Availability({
        tutor: tutorId,
        day,
        subject,
        startTime,
        endTime,
        duration,
        isActive: false, // Default is inactive
      });

      await newAvailability.save();
    }

    res.status(201).json({ message: "Availability added successfully" });
  } catch (err) {
    console.error("Error adding availability:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/tutors/availability
// @desc    Get tutor's availability
// @access  Private (tutors only)
router.get("/availability", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "tutor") {
      return res
        .status(403)
        .json({ message: "Only tutors can view availability" });
    }

    const tutorAvailability = await Availability.find({ tutor: req.user.id });

    res.json(tutorAvailability);
  } catch (err) {
    console.error("Error fetching tutor availability:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PATCH /api/tutors/availability/:id
// @desc    Update availability (subject, time) or disable the date
// @access  Private (tutors only)
router.patch("/availability/:id", authMiddleware, async (req, res) => {
  try {
    const { subject, startTime, endTime, disableDay, isActive } = req.body;
    const availabilityId = req.params.id;

    if (req.user.role !== "tutor") {
      return res
        .status(403)
        .json({ message: "Only tutors can update availability" });
    }

    const availability = await Availability.findById(availabilityId);
    if (!availability) {
      return res.status(404).json({ message: "Availability not found" });
    }

    // Check for bookings in this availability slot
    const bookingsForSlot = await TutorBooking.find({
      tutor: req.user.id,
      bookingTime: {
        $gte: new Date(availability.startTime),
        $lt: new Date(availability.endTime),
      },
    });

    if (bookingsForSlot.length > 0) {
      return res.status(400).json({
        message: "Cannot update this availability as it is already booked",
      });
    }

    // Disable the entire day if `disableDay` is true
    if (disableDay) {
      const bookingsForDay = await TutorBooking.find({
        tutor: req.user.id,
        bookingTime: {
          $gte: new Date(availability.day),
          $lt: new Date(availability.day).setHours(23, 59, 59, 999),
        },
      });

      if (bookingsForDay.length === 0) {
        await Availability.updateMany(
          { tutor: req.user.id, day: availability.day },
          { $set: { isActive: false } }
        );
        return res.status(200).json({
          message: "All availability slots for this day have been disabled",
        });
      } else {
        return res.status(400).json({
          message: "You have bookings for this day, you cannot disable it",
        });
      }
    }

    // Update subject, start time, end time, and isActive
    if (subject) availability.subject = subject;
    if (startTime) availability.startTime = startTime;
    if (endTime) availability.endTime = endTime;
    if (isActive !== undefined) availability.isActive = isActive;

    await availability.save();
    res.status(200).json(availability);
  } catch (err) {
    console.error("Error updating availability:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/tutors/availability/:id
// @desc    Delete availability slot
// @access  Private (tutors only)
router.delete("/availability/:id", authMiddleware, async (req, res) => {
  try {
    const availabilityId = req.params.id;

    if (req.user.role !== "tutor") {
      return res
        .status(403)
        .json({ message: "Only tutors can delete availability" });
    }

    const availability = await Availability.findById(availabilityId);
    if (!availability) {
      return res.status(404).json({ message: "Availability not found" });
    }

    // Check for any bookings before allowing deletion
    const bookingsForSlot = await TutorBooking.find({
      tutor: req.user.id,
      bookingTime: {
        $gte: new Date(availability.startTime),
        $lt: new Date(availability.endTime),
      },
    });

    if (bookingsForSlot.length > 0) {
      return res.status(400).json({
        message: "Cannot delete availability, there are bookings for this slot",
      });
    }

    await availability.remove();
    res.status(200).json({ message: "Availability deleted successfully" });
  } catch (err) {
    console.error("Error deleting availability:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
