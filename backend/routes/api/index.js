const { restoreCsrf, restoreSession } = require("../services/auth.server");
const { sessionRouter, usersRouter } = require("./auth");
const journeyRouter = require("./journey");
const { isProduction } = require("../../config");
const { returnUser } = require("../../utils");
const router = require("express").Router();

router.use(restoreSession);
router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/journey", journeyRouter);

router.get("/require-auth", returnUser);
if (!isProduction) {
  router.get("/csrf/restore", restoreCsrf);
}
router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
