const { throwIfError } = require("../../../services/error.server");

const validBody = ({ body, createdAt, description, feeling, origin }) => {
  let errorResult = { errors: {}, message: "Bad Request", status: 400 };

  if (!body || body.length < 1) {
    errorResult.errors.body = "body is required";
  }

  if (!createdAt) {
    errorResult.errors.createdAt = "createdAt is Required";
  }

  if (!description) {
    errorResult.errors.description = "Description is required";
  }

  if (!feeling || isNaN(feeling)) {
    errorResult.errors.feeling = "feeling is required";
  }

  if (!origin) {
    errorResult.errors.origin = "origin is required";
  }

  throwIfError(errorResult);

  return { body, createdAt, description, feeling, origin };
};

module.exports = {
  validBody,
};
