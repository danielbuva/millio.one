const { flattenAndSortByCreatedAt } = require("../../../utils");
const {
  DayCheckIn,
  Description,
  Mood,
  NightCheckIn,
  Origin,
} = require("../../../db/models");

async function getAllEntries(req, res) {
  const userId = req.user.id;

  const data = await Promise.all([
    DayCheckIn.findAll({ where: { userId }, include: [Origin] }),
    NightCheckIn.findAll({
      where: { userId },
      include: [Description, Origin],
    }),
    Mood.findAll({ where: { userId }, include: [Description, Origin] }),
  ]);

  const entries = flattenAndSortByCreatedAt(data);

  res.json(entries);
}

module.exports = {
  getAllEntries,
};
