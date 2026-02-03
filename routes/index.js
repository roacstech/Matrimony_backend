const express = require("express");
const router = express.Router();

router.use("/auth",require("../models/auth/router/index"))

module.exports = router;
