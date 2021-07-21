const {
  scanIsEmail,
  scanIsAlpha,
  scanIsAlphanumeric,
} = require("../../utils/authMethods");

//helper func that checks email format
function scanIsEmailHelper(req, res, next) {
  const { errorObj } = res.locals;

  if (!scanIsEmail(req.body.email)) {
    errorObj.wrongEmailFormat = "Must be in email format - ie: xxx@mail.com";
  }
  next();
}

//helper func for if user input contains only alpha for first & last name
function scanIsAlphaHelper(req, res, next) {
  const { errorObj } = res.locals;
  const userInput = req.body;
  for (key in userInput) {
    if (key === "firstName" || key === "lastName") {
      if (!scanIsAlpha(userInput[key])) {
        errorObj[`${key}`] = `${key} must only include alphabetical letters`;
      }
    }
  }
  next();
}

//helper func that checks if user input for username only contains alphabet & numerical values
function scanIsAlphanumericHelper(req, res, next) {
  const { errorObj } = res.locals;
  //if the user inputted username format is incorrect, send usernameError msg
  if (!scanIsAlphanumeric(req.body.username)) {
    errorObj.usernameError =
      "username can only include alphabetical letters and numbers";
  }
  next();
}

module.exports = {
  scanIsEmailHelper,
  scanIsAlphaHelper,
  scanIsAlphanumericHelper,
};
