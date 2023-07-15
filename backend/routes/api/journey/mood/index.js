const { verifyAuth } = require("../../../services/auth.server");
const router = require("express").Router();
const { mood } = require("./ilb");

router.post("/", verifyAuth, mood.createEntry);
router.get("/:id", verifyAuth, mood.getEntry);

module.exports = router;
