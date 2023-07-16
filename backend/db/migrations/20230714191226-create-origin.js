"use strict";

let options = {};
if (process.env.NODE_ENV === "production" && process.env.SCHEMA) {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Origins",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        dayId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "DayCheckIns",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        nightId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "NightCheckIns",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        moodId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "Moods",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        value: {
          allowNull: false,
          type: Sequelize.ENUM(
            "work",
            "relaxing",
            "family",
            "friends",
            "dating",
            "pets",
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
    options.tableName = "Origins";
    await queryInterface.dropTable(options);
  },
};
