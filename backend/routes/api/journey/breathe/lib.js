const {
  returnError,
  checkAuthorization,
} = require("../../../services/error.server");
const { Breathe } = require("../../../../db/models");
const { validBody } = require("./validation");

async function createEntry(req, res) {
  try {
    const { duration, pace } = validBody(req.body);

    const entry = await Breathe.create({
      duration,
      pace,
      userId: req.user.id,
    });

    res.json({
      createdAt: new Date(entry.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      duration,
      entryType: 3,
      pace,
    });
  } catch (err) {
    returnError(err, res);
  }
}

async function deleteEntry(req, res) {
  try {
    await Breathe.destroy({
      where: { userId: req.user.id, id: req.params.id },
    });
    res.json({ message: "success" });
  } catch (err) {
    returnError(err, res);
  }
}

async function getEntry(req, res) {
  try {
    const entry = await Breathe.findByPk(req.params.id);
    checkAuthorization(entry.userId === req.user.id);

    res.json(entry);
  } catch (err) {
    returnError(err, res);
  }
}

module.exports = {
  breathe: {
    createEntry,
    deleteEntry,
    getEntry,
  },
};
