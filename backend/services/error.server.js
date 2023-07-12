const { ValidationError } = require("sequelize");
const { isProduction } = require("../config");

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

const validSpot = ({
  address,
  addressNumber,
  city,
  state,
  country,
  name,
  description,
  place,
  price,
  type,
  zipcode,
}) => {
  let errorResult = { errors: {}, message: "Bad Request", status: 400 };
  if (!address) {
    errorResult.errors.address = "Street address is required";
  }
  if (!city) {
    errorResult.errors.city = "City is required";
  }
  if (!state) {
    errorResult.errors.state = "State is Required";
  }
  if (!country) {
    errorResult.errors.country = "Country is required";
  }
  if (!name || (name && name.length > 50)) {
    errorResult.errors.name = "Name must be less than 50 characters";
  }
  if (!description) {
    errorResult.errors.description = "Description is required";
  }
  if (!price || (price && price < 10)) {
    errorResult.errors.price = "Price per day is required";
  }
  if (!zipcode || isNaN(zipcode)) {
    errorResult.errors.price = "Zipcode is required";
  }
  throwIfError(errorResult);
  return {
    address,
    addressNumber,
    city,
    state,
    country,
    name,
    description,
    place,
    price,
    type,
    zipcode,
  };
};

const reviewInvariant = ({ review, stars }) => {
  let errorResult = { errors: {}, message: "Bad Request", status: 400 };
  if (!review || review.trim() === "") {
    errorResult.errors.review = "Review text is required";
  }
  if (!stars || stars > 5 || stars < 1 || !Number.isInteger(stars)) {
    errorResult.errors.stars = "Stars must be an integer from 1 to 5";
  }
  throwIfError(errorResult);
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
  reviewInvariant,
  sqlValidationHandler,
  validSpot,
};
