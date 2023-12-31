"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Description extends Model {
    static associate(models) {
      Description.belongsTo(models.Mood, {
        foreignKey: "moodId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
      Description.belongsTo(models.NightCheckIn, {
        foreignKey: "nightId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
    }
  }
  Description.init(
    {
      nightId: { type: DataTypes.INTEGER },
      moodId: { type: DataTypes.INTEGER },
      value: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: [
          "angry",
          "anxious",
          "despairful",
          "disgusted",
          "disrespected",
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
          "respected",
        ],
      },
    },
    {
      sequelize,
      modelName: "Description",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "id", "moodId", "nightId", "updatedAt"],
        },
      },
    }
  );
  return Description;
};
