const express = require("express");
const router = require.Router();

const { createProfile } = require("./controller/userController");

//place helperFuncs in const variables and connect to their paths

//require helperFuncs in helperFuncs -> authMiddleware

const jwtMiddleware = require("../utils/jwtMiddleware");

//create validator router.posts for ->createProfile
router.post();

//create validator router.posts for -> Login
router.post();

module.exports = router;
