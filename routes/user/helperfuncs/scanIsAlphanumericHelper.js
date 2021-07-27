const { isAlphanumeric } = require("../helperFuncs");

function scanIsAlphaNumericHelper(req, res, next) {
  const { errorObj } = res.locals;

  if (!scanIsAlphaNumeric(req.body.username)) {
    errorObj.usernameError =
      "username can only include alphabetical letters and numbers";
  }
  next();
}

module.exports = scanIsAlphaNumericHelper;
