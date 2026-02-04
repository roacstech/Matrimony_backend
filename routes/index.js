const express = require("express");
const router = express.Router();

router.use("/auth",require("../models/auth/router/index"))
router.use("/user",require("../models/user/router/index"))

module.exports = router;
