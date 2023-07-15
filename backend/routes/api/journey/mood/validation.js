const { throwIfError } = require("../../../services/error.server");

const validBody = ({
  createdAt,
  description,
  feeling,
  origin,
  prompt1,
}) => {
  let errorResult = { errors: {}, message: "Bad Request", status: 400 };

  if (!createdAt) {
    errorResult.errors.createdAt = "createdAt is Required";
  }

  if (!description) {
    errorResult.errors.description = "Description is required";
  }

  if (isNaN(feeling)) {
    errorResult.errors.feeling = "feeling is required";
  }

  if (!origin) {
    errorResult.errors.origin = "origin is required";
  }

  if (!prompt1 || prompt1.length < 1) {
    errorResult.errors.prompt1 = "prompt1 is required";
  }

  throwIfError(errorResult);

  return { createdAt, description, feeling, origin, prompt1 };
};

module.exports = {
  validBody,
};
