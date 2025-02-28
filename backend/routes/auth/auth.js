const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user/User");
const authMiddleware = require("../../middlware/auth");

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
  const { name, username, email, password, role, subjects, gradeLevel } =
    req.body;

  try {
    // Check if email already exists
    let userByEmail = await User.findOne({ email });
    if (userByEmail) {
      return res.status(400).json({ message: "User already exists" });
    }
    //Check if username already exists
    let userByUsername = await User.findOne({ username });
    if (userByUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role,
      subjects,
      gradeLevel,
      tutoringAvailability: role === "tutor" ? [] : undefined,
      joinedStudyGroups: [],
    });

    //Save user to database
    await user.save();

    //Create token
    const payload = {
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        subjects: user.subjects,
        gradeLevel: user.gradeLevel,
        tutoringAvailability: user.tutoringAvailability,
        joinedStudyGroups: user.joinedStudyGroups,
      },
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    res.json({ token });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user or admin & get token
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create token
    const payload = {
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/verify", authMiddleware, async (req, res) => {
  try {
    console.log("Verifying token for user:", req.user);
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User verified:", user);
    res.json(user);
  } catch (err) {
    console.error("Verify route error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
