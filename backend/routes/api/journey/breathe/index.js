const { verifyAuth } = require("../../../services/auth.server");
const router = require("express").Router();
const { breathe } = require("./lib");

router.post("/", verifyAuth, breathe.createEntry);
// router.get("/avg", verifyAuth, breathe.getAverageMood);
router.get("/:id", verifyAuth, breathe.getEntry);
router.delete("/:id", verifyAuth, breathe.deleteEntry);

module.exports = router;
