const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const upload = require("../../../middleware/upload");
const path=require("path") // 👈 ADD THIS
const authMiddleware= require("../../../middleware/authmiddleware")

router.post(
  "/form/submit",
  authMiddleware,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "horoscope", maxCount: 1 },
  ]),
  controller.submitProfile,
);

//connection card

router.get("/connections", authMiddleware, controller.getVisibleConnections);

router.get("/profile", authMiddleware, controller.getUserProfile);

router.post("/connection", authMiddleware, controller.sendConnectionRequest);

//My connection user

/// GET RECEIVED CONNECTIONS
router.get(
  "/connections/received",
  authMiddleware,
  controller.getReceivedConnections,
);

// 📤 Get Sent Connections0000
router.get("/connections/sent", authMiddleware, controller.getSentConnections);

// Accept Connection
router.post(
  "/connections/:id/accept",
  authMiddleware,
  controller.acceptConnection,
);

// ❌ Reject Connection
router.post(
  "/connections/:id/reject",
  authMiddleware,
  controller.rejectConnection,
);



// update profile
router.put("/profile/update", authMiddleware,controller.updateUserProfile);


const safeUploadProfilePhoto =
  typeof controller.uploadProfilePhoto === "function"
    ? controller.uploadProfilePhoto
    : (req, res) =>
        res.status(501).json({
          success: false,
          message: "Profile photo upload not implemented",
        });

// Update  Photo

router.put(
  "/profile/photo",
  authMiddleware,
  upload.single("photo"),
  safeUploadProfilePhoto
);




module.exports = router;



