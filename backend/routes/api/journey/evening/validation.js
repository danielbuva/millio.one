const { throwIfError } = require("../../../services/error.server");

const validBody = ({
  createdAt,
  description,
  origin,
  prepared,
  productive,
  prompt1,
  prompt2,
  rest,
  stress,
}) => {
  let errorResult = { errors: {}, message: "Bad Request", status: 400 };

  if (!createdAt) {
    errorResult.errors.createdAt = "createdAt is Required";
  }

  if (!description) {
    errorResult.errors.description = "Description is required";
  }

  if (!origin) {
    errorResult.errors.origin = "origin is required";
  }

  if (prepared == null) {
    errorResult.errors.prepared = "prepared is required";
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
