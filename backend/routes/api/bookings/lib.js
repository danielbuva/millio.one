const {
  checkAuthorization,
  invariant,
  throwError,
  returnError,
} = require("../../../services/error.server");
const { validateBooking } = require("../../../services/validation.server");
const { Booking, Spot, SpotImage } = require("../../../db/models");
const { today, remapToAddSpotImage } = require("../../../utils");
const { verifyAuth } = require("../../../services/auth.server");

const getValidBooking = async (req) => {
  const booking = await Booking.findOne({
    attributes: [
      "id",
      "userId",
      "startDate",
      "endDate",
      "spotId",
      "createdAt",
      "updatedAt",
    ],
    where: { id: req.params.bookingId },
  });
  invariant(booking, "Booking couldn't be found");

  return booking;
};

const deleteBookingById = async (req, res) => {
  try {
    const booking = await getValidBooking(req);
    const spot = await Spot.findByPk(booking.spotId);
    invariant(spot);
    checkAuthorization(
      spot.ownerId === req.user.id || booking.userId === req.user.id
    );
    const bookingConflicts =
      booking.startDate <= today() && booking.endDate >= today();

    if (bookingConflicts) {
      throwError(402, "Bookings that have been started can't be deleted");
    }

    await Booking.destroy({ where: { id: req.params.bookingId } });
    return res.json({ message: "Successfully deleted" });
  } catch (err) {
    returnError(err, res);
  }
};

const editBookingById = async (req, res) => {
  try {
    const booking = await getValidBooking(req);
    checkAuthorization(booking.userId === req.user.id);

    await validateBooking(
      booking.startDate,
      booking.endDate,
      booking.spotId,
      booking.id
    );

    await booking.update(req.body);
    res.json(booking);
  } catch (err) {
    returnError(err, res);
  }
};

const getCurrentUsersBookings = async (req, res) => {
  const [bookings, spotImages] = await Promise.all([
    Booking.findAll({
      where: { userId: req.user.id },
      attributes: { include: ["id"] },
      include: [
        {
          model: Spot,
          attributes: {
            exclude: ["createdAt", "updatedAt", "description"],
          },
        },
      ],
    }),
    SpotImage.findAll(),
  ]);

  const Bookings = remapToAddSpotImage(bookings, spotImages);
  res.json({ Bookings });
};

module.exports = {
  bookings: {
    delete: [verifyAuth, deleteBookingById],
    edit: [verifyAuth, editBookingById],
  },
  getCurrentUsersBookings,
};
