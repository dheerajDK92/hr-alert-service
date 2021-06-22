const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Admin = require("../../model/admin/Admin");

// validation
const {
  adminRegisterValidation,
  adminLoginValidation,
} = require("../../validation/admin/validation-admin");
// TODO: we can uncomment below method to register new admin
router.post("/register", async (req, res) => {
  // validate the user
  // console.log("req.body",req.body);
  const { error } = adminRegisterValidation(req.body);
  // console.log("error",error);
  // // throw validation errors
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const isEmailExist = await Admin.findOne({ email: req.body.email });

  // throw error when email already registered
  if (isEmailExist)
    return res.status(400).json({ error: "Email already exists" });

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new Admin({
    name: req.body.name,
    email: req.body.email,
    password,
  });

  try {
    const savedUser = await user.save();
    res.json({ error: null, data: { userId: savedUser._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// login route
router.post("/login", async (req, res) => {
  // validate the user
  const { error } = adminLoginValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });
  console.log("error", error);

  const user = await Admin.findOne({ email: req.body.email });

  // throw error when email is wrong
  if (!user) return res.status(400).json({ error: "Email is wrong" });

  // check for password correctness
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Password is wrong" });

  // create token
  const token = jwt.sign(
    // payload data
    {
      email: user.email,
      id: user._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.header("auth-token", token).json({
    error: null,
    data: {
      token,
    },
  });
});

module.exports = router;
