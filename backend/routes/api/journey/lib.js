const { flatSortTransform } = require("../../../utils");
const {
  DayCheckIn,
  Description,
  Mood,
  NightCheckIn,
  Origin,
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
    ]);

    const entries = flatSortTransform(data);
    res.json(entries);
  } catch (err) {
    returnError(err, res);
  }
}

module.exports = {
  getAllEntries,
};
