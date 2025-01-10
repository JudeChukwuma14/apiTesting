const express = require("express");
const { contactMail } = require("../controller/contactController");
const router = express.Router();

router.post("/send", contactMail)
module.exports = router;