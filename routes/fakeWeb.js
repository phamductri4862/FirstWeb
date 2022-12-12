const express = require("express");
const router = express.Router();

router.get("/fakeWeb", (req, res) => res.render("fakeWeb"));

module.exports = router;
