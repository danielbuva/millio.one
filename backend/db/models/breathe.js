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
      duration: { allowNull: false, type: DataTypes.STRING },
      pace: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ["slower", "neutral", "faster"],
      },
    },
    {
      sequelize,
      modelName: "Breathe",
    }
  );
  return Breathe;
};
