const { bookings } = require("./lib");

const router = require("express").Router({ mergeParams: true });

router.put("/", bookings.edit);
router.delete("/", bookings.delete);

module.exports = router;
