"use strict";

const prompts = [
  {
    prompt:
      "If you could change any one thing about your work life right now, what would it be?",
    type: "work",
    version: 0,
  },
  {
    prompt:
      "Try to write a few good words about your present life for your future self. What would you want to remember?",
    type: "relaxing",
    version: 0,
  },
  {
    prompt:
      "Is there someone in your family you would like to strengthen your relationship with?",
    type: "family",
    version: 0,
  },
  {
    prompt: "What is an ideal friend for you?",
    type: "friends",
    version: 0,
  },
  {
    prompt:
      "What are the three things you admire the most abour your date?",
    type: "date",
    version: 0,
  },
  {
    prompt:
      "What childhood real or fictional pet made a strong impression on you that shaped you as a human?",
    type: "pet",
    version: 0,
  },
  {
    prompt:
      "What are the two biggest obstacles to exercise in your life? How can you work to eliminate them?",
    type: "fitness",
    version: 0,
  },
  {
    prompt: "How can you care for yourself today?",
    type: "self-care",
    version: 0,
  },
  {
    prompt: `What would you add to your "couple's buclet list"?`,
    type: "partner",
    version: 0,
  },
  {
    prompt: "What has you more excited: the destination or the journey?",
    type: "travel",
    version: 0,
  },
  {
    prompt: "How do thunderstorms make you feel?",
    type: "nature",
    version: 0,
  },
  {
    prompt: "Do you prefer home parties or going out?",
    type: "party",
    version: 0,
  },
  {
    prompt:
      "Do you like your music to have lyrics or do you prefer instruments only?",
    type: "music",
    version: 0,
  },
  {
    prompt: "Is there a game you would like to try?",
    type: "gaming",
    version: 0,
  },
  {
    prompt: "Are you an impulse buyer?",
    type: "shopping",
    version: 0,
  },
  {
    prompt: "Do you enjoy your own cooking?",
    type: "eating",
    version: 0,
  },
  {
    prompt: "What can you get rid of today to make your home cleaner?",
    type: "cleaning",
    version: 0,
  },
  {
    prompt:
      "What do you like your environment to be when you want to be creative? Is there a specific setup or place, that helps you with that?",
    type: "creativity",
    version: 0,
  },
  {
    prompt:
      "Do you believe in destiny? Do you believe we find our purpose or that our purpose finds us?",
    type: "spirituality",
    version: 0,
  },
  {
    prompt: "How much time alone do you need?",
    type: "time alone",
    version: 0,
  },
  {
    prompt:
      "Have you ever witnessed a kindness ripple effect where people were kind after receiving kindness?",
    type: "helping others",
    version: 0,
  },
  {
    prompt: "Are there signals from your body you are ignoring?",
    type: "health",
    version: 0,
  },
  {
    prompt: "What did you remove from your list today?",
    type: "work",
    version: 1,
  },
  {
    prompt: "Did you get to spend the day the way you wanted?",
    type: "relaxing",
    version: 1,
  },
  {
    prompt: "What is something only you know about your family?",
    type: "family",
    version: 1,
  },
  {
    prompt: "Did you make an effort to spend time with friends today?",
    type: "friends",
    version: 1,
  },
  {
    prompt: "Was everything as you hoped for? Better or worse?",
    type: "date",
    version: 1,
  },
  {
    prompt: "Did you spend time with any pet today?",
    type: "pet",
    version: 1,
  },
  {
    prompt: "Do you feel good in your skin?",
    type: "fitness",
    version: 1,
  },
  {
    prompt: "Do you feel confident in your body today?",
    type: "self-care",
    version: 1,
  },
  {
    prompt: "Do you think of yourself as a good listener?",
    type: "partner",
    version: 1,
  },
  {
    prompt: "Did you put effort today in school?",
    type: "school",
    version: 1,
  },
  {
    prompt: "Do you feel like you gained any knowledge today?",
    type: "learning",
    version: 1,
  },
  {
    prompt: "Did you reach your destination?",
    type: "travel",
    version: 1,
  },
  {
    prompt: "What kind of nature did you see or hear today?",
    type: "nature",
    version: 1,
  },
  {
    prompt: "Did you go out today? How was that?",
    type: "party",
    version: 1,
  },
  {
    prompt: "Was there a song that stuck out today?",
    type: "music",
    version: 1,
  },
  {
    prompt: "Did you have fun today?",
    type: "gaming",
    version: 1,
  },
  {
    prompt:
      "Do you want more than what you already have? How would you feel when you get it?",
    type: "shopping",
    version: 1,
  },
  {
    prompt: "What did you do to have a good meal today?",
    type: "eating",
    version: 1,
  },
  {
    prompt:
      "Did you get rid of the thing you have been meaning to get rid of today?",
    type: "cleaning",
    version: 1,
  },
  {
    prompt: "How did you spend your creative energy today?",
    type: "creativity",
    version: 1,
  },
  {
    prompt: "Today I considered a different perspective about...",
    type: "spirituality",
    version: 1,
  },
  {
    prompt:
      "When you were alone today, did you feel alone or did you feel lonely?",
    type: "time alone",
    version: 1,
  },
  {
    prompt: "What did you do to help others today?",
    type: "helping others",
    version: 1,
  },
  {
    prompt: "What did you do today to maintain or restore your health?",
    type: "health",
    version: 1,
  },
];

let options = { tableName: "OriginPrompts" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(options, prompts);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete(options, {
      where: {},
    });
  },
};
