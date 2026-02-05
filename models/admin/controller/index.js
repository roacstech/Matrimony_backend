const adminService = require("../services/index");

module.exports.getPendingForms = async (req, res) => {
  try {
    const result = await adminService.getPendingForms();

    return res.status(200).json({
      success: true,
      message: "Pending forms fetched successfully",
      data: result
    });
  } catch (error) {
    console.error("Get Pending Forms Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pending forms"
    });
  }
};

// REJECT USER
module.exports.rejectUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { reason } = req.body;

    const result = await adminService.rejectUser(userId, reason);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json({
      success: true,
      message: "User rejected successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to reject user",
    });
  }
};
