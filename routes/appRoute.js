const express = require("express");

const { applicationForm } = require("../controller/userSubmit");
const upload = require("../config/multer");
const router = express.Router();

router.post("/apply", upload, applicationForm);

module.exports = router;
