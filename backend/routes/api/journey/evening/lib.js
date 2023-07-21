const {
  returnError,
  checkAuthorization,
} = require("../../../services/error.server");
const {
  Description,
  NightCheckIn,
  Origin,
  OriginPrompt,
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
      id: newNight.id,
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
  const id = req.params.id;
  try {
    const [entry, Descriptions, Origins] = await Promise.all([
      NightCheckIn.findByPk(id),
      Description.findAll({ where: { nightId: id } }),
      Origin.findAll({ where: { nightId: id } }),
    ]);

    const record = await OriginPrompt.findOne({
      where: { type: Origins[Origins.length - 1].value, version: 1 },
    });

    checkAuthorization(entry.userId === req.user.id);

    res.json({
      ...entry.toJSON(),
      Origins,
      Descriptions,
      prompt: record.prompt,
    });
  } catch (err) {
    returnError(err, res);
  }
}

async function updateEntry(req, res) {
  try {
    const {
      description,
      origin,
      prepared,
      productive,
      prompt1,
      prompt2,
      rest,
      stress,
    } = validBody(req.body, true);

    const entry = await NightCheckIn.findOne({
      where: { userId: req.user.id, id: req.params.id },
      include: [Description, Origin],
    });

    await Promise.all([
      entry.update({
        prepared,
        productive,
        prompt1,
        prompt2,
        rest,
        stress,
      }),
      Description.destroy({ where: { nightId: req.params.id } }),
      Origin.destroy({ where: { nightId: req.params.id } }),
    ]).then(async () => {
      await entry.save();

      description.forEach(async (description) => {
        await entry.createDescription({ value: description });
      });

      origin.forEach(async (origin) => {
        await entry.createOrigin({ value: origin });
      });
    });
    res.json({
      ...entry.toJSON(),
      Origins: origin.map((o) => ({ value: o })),
      createdAt: new Date(entry.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    });
  } catch (err) {
    returnError(err, res);
  }
}

async function addPrepared(req, res) {
  try {
    const entry = await NightCheckIn.findOne({
      where: { id: req.params.id },
    });
    entry.prepared = req.body.prepared;
    await entry.save();
    res.json({ message: "success" });
  } catch (err) {
    returnError(err, res);
  }
}

module.exports = {
  night: { addPrepared, createEntry, deleteEntry, getEntry, updateEntry },
};
