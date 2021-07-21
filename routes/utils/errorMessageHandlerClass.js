//error class from node
// shorthand errorMess... func that extends err properties

class errorMessageHandlerClass extends Error {
  constructor(message, statusCode) {
    super(message, statusCode);

    this.statusCode = statusCode; //status code may change based on operation
    this.status = `${statusCode}`.startWith("4") ? "fail" : "error"; //404 err
    this.isOperational = true;

    console.log(this); //console current execution -> THIS = keyword
  }
}

module.exports = errorMessageHandlerClass;
