const express = require("express");
const router = express.Router();

const { getAnswers, postAnswers } = require("../controllers/getAnswers");

router.get("/get-answers", getAnswers);
router.post("/get-answers", postAnswers);

module.exports = router;
