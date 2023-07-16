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

  if (!description || description.length < 1) {
    errorResult.errors.description = "description is required";
  } else if (description.length > 3) {
    errorResult.errors.description = "select up to 3";
  }

  if (isNaN(feeling)) {
    errorResult.errors.feeling = "feeling is required";
  }

  if (!origin || origin.length < 1) {
    errorResult.errors.origin = "origin is required";
  } else if (origin.length > 3) {
    errorResult.errors.description = "select up to 3";
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
