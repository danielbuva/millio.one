const { verifyAuth } = require("../../../services/auth.server");
const router = require("express").Router();
const { night } = require("./lib");

router.post("/", verifyAuth, night.createEntry);
router.get("/:id", verifyAuth, night.getEntry);
router.delete("/:id", verifyAuth, night.deleteEntry);

module.exports = router;
