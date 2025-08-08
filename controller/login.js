const User = require("../models/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//login
const login = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || user.role !== role)
      return res.status(400).json({ message: "Invalid credentials or role" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 2 * 60 * 60 * 1000,
    }).json({ message: "Login successful",success: true,user: { role: user.role, username: user.username }} );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

 //logout
const logOut= (req, res) => {
  // res.clearCookie("token").json({ message: "Logged out" });
  res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None",
}).json({ message: "Logged out" });
}

//check
const check= async (req, res) => {
//     if (!req.user) {
//     // TEMP fallback for development (use a dummy user role)
//     return res.json({ userId: 'dev123', role: 'Admin' });
//   }
  res.json({ userId: req.user.userId, role: req.user.role });
}
module.exports ={login,logOut,check}
