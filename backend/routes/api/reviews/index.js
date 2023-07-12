const { verifyAuth } = require("../../../services/auth.server");
const { getCurrentUsersReviews } = require("./lib");
const router = require("express").Router();
const reviewId = require("./id");

router.use(verifyAuth);
router.get("/current", getCurrentUsersReviews);
router.use("/:reviewId", reviewId);

module.exports = router;
