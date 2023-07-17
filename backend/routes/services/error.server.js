const { ValidationError } = require("sequelize");
const { isProduction } = require("../../config");

const invariant = (condition, message = "Spot couldn't be found") => {
  if (!condition) {
    throw { status: 404, title: "Resource Not Found", message };
  }
};

const notFoundHandler = (_, __, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
};

const sqlValidationHandler = (err, _, __, next) => {
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = "Validation error";
    err.errors = errors;
  }
  next(err);
};

const errorFormatter = (err, _, res, __) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
};

const checkAuthorization = (condition) => {
  if (!condition) {
    throw { status: 403, message: "Forbidden" };
  }
};

const throwIfError = (result) => {
  if (Object.keys(result.errors).length > 0) {
    throw result;
  }
};

const throwError = (status, message) => {
  const error = new Error();
  error.message = message;
  error.status = status;
  throw error;
};

const returnError = (err, res) => {
  if (!err) {
    throw Error("return error function needs error object");
  }
  if (!res) {
    throw Error("return error function needs response object");
  }
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "server error oops",
    errors: err.errors || undefined,
  });
};

module.exports = {
  checkAuthorization,
  throwError,
  throwIfError,
  errorFormatter,
  invariant,
  notFoundHandler,
  returnError,
  sqlValidationHandler,
};
