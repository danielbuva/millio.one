const { throwIfError } = require("../../../services/error.server");

const validBody = ({
  createdAt,
  description,
  origin,
  prepared,
  productivity,
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

  if (!prepared) {
    errorResult.errors.prepared = "prepared is required";
  }

  if (!productivity || isNaN(productivity)) {
    errorResult.errors.productivity = "productivity is required";
  }

  if (!prompt1 || prompt1.length < 1) {
    errorResult.errors.prompt1 = "prompt1 is required";
  }

  if (!prompt2 || prompt2.length < 1) {
    errorResult.errors.prompt2 = "prompt2 is required";
  }

  if (!rest || isNaN(rest)) {
    errorResult.errors.rest = "rest is required";
  }

  if (!stress || isNaN(stress)) {
    errorResult.errors.stress = "stress is required";
  }

  throwIfError(errorResult);

  return {
    createdAt,
    description,
    origin,
    prepared,
    productivity,
    prompt1,
    prompt2,
    rest,
    stress,
  };
};

module.exports = {
  validBody,
};
