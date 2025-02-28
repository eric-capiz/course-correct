const express = require("express");
const router = express.Router();
const User = require("../../models/user/User");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../../middlware/auth");

// @route   GET /api/user/:id
// @desc    Get user data (excluding password)
// @access  Private
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/user/:id
// @desc    Update user data (email, username, subjects, gradeLevel)
// @access  Private
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { email, username, subjects, gradeLevel } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is updating their own profile
    if (user._id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only update your own profile" });
    }

    // Update fields
    if (email) user.email = email;
    if (username) user.username = username;
    if (subjects) user.subjects = subjects;
    if (gradeLevel) user.gradeLevel = gradeLevel;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error("Error updating user data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PATCH /api/user/:id/password
// @desc    Update user password
// @access  Private
router.patch("/:id/password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is updating their own password
    if (user._id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only update your own password" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
