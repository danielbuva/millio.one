const { verifyAuth } = require("../../services/auth.server");
const router = require("express").Router();
const dayRouter = require("./day");
const nightRouter = require("./night");
const moodRouter = require("./mood");

router.use(verifyAuth);
router.get("/");
router.use("/day", dayRouter);
router.use("/night", nightRouter);
router.use("/mood", moodRouter);

module.exports = router;
