const { session } = require("../../services/auth.server");
const express = require("express");
const router = express.Router();

router.get("/", session.getUser);
router.post("/", session.login);
router.delete("/", session.logout);
router.put("/", session.toggleMute);

module.exports = router;
