const { verifyAuth } = require("../../services/auth.server");
const { getAllEntries } = require("./lib");
const router = require("express").Router();
const dayRouter = require("./morning");
const nightRouter = require("./evening");
const moodRouter = require("./mood");

router.use(verifyAuth);
router.get("/", getAllEntries);
router.use("/morning", dayRouter);
router.use("/evening", nightRouter);
router.use("/mood", moodRouter);

module.exports = router;
