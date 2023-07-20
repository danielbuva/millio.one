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
        onUpdate: "CASCADE",
        hooks: true,
      });
      DayCheckIn.belongsTo(models.User, {
        foreignKey: "userId",
        otherKey: "id",
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
        type: DataTypes.INTEGER,
      },
      motivation: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
