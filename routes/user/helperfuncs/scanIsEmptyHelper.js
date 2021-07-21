//helper function for scanIsEmpty to organize authMethod validators
const { scanIsEmpty } = require("../../utils/authMethods");

function scanIsEmptyHelper(req, res, next) {
  let userInput = req.body; //let the user input = the body

  const { errorObj } = res.locals;

  //for each user input scan for empty field - if it is, tell user it can't be left empty
  for (let key in userInput) {
    if (scanIsEmpty(userInput[key])) {
      errorObj[key] = `${key} cannot be left empty`;
    }
  }

  //as per validator npm, isEmpty validates input by length of string = 0
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  } else {
    next();
  }
}

module.exports = scanIsEmptyHelper;
