const express = require("express");
const router = require.Router();

const {
  createProfile,
  login,
  fetchUserInfo,
} = require("./controller/userController");

//place helperFuncs in const variables and connect to their paths
const scanIsUndefinedHelper = require("./helperFuncs/scanIsUndefinedHelper");
const scanIsEmptyHelper = require("./helperFuncs/scanIsEmptyHelper");
const scanIsStrongPasswordHelper = require("./helperFuncs/scanIsStrongPasswordHelper");

//require helperFuncs in helperFuncs -> authMiddleware

const {
  scanIsEmailHelper,
  scanIsAlphaHelper,
  scanIsAlphaNumericHelper,
} = require("./helperFuncs/authMiddleware");

const jwtMiddleware = require("../utils/jwtMiddleware");

//create validator router.posts for ->createProfile
router.post(
  "/create-profile",
  scanIsUndefinedHelper,
  scanIsEmptyHelper,
  scanIsEmailHelper,
  scanIsAlphaHelper,
  scanIsStrongPasswordHelper,
  scanIsAlphaNumericHelper,
  createProfile
);

//create validator router.posts for -> Login
router.post(
  "/login",
  scanIsUndefinedHelper,
  scanIsEmptyHelper,
  scanIsEmailHelper,
  login
);

router.get("/get-user-info", jwtMiddleware, fetchUserInfo);

router.put("");

module.exports = router;
