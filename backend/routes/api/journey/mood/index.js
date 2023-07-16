const { verifyAuth } = require("../../../services/auth.server");
const router = require("express").Router();
const { mood } = require("./lib");

router.post("/", verifyAuth, mood.createEntry);
router.get("/:id", verifyAuth, mood.getEntry);
router.delete("/:id", verifyAuth, mood.deleteEntry);
router.put("/:id", verifyAuth, mood.updateEntry);

module.exports = router;
