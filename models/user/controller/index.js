const userService = require("../services/index");

exports.submitUserForm = async (req, res) => {
  try {
    await userService.submitForm(req.user, req.body);
    res.json({ success: true, message: "Form submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Submit failed" });
  }
};
