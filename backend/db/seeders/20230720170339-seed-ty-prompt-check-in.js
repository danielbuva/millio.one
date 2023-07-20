"use strict";

const prompts = [
  {
    prompt: "What personal achievements are you grateful for?",
    version: 0,
  },
  {
    prompt: "Are you generous with compliments?",
    version: 0,
  },
  {
    prompt: "",
    version: 0,
  },
  {
    prompt: "",
    version: 0,
  },
  {
    prompt: "",
    version: 0,
  },
  {
    prompt: "",
    version: 0,
  },
  {
    prompt: "",
    version: 0,
  },
  {
    prompt: "",
    version: 0,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
