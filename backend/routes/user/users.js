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
// @desc    Update user data (including optional password)
// @access  Private
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { email, username, subjects, gradeLevel, role, name, password } =
      req.body;

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

    // Update basic fields if provided
    if (email) user.email = email;
    if (username) user.username = username;
    if (subjects) user.subjects = subjects;
    if (gradeLevel) user.gradeLevel = gradeLevel;
    if (role) user.role = role;
    if (name) user.name = name;

    // Update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    // Return user without password
    const updatedUser = await User.findById(req.params.id).select("-password");
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
