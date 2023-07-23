"use strict";

let options = { tableName: "DayCheckIns" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const entries = [
  {
    id: 1,
    userId: 1,
    sleep: 4,
    tyPrompt: 9,
    motivation: 4,
    prompt1: "I want to be able to be someone my coworkers look up to.",
    prompt2: "My grandmother bought me a Purple seat cushion.",
    prepared: true,
    createdAt: new Date("July 12, 2023 08:10:00"),
  },
  {
    id: 2,
    userId: 1,
    sleep: 4,
    tyPrompt: 8,
    motivation: 4,
    prompt1:
      "her voice is an angelic song with sweet words that cure my ice cream craving and she has a beautiful mind.",
    prompt2: "I feel love, warmth, and content",
    prepared: true,
    createdAt: new Date("July 13, 2023 07:09:00"),
  },
  {
    id: 3,
    userId: 1,
    sleep: 3,
    tyPrompt: 7,
    motivation: 3,
    prompt1: "I enjoy both no real preference.",
    prompt2: "I can start!",
    prepared: false,
    createdAt: new Date("July 14, 2023 06:58:00"),
  },
  {
    id: 4,
    userId: 1,
    sleep: 3,
    tyPrompt: 6,
    motivation: 3,
    prompt1:
      "hey future me. right now the weight of the world is off our shoulders. love u",
    prompt2: "I enjoy making and eating good soups!",
    prepared: false,
    createdAt: new Date("July 15, 2023 06:02:00"),
  },
  {
    id: 5,
    userId: 1,
    sleep: 3,
    tyPrompt: 5,
    motivation: 3,
    prompt1: "it's about the journey!",
    prompt2:
      "movie nights, game nights, eating together, making food together, my kitty, home is home.",
    prepared: false,
    createdAt: new Date("July 16, 2023 07:00:00"),
  },
  {
    id: 6,
    userId: 1,
    sleep: 2,
    tyPrompt: 4,
    motivation: 2,
    prompt1: "rip ponyboy, he was my mate, now he's in my heart and mind.",
    prompt2:
      "give a wholehearted presence, smile, tell them your funniest joke and pay attention to them.",
    prepared: false,
    createdAt: new Date("July 17, 2023 06:54:00"),
  },
  {
    id: 7,
    userId: 1,
    sleep: 2,
    tyPrompt: 3,
    motivation: 2,
    prompt1: "I want to drift race down a mountain vs my queen.",
    prompt2: "I recently got a job. thanks pierre <3",
    prepared: false,
    createdAt: new Date("July 18, 2023 08:22:00"),
  },
  {
    id: 8,
    userId: 1,
    sleep: 2,
    tyPrompt: 2,
    motivation: 2,
    prompt1:
      "I can clean myself, cook myself some good meals, and allow myself to sleep tonight.",
    prompt2: "I think the cure is to live in the present.",
    prepared: false,
    createdAt: new Date("July 19, 2023 06:04:00"),
  },
  {
    id: 9,
    userId: 1,
    sleep: 1,
    tyPrompt: 1,
    motivation: 1,
    prompt1:
      "I am so busy with other interests. I often get only work out when I feel like it. I can start working out when it's time to work out and I can moderate my time spent on other interests.",
    prompt2:
      "I like giving genuine compliments when I think the person deserves it or if I feel like I want to share.",
    prepared: false,
    createdAt: new Date("July 20, 2023 07:24:00"),
  },
  {
    id: 10,
    userId: 1,
    sleep: 1,
    tyPrompt: 0,
    motivation: 1,
    prompt1:
      "it's hard to truly be alone. I would like to be alone for a few years maybe 6.",
    prompt2:
      "I am grateful for being able to step out of my comfort zone and learn how to code :)",
    prepared: false,
    createdAt: new Date("July 21, 2023 06:24:00"),
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
