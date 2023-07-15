const { throwIfError } = require("../../../services/error.server");

const validBody = ({
  createdAt,
  origin,
  prepared,
  prompt1,
  prompt2,
  sleep,
  motivation,
}) => {
  let errorResult = { errors: {}, message: "Bad Request", status: 400 };

  if (!createdAt) {
    errorResult.errors.createdAt = "createdAt is Required";
  }

  if (!origin) {
    errorResult.errors.origin = "origin is required";
  }

  if (!prepared) {
    errorResult.errors.prepared = "prepared is required";
  }

  if (!prompt1 || prompt1.length < 1) {
    errorResult.errors.prompt1 = "prompt1 is required";
  }

  if (!prompt2 || prompt2.length < 1) {
    errorResult.errors.prompt2 = "prompt2 is required";
  }

  if (!sleep || isNaN(sleep)) {
    errorResult.errors.sleep = "sleep is required";
  }

  if (!motivation || isNaN(motivation)) {
    errorResult.errors.motivation = "motivation is required";
  }

  throwIfError(errorResult);

  return {
    createdAt,
    origin,
    prepared,
    prompt1,
    prompt2,
    sleep,
    motivation,
  };
};

module.exports = {
  validBody,
};
