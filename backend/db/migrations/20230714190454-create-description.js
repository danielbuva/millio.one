"use strict";

let options = {};
if (process.env.NODE_ENV === "production" && process.env.SCHEMA) {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Descriptions",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
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
            "angry",
            "anxious",
            "despairful",
            "disgusted",
            "disrespectfed",
            "embarrassed",
            "fearful",
            "frustrated",
            "grieved",
            "rejected",
            "shameful",
            "annoyed",
            "guilty",
            "insecure",
            "jealous",
            "let down",
            "lonely",
            "nervous",
            "overwhelmed",
            "pessimistic",
            "sad",
            "shocked",
            "unfulfilled",
            "unmotivated",
            "weak",
            "worried",
            "awkward",
            "bored",
            "busy",
            "confused",
            "critiqued",
            "desire",
            "distracted",
            "impatient",
            "suspicious",
            "tired",
            "unsure",
            "appreciated",
            "calm",
            "comfortable",
            "curious",
            "grateful",
            "inspired",
            "motivated",
            "nostalgic",
            "optimistic",
            "relieved",
            "satisfied",
            "surprised",
            "brave",
            "confident",
            "creative",
            "excited",
            "free",
            "happy",
            "love",
            "proud",
            "rejected"
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
    options.tableName = "Descriptions";
    await queryInterface.dropTable(options);
  },
};
