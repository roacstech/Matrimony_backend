const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const upload = require("../../../middleware/upload"); // 👈 ADD THIS
const authmiddleware = require("../../../middleware/authmiddleware");

router.post(
  "/form/submit",
  authmiddleware,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "horoscope", maxCount: 1 },
  ]),
  controller.submitProfile
);



router.get("/connections",authmiddleware, controller.getVisibleConnections);
router.get("/profile/:id",authmiddleware,controller.getUserProfile);
router.post("/sendconnection",authmiddleware,controller.sendConnectionRequest);
router.get("/get-connection",authmiddleware,controller.getReceivedConnections);
module.exports = router;
