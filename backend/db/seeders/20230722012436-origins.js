"use strict";

let options = { tableName: "Origins" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const origins = [
  {
    dayId: 1,
    value: "friends",
  },
  {
    dayId: 1,
    value: "work",
  },
  {
    dayId: 2,
    value: "pet",
  },
  {
    dayId: 2,
    value: "date",
  },
  {
    dayId: 3,
    value: "cleaning",
  },
  {
    dayId: 3,
    value: "music",
  },
  {
    dayId: 4,
    value: "relaxing",
  },
  {
    dayId: 5,
    value: "travel",
  },
  {
    dayId: 6,
    value: "work",
  },
  {
    dayId: 6,
    value: "friends",
  },
  {
    dayId: 6,
    value: "pet",
  },
  {
    dayId: 7,
    value: "partner",
  },
  {
    dayId: 8,
    value: "work",
  },
  {
    dayId: 8,
    value: "self-care",
  },
  {
    dayId: 9,
    value: "fitness",
  },
  {
    dayId: 10,
    value: "time alone",
  },
  {
    nightId: 1,
    value: "nature",
  },
  {
    nightId: 1,
    value: "party",
  },
  {
    nightId: 2,
    value: "music",
  },
  {
    nightId: 2,
    value: "nature",
  },
  {
    nightId: 3,
    value: "cleaning",
  },
  {
    nightId: 3,
    value: "creativity",
  },
  {
    nightId: 4,
    value: "relaxing",
  },
  {
    nightId: 5,
    value: "travel",
  },
  {
    nightId: 6,
    value: "work",
  },
  {
    nightId: 6,
    value: "friends",
  },
  {
    nightId: 6,
    value: "pet",
  },
  {
    nightId: 7,
    value: "partner",
  },
  {
    nightId: 8,
    value: "work",
  },
  {
    nightId: 8,
    value: "self-care",
  },
  {
    nightId: 9,
    value: "fitness",
  },
  {
    nightId: 10,
    value: "time alone",
  },
  {
    moodId: 1,
    value: "nature",
  },
  {
    moodId: 1,
    value: "party",
  },
  {
    moodId: 2,
    value: "music",
  },
  {
    moodId: 2,
    value: "nature",
  },
  {
    moodId: 3,
    value: "cleaning",
  },
  {
    moodId: 3,
    value: "creativity",
  },
  {
    moodId: 4,
    value: "relaxing",
  },
  {
    moodId: 5,
    value: "travel",
  },
  {
    moodId: 6,
    value: "work",
  },
  {
    moodId: 6,
    value: "friends",
  },
  {
    moodId: 6,
    value: "pet",
  },
  {
    moodId: 7,
    value: "partner",
  },
  {
    moodId: 8,
    value: "work",
  },
  {
    moodId: 8,
    value: "self-care",
  },
  {
    moodId: 9,
    value: "fitness",
  },
  {
    moodId: 10,
    value: "time alone",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(options, origins);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
      where: {
        dayId: { [Sequelize.Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      },
    });
  },
};
