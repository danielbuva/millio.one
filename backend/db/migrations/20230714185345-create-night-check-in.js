"use strict";

let options = {};
if (process.env.NODE_ENV === "production" && process.env.SCHEMA) {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "NightCheckIns",
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
          defaultValue: 1,
          type: Sequelize.INTEGER,
        },
        rest: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        stress: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        productive: {
          allowNull: false,
          type: Sequelize.INTEGER,
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
    options.tabelName = "NightCheckIns";
    await queryInterface.dropTable(options);
  },
};
