const express = require("express");
const router = express.Router();

router.use("/auth",require("../models/auth/router/index"))
router.use("/user",require("../models/user/router/index"))
router.use("/admin",require("../models/admin/router/index"))
router.use("/profiles",require("../models/profiles/router/index"))

module.exports = router;
