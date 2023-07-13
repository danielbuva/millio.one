"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface) => {
    options.tableName = "Users";
    try {
      await queryInterface.bulkInsert(
        options,
        [
          {
            name: "demo",
            email: "demo@user.io",
            hashedPassword: bcrypt.hashSync("password"),
          },
          {
            name: "Bianca",
            email: "chiefyangga@gmail.com",
            hashedPassword: bcrypt.hashSync("696969"),
          },
          {
            name: "Tanya",
            email: "tanyamikaia@gmail.com",
            hashedPassword: bcrypt.hashSync("696969"),
          },
          {
            name: "Laurent",
            email: "laurentlucian@gmail.com",
            hashedPassword: bcrypt.hashSync("696969"),
          },
          {
            name: "Danica",
            email: "daniboo@gmail.com",
            hashedPassword: bcrypt.hashSync("696969"),
          },
        ],
        {}
      );
    } catch (err) {
      console.error(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: {
        [Op.in]: [
          "demo@user.io",
          "chiefyangga@gmail.com",
          "tanyamikaia@gmail.com",
          "laurentlucian@gmail.com",
          "daniboo@gmail.com",
        ],
      },
    });
  },
};
