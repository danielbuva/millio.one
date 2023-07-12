const { getAllSpots, createSpot, getCurrentUsersSpots } = require("./lib");
const { verifyAuth } = require("../../../services/auth.server");
const router = require("express").Router();
const spotId = require("./id");

router.get("/", getAllSpots);
router.post("/", verifyAuth, createSpot);
router.get("/current", verifyAuth, getCurrentUsersSpots);
router.use("/:spotId", spotId);

module.exports = router;
