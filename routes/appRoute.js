const express = require("express");
const { applicationForm } = require("../controller/userSubmit");
const router = express.Router();

router.post("/apply", applicationForm);

module.exports = router;
