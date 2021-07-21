//helper function to check if the form was left empty -> alerts user w/ message
//checks by scanning the length of the user input, if = to 0, form is empt
function scanIsUndefinedHelper(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(500).json({ message: "Form must be filled out" });
  } else {
    let errorObj = {};
    res.locals.errorObj = errorObj;
    next();
  }
}

module.exports = scanIsUndefinedHelper;
