//new changes

const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const authMiddleware = require("../../../middleware/authmiddleware");



router.post( "/view-profile", authMiddleware, controller.viewProfile );


module.exports = router;