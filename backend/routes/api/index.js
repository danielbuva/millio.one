const {
  restoreCsrf,
  restoreSession,
} = require("../../services/auth.server");
const { returnUser } = require("../../utils");
const bookingsRouter = require("./bookings");
const { sessionRouter } = require("./auth");
const reviewsRouter = require("./reviews");
const router = require("express").Router();
const { usersRouter } = require("./auth");
const imagesRouter = require("./images");
const spotsRouter = require("./spots");
const { isProduction } = require("../../config");

router.use(restoreSession);
router.use("/bookings", bookingsRouter);
router.use("/session", sessionRouter);
router.use("/reviews", reviewsRouter);
router.use("/users", usersRouter);
router.use("/spots", spotsRouter);
router.use(imagesRouter);

router.get("/require-auth", returnUser);
if (!isProduction) {
  router.get("/csrf/restore", restoreCsrf);
}
router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
