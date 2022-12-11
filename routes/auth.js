const express = require("express");
const router = express.Router();

const { getLogin, getRegister } = require("../controllers/auth");

router.get("/login", getLogin);
router.get("/register", getRegister);

module.exports = router;
