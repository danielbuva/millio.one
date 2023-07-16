const {
  returnError,
  checkAuthorization,
} = require("../../../services/error.server");
const { DayCheckIn, Origin } = require("../../../../db/models");
const { validBody } = require("./validation");

async function createEntry(req, res) {
  try {
    const {
      createdAt,
      motivation,
      origin,
      prepared,
      prompt1,
      prompt2,
      sleep,
    } = validBody(req.body);

    const newDay = await DayCheckIn.create({
      createdAt,
      motivation,
      prepared,
      prompt1,
      prompt2,
      sleep,
      userId: req.user.id,
    });

    origin.forEach(async (origin) => {
      await Origin.create({ dayId: newDay.id, value: origin });
    });

    res.json({
      createdAt,
      entryType: 1,
      motivation,
      origin,
      prepared,
      prompt1,
      prompt2,
      sleep,
    });
  } catch (err) {
    returnError(err, res);
  }
}

async function deleteEntry(req, res) {
  try {
    await DayCheckIn.destroy({
      where: { userId: req.user.id, id: req.params.id },
    });
    res.json({ message: "success" });
  } catch (err) {
    returnError(err, res);
  }
}

async function getEntry(req, res) {
  try {
    const data = await DayCheckIn.findOne({
      where: { id: req.params.id },
      include: [Origin],
    });

    checkAuthorization(data.userId === req.user.id);
    res.json(data);
  } catch (err) {
    returnError(err, res);
  }
}

module.exports = {
  day: { createEntry, deleteEntry, getEntry },
};
