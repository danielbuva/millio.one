"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TyPrompt extends Model {
    static associate(models) {}
  }
  TyPrompt.init(
    {
      prompt: DataTypes.STRING,
      version: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TyPrompt",
    }
  );
  return TyPrompt;
};
