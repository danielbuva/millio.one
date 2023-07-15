const { Op } = require("sequelize");

const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const returnUser = (req, res) => {
  return res.json(req.user);
};

function flattenAndSortByCreatedAt(arrays) {
  const mergedArray = arrays.reduce(
    (result, array) => result.concat(array),
    []
  );

  mergedArray.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return mergedArray;
}

module.exports = {
  returnUser,
  flattenAndSortByCreatedAt,
  today,
};
