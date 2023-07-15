const { returnError } = require("../../../services/error.server");
const { NightCheckIn, Origin } = require("../../../../db/models");
const { validBody } = require("./validation");

async function createEntry(req, res) {
  try {
    const {
      createdAt,
      description,
      origin,
      prepared,
      productivity,
      prompt1,
      prompt2,
      rest,
      stress,
    } = validBody(req.body);

    const newNight = await NightCheckIn.create({
      createdAt,
      productivity,
      prompt1,
      prompt2,
      rest,
      stress,
      userId: req.user.id,
    });

    description.forEach(async (description) => {
      await newNight.createDescription({ description });
    });

    origin.forEach(async (origin) => {
      await Origin.create({ nightId: newNight.id, origin });
    });

    res.json({
      createdAt,
      description,
      entryType: 1,
      origin,
      prepared,
      productivity,
      prompt1,
      prompt2,
      rest,
      stress,
    });
  } catch (err) {
    returnError(err, res);
  }
}

module.exports = {
  night: { createEntry },
};
