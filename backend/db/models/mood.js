"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mood extends Model {
    static associate(models) {
      Mood.hasMany(models.Description, {
        foreignKey: "moodId",
        onDelete: "CASCADE",
        hooks: true,
      });

      Mood.hasMany(models.Origin, {
        foreignKey: "moodId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }

  Mood.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      feeling: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: [0, 1, 2, 3, 4],
      },
      body: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Mood",
    }
  );

  return Mood;
};
