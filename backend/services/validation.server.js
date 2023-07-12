const { validationResult } = require("express-validator");
const { throwIfError, throwError } = require("./error.server");
const { Booking } = require("../db/models");
const { setOptions, today } = require("../utils");
const { Op } = require("sequelize");

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.param] = error.msg));

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateQuery = ({
  page,
  size,
  minLat,
  maxLat,
  minLng,
  maxLng,
  minPrice,
  maxPrice,
}) => {
  let errorResult = { errors: {}, message: "Bad Request", status: 400 };
  if (page && page < 1) {
    errorResult.errors.page = "Page must be greater than or equal to 1";
  }
  if (size && size < 1) {
    errorResult.errors.size = "Size must be greater than or equal to 1";
  }
  if (maxLat && isNaN(parseInt(maxLat))) {
    errorResult.errors.maxLat = "Maximum latitude is invalid";
  }
  if (minLat && isNaN(parseInt(minLat))) {
    errorResult.errors.minLat = "Minimum latitude is invalid";
  }
  if (minLng && isNaN(parseInt(minLng))) {
    errorResult.errors.minLng = "Minimum longitude is invalid";
  }
  if (maxLng && isNaN(parseInt(maxLng))) {
    errorResult.errors.maxLng = "Maximum longitude is invalid";
  }
  if (minPrice && minPrice < 0) {
    errorResult.errors.minPrice =
      "Minimum price must be greater than or equal to 0";
  }
  if (maxPrice && maxPrice < 0) {
    errorResult.errors.maxPrice =
      "Maximum price must be greater than or equal to 0";
  }
  throwIfError(errorResult);

  return setOptions({
    page,
    size,
    minLat,
    maxLat,
    minLng,
    maxLng,
    minPrice,
    maxPrice,
  });
};

const validateBooking = async (startDate, endDate, spotId, bookingId) => {
  if (bookingId && endDate <= today()) {
    throwError(403, "Past bookings can't be modified");
  }

  if (startDate >= endDate) {
    throw {
      message: "Bad Request",
      status: 400,
      errors: { endDate: "endDate cannot be on or before startDate" },
    };
  }

  let errorResult = {
    errors: {},
    message: "Sorry, this spot is already booked for the specified dates",
    status: 403,
  };

  let where = { spotId };
  if (bookingId) {
    where = { spotId, [Op.not]: bookingId };
  }

  const bookingsBySpotId = await Booking.findAll({ where });

  for (let i = 0; i < bookingsBySpotId.length; i++) {
    let booking = bookingsBySpotId[i];
    const startDateConflicts =
      startDate >= booking.startDate && startDate <= booking.endDate;
    const endDateConflicts =
      endDate <= booking.endDate && endDate >= booking.startDate;
    const bothDateConflicts =
      endDate >= booking.endDate && startDate <= booking.startDate;
    if (startDateConflicts) {
      errorResult.errors.startDate =
        "Start date conflicts with an existing booking";
    }
    if (endDateConflicts) {
      errorResult.errors.endDate =
        "End date conflicts with an existing booking";
    }
    if (bothDateConflicts) {
      errorResult.errors.startDate =
        "Start date conflicts with an existing booking";
      errorResult.errors.endDate =
        "End date conflicts with an existing booking";
    }
    throwIfError(errorResult);
  }
};

module.exports = {
  handleValidationErrors,
  validateBooking,
  validateQuery,
};
