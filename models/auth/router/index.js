const express = require("express")
const router = express.Router()
const controller = require("../controller/index")
const authMiddleware = require("../../../middleware/authmiddleware")


router.post("/login",controller.login)
router.post("/register", controller.register);
// router.get("/profile/:id", authMiddleware, controller.getUserProfile);

router.post("/forgot-password", controller.sendOtp);
router.post("/verify-otp", controller.verifyOtp);
router.post("/reset-password", controller.resetPassword);


module.exports = router