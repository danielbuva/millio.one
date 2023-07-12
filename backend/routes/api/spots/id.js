const router = require("express").Router({ mergeParams: true });
const { spotId } = require("./lib");

router.get("/", spotId.getSpot);
router.put("/", spotId.editSpot);
router.delete("/", spotId.deleteSpot);

router.get("/reviews", spotId.getReview);
router.get("/avgreviews", spotId.getAvgReviewsBySpotId);
router.post("/reviews", spotId.createReview);

router.get("/bookings", spotId.getBooking);
router.post("/bookings", spotId.createBooking);

router.post("/images", spotId.addSpotImage);

module.exports = router;
