"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mood extends Model {
    static associate(models) {
      Mood.hasMany(models.Description, {
        foreignKey: "moodId",
        otherKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
      Mood.hasMany(models.Origin, {
        foreignKey: "moodId",
        otherKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
      Mood.belongsTo(models.User, {
        foreignKey: "userId",
        otherKey: "id",
      });
    }
  }

  Mood.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      entryType: {
        allowNull: false,
        defaultValue: 2,
        type: DataTypes.INTEGER,
      },
      feeling: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ["0", "1", "2", "3", "4"],
      },
      prompt1: {
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
      defaultScope: {
        attributes: { exclude: ["updatedAt"] },
      },
    }
  );

  return Mood;
};
