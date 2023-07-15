const { sortByCreatedAt } = require("../../../utils");
const { Mood } = require("../../../db/models");

async function getAllEntries(req, res) {
  const userId = req.user.id;
  const moods = await Mood.findAll();

  const entries = sortByCreatedAt(moods);

  res.json(entries);
}

module.exports = {
  getAllEntries,
};
