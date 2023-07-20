"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NightCheckIn extends Model {
    static associate(models) {
      NightCheckIn.hasMany(models.Description, {
        foreignKey: "nightId",
        otherKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
      NightCheckIn.hasMany(models.Origin, {
        foreignKey: "nightId",
        otherKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
      NightCheckIn.belongsTo(models.User, {
        foreignKey: "userId",
        otherKey: "id",
      });
    }
  }
  NightCheckIn.init(
    {
      userId: { allowNull: false, type: DataTypes.INTEGER },
      entryType: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.INTEGER,
      },
      rest: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      stress: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      productive: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      prompt1: { allowNull: false, type: DataTypes.STRING },
      prompt2: { allowNull: false, type: DataTypes.STRING },
      prepared: { allowNull: false, type: DataTypes.BOOLEAN },
    },
    {
      sequelize,
      modelName: "NightCheckIn",
      defaultScope: {
        attributes: { exclude: ["updatedAt"] },
      },
    }
  );
  return NightCheckIn;
};
