const { verifyAuth } = require("../../../services/auth.server");
const router = require("express").Router();
const { mood } = require("./ilb");

router.post("/", verifyAuth, mood.createMoodCheckIn);

module.exports = router;
