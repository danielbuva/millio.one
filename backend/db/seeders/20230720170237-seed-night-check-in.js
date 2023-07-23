"use strict";

let options = { tableName: "NightCheckIns" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const entries = [
  {
    id: 1,
    userId: 1,
    retst: 4,
    stress: 0,
    productivity: 1,
    prompt1:
      "today I got all my work done and more. I also went rock climbing with my friend miguel!",
    prompt2:
      "Today I put all that energy into building out my personal and work project.",
    prepared: true,
    createdAt: new Date("July 12, 2023 20:12:00"),
  },
  {
    id: 2,
    userId: 1,
    retst: 4,
    stress: 1,
    productivity: 2,
    prompt1:
      "giving maximum effort at work, and ended my day with a date :)",
    prompt2:
      "I got to see some snow left on the mountain and a beautiful waterfall.",
    prepared: true,
    createdAt: new Date("July 13, 2023 19:43:00"),
  },
  {
    id: 3,
    userId: 1,
    retst: 3,
    stress: 3,
    productivity: 3,
    prompt1: "more work, cleaning and lots of music.",
    prompt2: "spending all my creative energy on my work.",
    prepared: false,
    createdAt: new Date("July 14, 2023 21:55:00"),
  },
  {
    id: 4,
    userId: 1,
    retst: 3,
    stress: 3,
    productivity: 3,
    prompt1: "continue work and took my time to enjoy the day.",
    prompt2: "I get to spend everyday exactly how I want.",
    prepared: false,
    createdAt: new Date("July 15, 2023 22:42:00"),
  },
  {
    id: 5,
    userId: 1,
    retst: 3,
    stress: 3,
    productivity: 3,
    prompt1:
      "I went sight seeing today, along with work in all the places I visited.",
    prompt2: "I have arrived.",
    prepared: false,
    createdAt: new Date("July 16, 2023 20:10:00"),
  },
  {
    id: 6,
    userId: 1,
    retst: 2,
    stress: 4,
    productivity: 4,
    prompt1:
      "work, saw some friends and spent time with my kitty as usual.",
    prompt2: "yes!",
    prepared: false,
    createdAt: new Date("July 17, 2023 21:23:00"),
  },
  {
    id: 7,
    userId: 1,
    retst: 2,
    stress: 4,
    productivity: 4,
    prompt1: "I focused on work and my partner today. I got a lot done :)",
    prompt2:
      "I only listen, I try my best not to influence unless they ask.",
    prepared: false,
    createdAt: new Date("July 18, 2023 18:52:00"),
  },
  {
    id: 8,
    userId: 1,
    retst: 2,
    stress: 3,
    productivity: 4,
    prompt1: "I focused on work again and taking care of myself.",
    prompt2: "I don't today :/",
    prepared: false,
    createdAt: new Date("July 19, 2023 17:33:00"),
  },
  {
    id: 9,
    userId: 1,
    retst: 1,
    stress: 3,
    productivity: 4,
    prompt1: "more work, but also some climbing with my friend.",
    prompt2: "not really :/",
    prepared: false,
    createdAt: new Date("July 20, 2023 19:19:00"),
  },
  {
    id: 10,
    userId: 1,
    retst: 1,
    stress: 4,
    productivity: 4,
    prompt1: "work, and spent time just sitting today.",
    prompt2:
      "I was alone today, I felt waves of lonely come and go and ultimately felt at peace in the motions.",
    prepared: false,
    createdAt: new Date("July 21, 2023 21:51:00"),
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
