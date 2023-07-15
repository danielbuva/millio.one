"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Origin extends Model {
    static associate(models) {
      Origin.belongsTo(models.Mood, { foreignKey: "moodId" });
      // Origin.belongsTo(models.DayCheckIn, { foreignKey: "dayId" });
      // Origin.belongsTo(models.NightCheckIn, { foreignKey: "nightId" });
    }
  }

  Origin.init(
    {
      moodId: { type: DataTypes.INTEGER },
      dayId: { type: DataTypes.INTEGER },
      nightId: { type: DataTypes.INTEGER },
      origin: {
        type: DataTypes.ENUM,
        values: [
          "work",
          "relaxing",
          "family",
          "friends",
          "date",
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
          "creativty",
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
    }
  );

  return Origin;
};
