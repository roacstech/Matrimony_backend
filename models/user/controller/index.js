
const service = require("../services");

module.exports.submitProfile = async (req, res) => {
   console.log("BODY 👉", req.body);
  console.log("FILES 👉", req.files);

  try {
const response = await service.submitProfile(req.body, req.files);

    if (!response.success) {
      return res.status(400).json({
        success: false,
        message: response.error || "Profile submit failed"
      });
    }

    return res.status(201).json({
      success: true,
      message: response.message,
      data: response.data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
