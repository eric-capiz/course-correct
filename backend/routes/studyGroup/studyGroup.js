const express = require("express");
const router = express.Router();
const StudyGroup = require("../../models/studyGroup/StudyGroup");
const User = require("../../models/user/User");
const authMiddleware = require("../../middlware/auth");

// @route   POST /api/studyGroups
// @desc    Create a new study group
// @access  Private (students only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, subject, date, time, duration } = req.body;

    if (req.user.role !== "student") {
      return res
        .status(403)
        .json({ message: "Only students can create study groups" });
    }

    const studyGroup = new StudyGroup({
      title,
      subject,
      date,
      time,
      duration,
      creator: req.user.id,
      participants: [req.user.id], // Add the creator to participants
    });

    await studyGroup.save();

    // Add the study group to the creator's `joinedStudyGroups`
    await User.findByIdAndUpdate(req.user.id, {
      $push: { joinedStudyGroups: studyGroup._id },
    });

    res.status(201).json(studyGroup);
  } catch (err) {
    console.error("Error creating study group:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/studyGroups
// @desc    Get all study groups
// @access  Public
router.get("/", async (req, res) => {
  try {
    const studyGroups = await StudyGroup.find();

    res.json(studyGroups);
  } catch (err) {
    console.error("Error fetching study groups:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/studyGroups/:id/join
// @desc    Join a study group
// @access  Private (students only)
// @route   POST /api/studyGroups/:id/join
// @desc    Join a study group
// @access  Private (students only)
router.post("/:id/join", authMiddleware, async (req, res) => {
  try {
    const studyGroup = await StudyGroup.findById(req.params.id);

    if (!studyGroup) {
      return res.status(404).json({ message: "Study group not found" });
    }

    if (req.user.role !== "student") {
      return res
        .status(403)
        .json({ message: "Only students can join study groups" });
    }

    // Check if the student is the creator
    if (studyGroup.creator.toString() === req.user.id) {
      return res
        .status(400)
        .json({ message: "You are the creator, not a participant" });
    }

    // Check if the student is already in the participants list
    if (studyGroup.participants.includes(req.user.id)) {
      return res.status(400).json({ message: "You are already a participant" });
    }

    // Add the student to participants
    studyGroup.participants.push(req.user.id);
    await studyGroup.save();

    // Add the study group to the student's `joinedStudyGroups`
    await User.findByIdAndUpdate(req.user.id, {
      $push: { joinedStudyGroups: studyGroup._id },
    });

    res
      .status(200)
      .json({ message: "Joined study group successfully", studyGroup });
  } catch (err) {
    console.error("Error joining study group:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/studyGroups/:id/leave
// @desc    Leave a study group
// @access  Private (students only)
router.post("/:id/leave", authMiddleware, async (req, res) => {
  try {
    const studyGroup = await StudyGroup.findById(req.params.id);

    if (!studyGroup) {
      return res.status(404).json({ message: "Study group not found" });
    }

    if (req.user.role !== "student") {
      return res
        .status(403)
        .json({ message: "Only students can leave study groups" });
    }

    // Check if the student is a participant of the study group
    if (!studyGroup.participants.includes(req.user.id)) {
      return res.status(400).json({ message: "You are not a participant" });
    }

    // Remove the student from the participants list
    studyGroup.participants = studyGroup.participants.filter(
      (participant) => participant.toString() !== req.user.id.toString()
    );
    await studyGroup.save();

    // Remove the study group from the student's `joinedStudyGroups` array
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { joinedStudyGroups: studyGroup._id },
    });

    res
      .status(200)
      .json({ message: "Left study group successfully", studyGroup });
  } catch (err) {
    console.error("Error leaving study group:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PATCH /api/studyGroups/:id
// @desc    Update a study group (subject, date, time, duration)
// @access  Private (only creator of the group can update)
// Only the creator can change the subject, date, or time, but if participants have joined, only the duration can be modified
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const { subject, date, time, duration } = req.body;

    const studyGroup = await StudyGroup.findById(req.params.id);

    if (!studyGroup) {
      return res.status(404).json({ message: "Study group not found" });
    }

    // Check if the user is the creator of the study group
    if (studyGroup.creator.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Only the creator can update the study group" });
    }

    // If there are participants, only allow changing the duration
    if (studyGroup.participants.length > 0 && (subject || date || time)) {
      return res.status(400).json({
        message:
          "Cannot change subject, date, or time once participants have joined. You can only modify the duration.",
      });
    }

    // Update the study group with the new details
    if (subject) studyGroup.subject = subject;
    if (date) studyGroup.date = date;
    if (time) studyGroup.time = time;
    if (duration) studyGroup.duration = duration;

    await studyGroup.save();

    res
      .status(200)
      .json({ message: "Study group updated successfully", studyGroup });
  } catch (err) {
    console.error("Error updating study group:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/studyGroups/:id
// @desc    Delete a study group (only creator can delete)
// @access  Private
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const studyGroup = await StudyGroup.findById(req.params.id);

    if (!studyGroup) {
      return res.status(404).json({ message: "Study group not found" });
    }

    // Check if the user is the creator of the study group
    if (studyGroup.creator.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Only the creator can delete the study group" });
    }

    // Check if there are any participants
    if (studyGroup.participants.length > 0) {
      return res.status(400).json({
        message:
          "Cannot delete the study group as there are participants. You can only update the group.",
      });
    }

    // Delete the study group
    await studyGroup.remove();

    res.status(200).json({ message: "Study group deleted successfully" });
  } catch (err) {
    console.error("Error deleting study group:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
