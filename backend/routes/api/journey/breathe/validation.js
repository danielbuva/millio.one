const { throwIfError } = require("../../../services/error.server");

const validBody = ({ duration, pace }) => {
  let errorResult = { errors: {}, message: "Bad Request", status: 400 };
  if (!duration) {
    errorResult.errors.duration = "duration is required";
  }
  if (!pace) {
    errorResult.errors.pace = "pace is required";
  }
  throwIfError(errorResult);

  return { duration, pace };
};

module.exports = { validBody };
