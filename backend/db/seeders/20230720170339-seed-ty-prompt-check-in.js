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
      "What's one small step you can take towards overcoming a challenge you currently face.",
    version: 7,
  },
  {
    prompt:
      "what do you feel in your body? close your eyes, take a deep breath and focus on how your body feels in this state.",
    version: 8,
  },
  {
    prompt: "What is the best gift that you have ever received?",
    version: 9,
  },
  {
    prompt: "What are you grateful to have in your life and why?",
    version: 10,
  },
  {
    prompt: "What is one thing that made you smile this week?",
    version: 11,
  },
  {
    prompt: "Who is one person in your life that made you feel loved",
    version: 12,
  },
  {
    prompt: "When is the last time you laughed hard?",
    version: 13,
  },
  {
    prompt:
      "What is one thing you love about yourself that no one else notices?",
    version: 14,
  },
  {
    prompt: "Who is someone you admire or look up to?",
    version: 15,
  },
  {
    prompt:
      "Write a letter to someone who you're really happy to have in your life.",
    version: 16,
  },
  {
    prompt: "When is the last time you felt really peaceful?",
    version: 17,
  },
  {
    prompt: "Where is your favorite place in the world?",
    version: 18,
  },
  {
    prompt: "What is the best thing that happened today?",
    version: 19,
  },
  {
    prompt: "Who in your life taught you what you know now?",
    version: 20,
  },
  {
    prompt: "What is your most memorable day?",
    version: 21,
  },
];

let options = { tableName: "TyPrompts" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(options, prompts);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(options);
  },
};
