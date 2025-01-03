const express = require("express");
const upload = require("../config/multer");
const { applicationForm } = require("../controller/userSubmit");
const router = express.Router();

router.post("/apply", upload, applicationForm);

module.exports = router;
