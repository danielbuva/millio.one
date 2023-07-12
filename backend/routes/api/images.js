const {
  SpotImage,
  ReviewImage,
  Spot,
  Review,
} = require("../../db/models");
const {
  invariant,
  checkAuthorization,
  returnError,
} = require("../../services/error.server");
const { verifyAuth } = require("../../services/auth.server");
const router = require("express").Router();

router.delete("/spot-images/:imageId", verifyAuth, async (req, res) => {
  try {
    const spotImage = await SpotImage.findByPk(req.params.imageId);
    invariant(spotImage, "Spot Image couldn't be found");

    const spot = await Spot.findByPk(spotImage.spotId);
    checkAuthorization(spot.ownerId === req.user.id);

    await spotImage.destroy();
    res.json({ message: "Successfully deleted" });
  } catch (err) {
    returnError(err, res);
  }
});

router.delete("/review-images/:imageId", verifyAuth, async (req, res) => {
  try {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId);
    invariant(reviewImage, "Review Image couldn't be found");

    const review = await Review.findByPk(reviewImage.reviewId);
    checkAuthorization(review.userId === req.user.id);

    await reviewImage.destroy();
    res.json({ message: "Successfully deleted" });
  } catch (err) {
    returnError(err, res);
  }
});

module.exports = router;
