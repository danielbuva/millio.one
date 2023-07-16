const { returnError } = require("../../../services/error.server");
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

async function getEntry(req, res) {
  const data = await DayCheckIn.findOne({
    where: { id: req.params.id },
    include: [Origin],
  });
  res.json(data);
}

module.exports = {
  day: { createEntry, getEntry },
};
