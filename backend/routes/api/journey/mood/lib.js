const {
  returnError,
  checkAuthorization,
} = require("../../../services/error.server");
const { Description, Mood, Origin } = require("../../../../db/models");
const { validBody } = require("./validation");

async function createEntry(req, res) {
  try {
    const { prompt1, createdAt, description, feeling, origin } = validBody(
      req.body
    );

    const newMood = await Mood.create({
      prompt1,
      createdAt,
      feeling,
      userId: req.user.id,
    });

    description.forEach(async (description) => {
      await newMood.createDescription({ value: description });
    });

    origin.forEach(async (origin) => {
      await Origin.create({ moodId: newMood.id, value: origin });
    });

    res.json({
      prompt1,
      createdAt,
      description,
      entryType: 0,
      feeling,
      origin,
    });
  } catch (err) {
    returnError(err, res);
  }
}

async function getEntry(req, res) {
  try {
    const data = await Mood.findOne({
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
  mood: { createEntry, getEntry },
};
