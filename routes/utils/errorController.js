const errorMessageHandlerClass = require("./errorMessageHandlerClass");
//the errorMessageHandlerClass is the shortcut that makes it so we don't have to type out the whole err

function dispatchErrorDevelopment(err, req, res) {
  if (req.originalUrl.startWith("/api")) {
    return res.status(error.statusCode).json({
      status: error.status,
      error: error,
      message: error.message,
      stack: error.stack,
    });
  }
}

function dispatchErrorProduction(err, req, res) {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }
    return res.status(error.status).json({
      status: "Error",
      message:
        "Something went wrong with the request. Please contact support via email at xxx@gmail.com",
    });
  }
}

function handleMongoDBDuplicate(err) {
  console.log(err);

  let errorMessageDuplicateKey = Object.keys(err.keyValue)[0]; //grabs the object's keys -> turns to arr

  let errorMessageDuplicateValue = Object.values(err.keyValue)[0]; //grabs the object's values -> turns to arr

  console.log(errorMessageDuplicateKey);
  console.log(errorMessageDuplicateValue);

  let message = `${errorMessageDuplicateKey} - ${errorMessageDuplicateValue} is already taken. Choose another.`;

  return new errorMessageHandlerClass(message, 400);
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };

  error.message = err.message;

  if (error.code === 11000 || error.code === 11001) {
    error + handleMongoDBDuplicate(error);
  }

  console.log("7");
  console.log(error);
  if (process.env.NODE_ENV === "development") {
    dispatchErrorDevelopment(error, req, res);
  } else {
    dispatchErrorProduction(error, req, res);
  }
};
