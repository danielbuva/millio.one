"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Breathe extends Model {
    static associate(models) {
      Breathe.belongsTo(models.User, {
        foreignKey: "userId",
        otherKey: "id",
      });
    }
  }
  Breathe.init(
    {
      userId: { allowNull: false, type: DataTypes.INTEGER },
      duration: { allowNull: false, type: DataTypes.INTEGER },
      pace: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      entryType: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 3,
      },
    },
    {
      sequelize,
      modelName: "Breathe",
    }
  );
  return Breathe;
};
