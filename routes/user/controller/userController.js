const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

//createProfile with these input fields, make sure user inputs in body(alert if user did not input), uses bcrypt to create a secure hashed password, save createdProfile
async function createProfile(req, res, next) {
  const { firstName, lastName, username, email, password } = req.body;

  const { errorObj } = res.locals;

  if (Object.keys(errorObj).length > 0) {
    return res
      .status(500)
      .json({ message: "failed attempt", payload: errorObj });
  }

  try {
    let salt = await bcrypt.genSalt(12);
    let securePassword = await bcrypt.hash(password, salt);

    const createdProfile = new User({
      firstName,
      lastName,
      email,
      username,
      password: securePassword,
    });
    await createdProfile.save();

    res.json({ message: "You have successfully created a profile" });
  } catch (e) {
    next(e);
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const { errorObj } = res.locals;

  if (Object.keys(errorObj).length > 0) {
    return res
      .status(500)
      .json({ message: "failed attempt", payload: errorObj });
  }

  try {
    let foundProfile = await User.findOne({ email: email });

    if (!foundProfile) {
      res.status(400).json({
        message: "Profile not found",
        payload: "Please check that you entered the correct email and password",
      });
    } else {
      let comparedPassword = await bcrypt.compare(
        password,
        foundProfile.password
      );
      if (!comparedPassword) {
        res.status(400).json({
          message: "Profile not found",
          payload:
            "Please check that you entered the correct email and password",
        });
      } else {
        let jwtToken = jwt.sign(
          {
            email: foundProfile.email,
          },
          process.env.PRIVATE_JWT_KEY
        );
      }
      res.json({
        message: "Successfully logged in",
        payload: jwtToken,
      });
    }
  } catch (e) {
    res.json({ message: "error", error: e });
  }
}

async function fetchUserInfo(req, res, next) {
  try {
    let userInfo = await User.findOne({
      email: res.locals.decodedJwt.email,
    }).select("-password -_v -friends -_id");

    res.json({ message: "success", payload: userInfo });
  } catch (e) {
    next(e);
  }
}

module.exports = { createProfile, login, fetchUserInfo };
