const { verifyAuth } = require("../../../services/auth.server");
const router = require("express").Router();
const { day } = require("./lib");

router.post("/", verifyAuth, day.createEntry);
router.get("/:id", verifyAuth, day.getEntry);

module.exports = router;
