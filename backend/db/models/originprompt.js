"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OriginPrompt extends Model {
    static associate(models) {}
  }
  OriginPrompt.init(
    {
      prompt: { allowNull: false, type: DataTypes.STRING },
      type: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: [
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
          "health",
        ],
      },
      version: { allowNull: false, type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "OriginPrompt",
    }
  );
  return OriginPrompt;
};
