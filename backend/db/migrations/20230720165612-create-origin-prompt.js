"use strict";

let options = {};
if (process.env.NODE_ENV === "production" && process.env.SCHEMA) {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "OriginPrompts",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        prompt: {
          type: Sequelize.STRING(200),
        },
        type: {
          type: Sequelize.ENUM(
            "work",
            "relaxing",
            "family",
            "friends",
            "date",
            "pet",
            "fitness",
            "self-care",
            "partner",
            "learning",
            "school",
            "travel",
            "nature",
            "party",
            "music",
            "gaming",
            "shopping",
            "eating",
            "cleaning",
            "creativity",
            "spirituality",
            "time alone",
            "helping others",
            "health"
          ),
        },
        version: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface) {
    options.tableName = "OriginPrompts";
    await queryInterface.dropTable("OriginPrompts");
  },
};
