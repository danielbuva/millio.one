const { validBody } = require("./validation");
const { Description, Mood, Origin } = require("../../../../db/models");
const { returnError } = require("../../../services/error.server");

async function createMoodCheckIn(req, res) {
  try {
    console.log("[REQUEST user id]: ", req.user.id);
    const { body, createdAt, description, feeling, origin } = validBody(
      req.body
    );

    const newMood = await Mood.create({
      body,
      createdAt,
      feeling,
      userId: req.user.id,
    });

    description.forEach(async (description) => {
      await newMood.createDescription({ description });
    });

    origin.forEach(async (origin) => {
      await Origin.create({ moodId: newMood.id, origin });
    });

    res.json({
      body,
      createdAt,
      description,
      feeling,
      origin,
      type: "mood",
    });
  } catch (err) {
    returnError(err, res);
  }
}

module.exports = {
  mood: { createMoodCheckIn },
};
