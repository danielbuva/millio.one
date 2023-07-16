const {
  returnError,
  checkAuthorization,
} = require("../../../services/error.server");
const {
  Description,
  NightCheckIn,
  Origin,
} = require("../../../../db/models");
const { validBody } = require("./validation");

async function createEntry(req, res) {
  try {
    const {
      createdAt,
      description,
      origin,
      prepared,
      productive,
      prompt1,
      prompt2,
      rest,
      stress,
    } = validBody(req.body);

    const newNight = await NightCheckIn.create({
      createdAt,
      prepared,
      productive,
      prompt1,
      prompt2,
      rest,
      stress,
      userId: req.user.id,
    });

    description.forEach(async (description) => {
      await newNight.createDescription({ value: description });
    });

    origin.forEach(async (origin) => {
      await Origin.create({ nightId: newNight.id, value: origin });
    });

    res.json({
      createdAt,
      description,
      entryType: 1,
      origin,
      prepared,
      productive,
      prompt1,
      prompt2,
      rest,
      stress,
    });
  } catch (err) {
    returnError(err, res);
  }
}

async function deleteEntry(req, res) {
  try {
    await NightCheckIn.destroy({
      where: { userId: req.user.id, id: req.params.id },
    });
  } catch (err) {
    returnError(err, res);
  }
}

async function getEntry(req, res) {
  try {
    const data = await NightCheckIn.findOne({
      where: { id: req.params.id },
      include: [Description, Origin],
    });
    checkAuthorization(data.userId === req.user.id);
    res.json(data);
  } catch (err) {
    returnError(err, res);
  }
}

module.exports = {
  night: { createEntry, deleteEntry, getEntry },
};
