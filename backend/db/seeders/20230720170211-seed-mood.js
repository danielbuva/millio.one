"use strict";

let options = { tableName: "Moods" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const entries = [
  {
    id: 1,
    userId: 1,
    feeling: 4,
    tyPrompt: 10,
    prompt1: "explain how/why/what/when/where you felt here.",
    prompt2: "answer gratitude prompt here.",
    createdAt: new Date("July 12, 2023 14:32:00"),
  },
  {
    id: 2,
    userId: 1,
    feeling: 4,
    tyPrompt: 11,
    prompt1: "explain how/why/what/when/where you felt here.",
    prompt2: "answer gratitude prompt here.",
    createdAt: new Date("July 13, 2023 17:06:00"),
  },
  {
    id: 3,
    userId: 1,
    feeling: 3,
    tyPrompt: 12,
    prompt1: "explain how/why/what/when/where you felt here.",
    prompt2: "answer gratitude prompt here.",
    createdAt: new Date("July 14, 2023 12:41:00"),
  },
  {
    id: 4,
    userId: 1,
    feeling: 3,
    tyPrompt: 13,
    prompt1: "explain how/why/what/when/where you felt here.",
    prompt2: "answer gratitude prompt here.",
    createdAt: new Date("July 15, 2023 13:55:00"),
  },
  {
    id: 5,
    userId: 1,
    feeling: 3,
    tyPrompt: 14,
    prompt1: "explain how/why/what/when/where you felt here.",
    prompt2: "answer gratitude prompt here.",
    createdAt: new Date("July 16, 2023 15:27:00"),
  },
  {
    id: 6,
    userId: 1,
    feeling: 2,
    tyPrompt: 15,
    prompt1: "explain how/why/what/when/where you felt here.",
    prompt2: "answer gratitude prompt here.",
    createdAt: new Date("July 17, 2023 19:39:00"),
  },
  {
    id: 7,
    userId: 1,
    feeling: 2,
    tyPrompt: 16,
    prompt1: "explain how/why/what/when/where you felt here.",
    prompt2: "answer gratitude prompt here.",
    createdAt: new Date("July 18, 2023 22:22:00"),
  },
  {
    id: 8,
    userId: 1,
    feeling: 2,
    tyPrompt: 17,
    prompt1: "explain how/why/what/when/where you felt here.",
    prompt2: "answer gratitude prompt here.",
    createdAt: new Date("July 19, 2023 16:30:00"),
  },
  {
    id: 9,
    userId: 1,
    feeling: 1,
    tyPrompt: 18,
    prompt1: "explain how/why/what/when/where you felt here.",
    prompt2: "answer gratitude prompt here.",
    createdAt: new Date("July 20, 2023 16:29:00"),
  },
  {
    id: 10,
    userId: 1,
    feeling: 1,
    tyPrompt: 19,
    prompt1: "explain how/why/what/when/where you felt here.",
    prompt2: "answer gratitude prompt here.",
    createdAt: new Date("July 21, 2023 17:20:00"),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(options, entries);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(options, { where: { userId: 1 } });
  },
};
