const { throwIfError } = require("../../../services/error.server");

const validBody = (
  {
    createdAt,
    description,
    origin,
    prepared,
    productive,
    prompt1,
    prompt2,
    rest,
    stress,
  },
  isEditing = false
) => {
  let errorResult = { errors: {}, message: "Bad Request", status: 400 };

  if (!isEditing && !createdAt) {
    errorResult.errors.createdAt = "createdAt is Required";
  }

  if (!description || description.length < 1) {
    errorResult.errors.description = "description is required";
  } else if (description.length > 3) {
    errorResult.errors.description = "select up to 3";
  }

  if (!origin || origin.length < 1) {
    errorResult.errors.origin = "origin is required";
  } else if (origin.length > 3) {
    errorResult.errors.description = "select up to 3";
  }

  if (isNaN(productive)) {
    errorResult.errors.productive = "productive is required";
  }

  if (!prompt1 || prompt1.length < 1) {
    errorResult.errors.prompt1 = "prompt1 is required";
  }

  if (!prompt2 || prompt2.length < 1) {
    errorResult.errors.prompt2 = "prompt2 is required";
  }

  if (isNaN(rest)) {
    errorResult.errors.rest = "rest is required";
  }

  if (isNaN(stress)) {
    errorResult.errors.stress = "stress is required";
  }

  throwIfError(errorResult);

  return {
    createdAt,
    description,
    origin,
    prepared,
    productive,
    prompt1,
    prompt2,
    rest,
    stress,
  };
};

module.exports = {
  validBody,
};
