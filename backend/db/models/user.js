"use strict";
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.DayCheckIn, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });
      User.hasMany(models.NightCheckIn, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });
      User.hasMany(models.Mood, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }

  User.init(
    {
      mute: { type: DataTypes.BOOLEAN, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 256],
            msg: "email must be at least 3 characters",
          },
          isEmail: {
            args: true,
            msg: "please provide a valid email address",
          },
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
    }
  );
  return User;
};
