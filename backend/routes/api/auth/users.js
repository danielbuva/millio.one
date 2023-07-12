const { user } = require("../../../services/auth.server");
const router = require("express").Router();

router.get("/", user.getAllUsers);
router.post("/", user.signup);

module.exports = router;
