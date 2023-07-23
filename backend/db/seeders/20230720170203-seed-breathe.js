"use strict";

let options = { tableName: "Breathes" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const entries = [
  {
    id: 1,
    userId: 1,
    duration: 185,
    pace: 3,
    createdAt: new Date("July 12, 2023 09:22:00"),
  },
  {
    id: 2,
    userId: 1,
    duration: 185,
    pace: 3,
    createdAt: new Date("July 12, 2023 15:12:00"),
  },
  {
    id: 3,
    userId: 1,
    duration: 125,
    pace: 3,
    createdAt: new Date("July 13, 2023 10:23:00"),
  },
  {
    id: 4,
    userId: 1,
    duration: 185,
    pace: 3,
    createdAt: new Date("July 13, 2023 17:20:00"),
  },
  {
    id: 5,
    userId: 1,
    duration: 69,
    pace: 3,
    createdAt: new Date("July 14, 2023 11:47:00"),
  },
  {
    id: 6,
    userId: 1,
    duration: 89,
    pace: 3,
    createdAt: new Date("July 14, 2023 12:51:00"),
  },
  {
    id: 7,
    userId: 1,
    duration: 65,
    pace: 3,
    createdAt: new Date("July 15, 2023 12:09:00"),
  },
  {
    id: 8,
    userId: 1,
    duration: 185,
    pace: 3,
    createdAt: new Date("July 15, 2023 14:00:00"),
  },
  {
    id: 9,
    userId: 1,
    duration: 185,
    pace: 3,
    createdAt: new Date("July 16, 2023 12:20:00"),
  },
  {
    id: 10,
    userId: 1,
    duration: 185,
    pace: 3,
    createdAt: new Date("July 16, 2023 15:30:00"),
  },
  {
    id: 11,
    userId: 1,
    duration: 125,
    pace: 3,
    createdAt: new Date("July 17, 2023 09:21:00"),
  },
  {
    id: 12,
    userId: 1,
    duration: 185,
    pace: 3,
    createdAt: new Date("July 17, 2023 19:43:00"),
  },
  {
    id: 13,
    userId: 1,
    duration: 185,
    pace: 3,
    createdAt: new Date("July 18, 2023 09:52:00"),
  },
  {
    id: 14,
    userId: 1,
    duration: 185,
    pace: 3,
    createdAt: new Date("July 18, 2023 22:25:00"),
  },
  {
    id: 15,
    userId: 1,
    duration: 185,
    pace: 3,
    createdAt: new Date("July 19, 2023 12:34:00"),
  },
  {
    id: 16,
    userId: 1,
    duration: 145,
    pace: 3,
    createdAt: new Date("July 19, 2023 16:32:00"),
  },
  {
    id: 17,
    userId: 1,
    duration: 185,
    pace: 3,
    createdAt: new Date("July 20, 2023 09:22:00"),
  },
  {
    id: 18,
    userId: 1,
    duration: 185,
    pace: 3,
    createdAt: new Date("July 20, 2023 16:32:00"),
  },
  {
    id: 19,
    userId: 1,
    duration: 185,
    pace: 3,
    createdAt: new Date("July 21, 2023 11:32:00"),
  },
  {
    id: 20,
    userId: 1,
    duration: 182,
    pace: 3,
    createdAt: new Date("July 21, 2023 17:23:00"),
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
