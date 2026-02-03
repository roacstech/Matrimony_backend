const express = require("express");
const router = express.Router();

const { submitUserForm } = require("../controller");
const { verifyToken } = require("../../../middleware/authmiddleware");
console.log("verifyToken type:", typeof verifyToken);


router.post("/form/submit", verifyToken, submitUserForm);

module.exports = router; // 🔥 MUST
