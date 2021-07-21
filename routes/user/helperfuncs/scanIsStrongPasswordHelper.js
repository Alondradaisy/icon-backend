const { scanIsStrongPassword } = require("../../utils/authMethods");

function scanIsStrongPasswordHelper(req, res, next) {
  // let errorObj = {};

  const { errorObject } = res.locals;

  // scan for a password before checking for strength

  //\\if there is a user input in field, this is the validator for password strength

  // if(!scanIsStrongPassword(req.body.password)) {
  //errorObj.weakPassword = "password must include:
  // 1 lowercase, 1 uppercase, 1 special character, 1 number & length of at least 8"}
  next();
}

module.exports = scanIsStrongPasswordHelper;
