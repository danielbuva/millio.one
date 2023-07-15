"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DayCheckIn extends Model {
    static associate(models) {
      DayCheckIn.hasMany(models.Origin, {
        // what do you want to focus on?
        foreignKey: "dayId",
        otherKey: "id",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  DayCheckIn.init(
    {
      userId: { allowNull: false, type: DataTypes.INTEGER },
      entryType: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },
      sleep: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: [0, 1, 2, 3, 4],
      },
      motivation: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: [0, 1, 2, 3, 4],
      },
      prompt1: { allowNull: false, type: DataTypes.STRING },
      prompt2: { allowNull: false, type: DataTypes.STRING },
      prepared: { allowNull: false, type: DataTypes.BOOLEAN },
    },
    {
      sequelize,
      modelName: "DayCheckIn",
      defaultScope: {
        attributes: { exclude: ["updatedAt"] },
      },
    }
  );
  return DayCheckIn;
};