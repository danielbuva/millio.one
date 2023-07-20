const { returnError } = require("../../services/error.server");
const { flatSortTransform } = require("../../../utils");
const {
  DayCheckIn,
  Description,
  Mood,
  NightCheckIn,
  Origin,
  Breathe,
  OriginPrompt,
} = require("../../../db/models");

async function getAllEntries(req, res) {
  const userId = req.user.id;

  try {
    const data = await Promise.all([
      DayCheckIn.findAll({ where: { userId }, include: [Origin] }),
      NightCheckIn.findAll({
        where: { userId },
        include: [Description, Origin],
      }),
      Mood.findAll({ where: { userId }, include: [Description, Origin] }),
      Breathe.findAll({ where: { userId } }),
    ]);

    const entries = flatSortTransform(data);
    res.json(entries);
  } catch (err) {
    returnError(err, res);
  }
}

async function getPrompt(req, res) {
  try {
    const record = await OriginPrompt.findOne({ where: req.params });
    res.json(record.prompt);
  } catch (err) {
    returnError(err, res);
  }
}

module.exports = {
  getAllEntries,
  getPrompt,
};
