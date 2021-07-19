const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

async function createProfile(req, res, next) {
  const { firstName, lastName, username, email, password } = req.body;
}

module.exports = { createProfile };
