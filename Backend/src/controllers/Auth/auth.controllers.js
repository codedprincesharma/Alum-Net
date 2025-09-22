import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/user.js";  

// --- SIGNUP ---
const signup = async (req, res) => {
  const { email, password, fullName, role } = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }

    // Generate random avatar
    const idx = Math.floor(Math.random() * 1000) + 1;
    const randomAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${idx}`;

    // Hash password manually
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign default role = "user" if not provided
    const newUser = await User.create({
      email,
      fullName,
      password: hashedPassword,
      profilePic: randomAvatar,
      role: role || "user",
    });

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(201).json({ success: true, user: newUser });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// --- LOGIN ---
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// --- LOGOUT ---
const logout = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.status(200).json({ message: "Logout successful" });
};

// --- CHANGE PASSWORD ---
const changePassword = async (req, res) => {
  const userId = req.user._id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Both old and new passwords are required" });
  }

  const user = await User.findById(userId);
  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Old password is incorrect" });
  }

  // Hash new password manually
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
};

// --- DELETE ACCOUNT ---
const deleteAccount = async (req, res) => {
  const userId = req.user._id;
  await User.findByIdAndDelete(userId);
  res.status(200).json({ message: "Account deleted successfully" });
};

// --- ROLE MIDDLEWARE ---
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
};

// --- ADMIN LOGIN ---
const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: admin._id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, { httpOnly: true, sameSite: "None", secure: true });

    res.json({ message: "Admin login successful", admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// --- ADD ADMIN ---
const addAdmin = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already taken" });

    // Hash password manually
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await User.create({
      email,
      fullName,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({ message: "Admin created", admin: newAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- GET CURRENT USER ---
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  signup,
  login,
  logout,
  changePassword,
  deleteAccount,
  authorizeRoles,
  AdminLogin,
  addAdmin,
  getMe
};
