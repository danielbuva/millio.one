const router = require("express").Router({ mergeParams: true });
const { review } = require("./lib.js");

router.post("/images", review.addImage);
router.put("/", review.edit);
router.delete("/", review.delete);

module.exports = router;
