const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

// Pending forms
router.get("/forms/pending", controller.getPendingForms);
// Reject user
router.put("/reject/:id", controller.rejectUser);

module.exports = router;
