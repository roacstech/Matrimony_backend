const express = require("express");
const router = express.Router();

const {
  getPendingForms,
  approveUserForm,
  rejectUserForm,
} = require("../controller");

const {
  verifyToken,
  authorizeRoles,
} = require("../../../middleware/authmiddleware");

router.get(
  "/forms/pending",
  verifyToken,
  authorizeRoles(1),
  getPendingForms
);

router.put(
  "/approve/:formId",
  verifyToken,
  authorizeRoles(1),
  approveUserForm
);

router.put(
  "/reject/:formId",
  verifyToken,
  authorizeRoles(1),
  rejectUserForm
);

module.exports = router;
