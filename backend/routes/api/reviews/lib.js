const {
  checkAuthorization,
  invariant,
  throwError,
  throwIfError,
  returnError,
} = require("../../../services/error.server");
const {
  Review,
  ReviewImage,
  Spot,
  SpotImage,
  User,
} = require("../../../db/models");
const { remapToAddSpotImage } = require("../../../utils");

const addReviewImageByReviewId = async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    const review = await Review.findByPk(reviewId, {
      attributes: ["userId"],
    });
    invariant(review, "Review couldn't be found");
    checkAuthorization(review.userId === req.user.id);

    const images = await ReviewImage.count({ where: { reviewId } });
    if (images >= 10) {
      throwError(
        403,
        "Maximum number of images for this resource was reached"
      );
    }

    const newReview = await ReviewImage.create({
      reviewId,
      url: req.body.url,
    });

    res.json({ id: newReview.id, url: newReview.url });
  } catch (err) {
    returnError(err, res);
  }
};

const editReviewbyReviewId = async (req, res) => {
  const errorResult = { errors: {}, message: "Bad Request", status: 400 };
  const { review, stars } = req.body;

  if (!review) {
    errorResult.errors.review = "Review text is required";
  }
  if (!stars) {
    errorResult.errors.stars = "Stars must be an integer from 1 to 5";
  }
  try {
    throwIfError(errorResult);

    const reviewToUpdate = await Review.findByPk(req.params.reviewId);
    invariant(reviewToUpdate, "Review couldn't be found");
    checkAuthorization(reviewToUpdate.userId === req.user.id);

    reviewToUpdate.review = review;
    reviewToUpdate.stars = stars;
    await reviewToUpdate.save();

    res.json(reviewToUpdate);
  } catch (err) {
    returnError(err, res);
  }
};

const deleteReviewByReviewId = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.reviewId);
    invariant(review, "Review couldn't be found");
    checkAuthorization(review.userId === req.user.id);

    await review.destroy();
    res.json({ message: "Successfully deleted" });
  } catch (err) {
    returnError(err, res);
  }
};

const getCurrentUsersReviews = async (req, res) => {
  try {
    const [reviews, spotImages] = await Promise.all([
      Review.findAll({
        where: { userId: req.user.id },
        include: [
          { model: User, attributes: ["id", "firstName", "lastName"] },
          {
            model: Spot,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          { model: ReviewImage, attributes: ["id", "url"] },
        ],
      }),
      SpotImage.findAll({
        attributes: ["spotId", "url"],
        order: [["createdAt", "DESC"]],
      }),
    ]);

    const Reviews = remapToAddSpotImage(reviews, spotImages);
    res.json({ Reviews });
  } catch (err) {
    returnError(err, res);
  }
};

module.exports = {
  getCurrentUsersReviews,
  review: {
    addImage: addReviewImageByReviewId,
    edit: editReviewbyReviewId,
    delete: deleteReviewByReviewId,
  },
};
