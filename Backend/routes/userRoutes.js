const register = require("../controllers/userControllers");

const express = require("express");
const router = express.Router();

router.post("/register", register.register);
router.post("/login", register.login);
router.post("/setAvatar/:id", register.setAvatar);

module.exports = router;
