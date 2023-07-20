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

async function deleteEntry(req, res) {
  try {
    await Mood.destroy({
      where: { userId: req.user.id, id: req.params.id },
    });
    res.json({ message: "success" });
  } catch (err) {
    returnError(err, res);
  }
}

async function getEntry(req, res) {
  const id = req.params.id;
  try {
    const [entry, Descriptions, Origins] = await Promise.all([
      Mood.findByPk(id),
      Description.findAll({ where: { moodId: id } }),
      Origin.findAll({ where: { moodId: id } }),
    ]);

    checkAuthorization(entry.userId === req.user.id);

    res.json({
      ...entry.toJSON(),
      Origins,
      Descriptions,
    });
  } catch (err) {
    returnError(err, res);
  }
}

async function updateEntry(req, res) {
  try {
    const { prompt1, description, feeling, origin } = validBody(
      req.body,
      true
    );

    const entry = await Mood.findOne({
      where: { userId: req.user.id, id: req.params.id },
      include: [Description, Origin],
    });

    await Promise.all([
      entry.update({
        prompt1,
        feeling,
      }),
      Description.destroy({ where: { moodId: req.params.id } }),
      Origin.destroy({ where: { moodId: req.params.id } }),
    ]).then(async () => {
      await entry.save();

      description.forEach(async (description) => {
        await entry.createDescription({ value: description });
      });

      origin.forEach(async (origin) => {
        await entry.createOrigin({ value: origin });
      });
    });
    res.json(entry);
  } catch (err) {
    returnError(err, res);
  }
}

async function getAverageMood(req, res) {
  try {
    const moods = await Mood.findAll({
      where: { userId: req.user.id },
      attributes: ["feeling"],
    });

    let sum = 0;
    for (let i = 0; i < moods.length; i++) {
      sum += parseInt(moods[i].feeling);
    }

    res.json(sum / moods.length);
  } catch (err) {
    returnError(err, res);
  }
}

module.exports = {
  mood: {
    createEntry,
    deleteEntry,
    getAverageMood,
    getEntry,
    updateEntry,
  },
};
