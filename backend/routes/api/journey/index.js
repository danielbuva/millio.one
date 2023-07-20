const { verifyAuth } = require("../../services/auth.server");
const { getAllEntries, getPrompt } = require("./lib");
const router = require("express").Router();
const dayRouter = require("./morning");
const nightRouter = require("./evening");
const moodRouter = require("./mood");
const breatheRouter = require("./breathe");

router.use(verifyAuth);
router.get("/", getAllEntries);
router.use("/morning", dayRouter);
router.use("/evening", nightRouter);
router.use("/mood", moodRouter);
router.use("/breathe", breatheRouter);
router.get("/prompt/:type/:version", getPrompt);

module.exports = router;
