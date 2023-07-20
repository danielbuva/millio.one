"use strict";

const prompts = [
  {
    prompt: "What personal achievements are you grateful for?",
    version: 0,
  },
  {
    prompt: "Are you generous with compliments?",
    version: 1,
  },
  {
    prompt: "Do you think there's a cure for daily frustrations?",
    version: 2,
  },
  {
    prompt:
      "Is there something positive that happened to you recently that made you feel more fortunate.",
    version: 3,
  },
  {
    prompt:
      "What are four actions you can take to make another person happy? ",
    version: 4,
  },
  {
    prompt: "What top three things/people make your home feel special?",
    version: 5,
  },
  {
    prompt: "What are your favorite meals you enjoy eating or cooking?",
    version: 6,
  },
  {
    prompt:
      "What's one small step you can take towards overcoming a challenge you currently face. ",
    version: 7,
  },
];

let options = { tableName: "TyPrompts" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, prompts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options);
  },
};
