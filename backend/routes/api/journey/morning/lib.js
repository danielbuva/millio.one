const {
  returnError,
  checkAuthorization,
} = require("../../../services/error.server");
const {
  DayCheckIn,
  Origin,
  OriginPrompt,
  TyPrompt,
} = require("../../../../db/models");
const { validBody } = require("./validation");

async function createEntry(req, res) {
  try {
    const {
      createdAt,
      motivation,
      origin,
      prepared,
      tyPrompt,
      prompt1,
      prompt2,
      sleep,
    } = validBody(req.body);

    const newDay = await DayCheckIn.create({
      createdAt,
      motivation,
      prepared,
      tyPrompt,
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
  const id = req.params.id;
  try {
    const [entry, Origins] = await Promise.all([
      DayCheckIn.findByPk(id),
      Origin.findAll({ where: { dayId: id } }),
    ]);

    checkAuthorization(entry.userId === req.user.id);

    const record = await OriginPrompt.findOne({
      where: { type: Origins[Origins.length - 1].value, version: 0 },
    });

    const tyrecord = await TyPrompt.findOne({
      where: { version: entry.tyPrompt },
    });

    res.json({
      ...entry.toJSON(),
      Origins,
      createdAt: new Date(entry.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      prompt: record.prompt,
      tyPrompt: tyrecord.prompt,
    });
  } catch (err) {
    returnError(err, res);
  }
}

async function updateEntry(req, res) {
  try {
    const { motivation, origin, prepared, prompt1, prompt2, sleep } =
      validBody(req.body, true);

    const entry = await DayCheckIn.findOne({
      where: { userId: req.user.id, id: req.params.id },
      include: [Origin],
    });

    await Promise.all([
      entry.update({
        motivation,
        prepared,
        prompt1,
        prompt2,
        sleep,
      }),
      Origin.destroy({ where: { dayId: req.params.id } }),
    ]).then(async () => {
      await entry.save();

      origin.forEach(async (origin) => {
        await entry.createOrigin({ value: origin });
      });
    });
  } catch (err) {
    returnError(err, res);
  }
}

module.exports = {
  day: { createEntry, deleteEntry, getEntry, updateEntry },
};
