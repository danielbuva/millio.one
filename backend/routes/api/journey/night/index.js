const { verifyAuth } = require("../../../services/auth.server");
const router = require("express").Router();
const { night } = require("./lib");

router.post("/", verifyAuth, night.createEntry);

module.exports = router;
