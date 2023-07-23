"use strict";
const bcrypt = require("bcryptjs");

let options = { tableName: "Users" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface) => {
    try {
      await queryInterface.bulkInsert(options, [
        {
          id: 1,
          name: "demo",
          email: "demo@user.io",
          hashedPassword: bcrypt.hashSync("password"),
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: {
        [Op.in]: ["demo@user.io"],
      },
    });
  },
};
