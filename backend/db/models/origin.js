"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Origin extends Model {
    static associate(models) {
      Origin.belongsTo(models.Mood, {
        foreignKey: "moodId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
      Origin.belongsTo(models.DayCheckIn, {
        foreignKey: "dayId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
      Origin.belongsTo(models.NightCheckIn, {
        foreignKey: "nightId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
    }
  }

  Origin.init(
    {
      moodId: { type: DataTypes.INTEGER },
      dayId: { type: DataTypes.INTEGER },
      nightId: { type: DataTypes.INTEGER },
      value: {
        type: DataTypes.ENUM,
        values: [
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
          "health",
        ],
      },
    },
    {
      sequelize,
      modelName: "Origin",
      defaultScope: {
        attributes: {
          exclude: [
            "createdAt",
            "dayId",
            "id",
            "moodId",
            "nightId",
            "updatedAt",
          ],
        },
      },
    }
  );

  return Origin;
};
