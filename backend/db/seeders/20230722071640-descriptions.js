"use strict";

let options = { tableName: "Origins" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const origins = [
  {
    moodId: 1,
    value: "creative",
  },
  {
    moodId: 1,
    value: "happy",
  },
  {
    moodId: 2,
    value: "love",
  },
  {
    moodId: 2,
    value: "proud",
  },
  {
    moodId: 3,
    value: "satisfied",
  },
  {
    moodId: 3,
    value: "relieved",
  },
  {
    moodId: 4,
    value: "motivated",
  },
  {
    moodId: 5,
    value: "busy",
  },
  {
    moodId: 6,
    value: "nervous",
  },
  {
    moodId: 6,
    value: "lonely",
  },
  {
    moodId: 6,
    value: "let down",
  },
  {
    moodId: 7,
    value: "insecure",
  },
  {
    moodId: 8,
    value: "annoyed",
  },
  {
    moodId: 8,
    value: "lonely",
  },
  {
    moodId: 9,
    value: "shameful",
  },
  {
    moodId: 10,
    value: "rejected",
  },
  {
    nightId: 1,
    value: "excited",
  },
  {
    nightId: 1,
    value: "creative",
  },
  {
    nightId: 2,
    value: "grateful",
  },
  {
    nightId: 2,
    value: "inspired",
  },
  {
    nightId: 3,
    value: "distracted",
  },
  {
    nightId: 3,
    value: "impatient",
  },
  {
    nightId: 4,
    value: "busy",
  },
  {
    nightId: 5,
    value: "worried",
  },
  {
    nightId: 6,
    value: "sad",
  },
  {
    nightId: 6,
    value: "nervous",
  },
  {
    nightId: 6,
    value: "let down",
  },
  {
    nightId: 7,
    value: "insecure",
  },
  {
    nightId: 8,
    value: "guilty",
  },
  {
    nightId: 8,
    value: "rejected",
  },
  {
    nightId: 9,
    value: "fearful",
  },
  {
    nightId: 10,
    value: "anxious",
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
        [Sequelize.Op.and]: [
          {
            dayId: { [Sequelize.Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
          },
          {
            nightId: {
              [Sequelize.Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            },
          },
        ],
      },
    });
  },
};
