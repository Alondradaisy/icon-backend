const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const ErrorMessageHandlerClass = require("./routes/utils/errorMessageHandlerClass");
const errorController = require("./routes/utils/errorController");
const userRouter = require("./routes/user/userRouter");
const iconFinderRouter = require("./routes/iconFinder/iconFinderRouter");
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/userRouter", userRouter);
app.use("/api/iconFinder", iconFinderRouter);
app.use("/api/questionnaire", questionnaireRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.all("*", function (req, res, next) {
  // * refers to encapsulating and running all http requests
  next(
    new ErrorMessageHandlerClass(
      `Cannot find ${req.originalUrl} on this server. Check your URL!`,
      400
    )
  );
});

app.use(errorController);

module.exports = app;
