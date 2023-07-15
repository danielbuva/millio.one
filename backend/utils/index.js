const { Op } = require("sequelize");

const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const returnUser = (req, res) => {
  return res.json(req.user);
};

function sortByCreatedAt(entries) {
  return entries.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

module.exports = {
  returnUser,
  sortByCreatedAt,
  today,
};
