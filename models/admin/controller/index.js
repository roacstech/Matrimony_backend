const adminService = require("../services");

exports.getPendingForms = async (req, res) => {
  const data = await adminService.getPending();
  res.json(data);
};

exports.approveUserForm = async (req, res) => {
  await adminService.approve(req.params.formId);
  res.json({ success: true });
};

exports.rejectUserForm = async (req, res) => {
  await adminService.reject(req.params.formId, req.body.reason);
  res.json({ success: true });
};
