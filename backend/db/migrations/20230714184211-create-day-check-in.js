"use strict";

let options = {};
if (process.env.NODE_ENV === "production" && process.env.SCHEMA) {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "DayCheckIns",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        entryType: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER,
        },
        sleep: {
          allowNull: false,
          type: Sequelize.ENUM("0", "1", "2", "3", "4"),
        },
        motivation: {
          allowNull: false,
          type: Sequelize.ENUM("0", "1", "2", "3", "4"),
        },
        prompt1: {
          allowNull: false,
          type: Sequelize.STRING(600),
        },
        prompt2: {
          allowNull: false,
          type: Sequelize.STRING(600),
        },
        prepared: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
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
    options.tableName = "DayCheckIns";
    await queryInterface.dropTable(options);
  },
};
