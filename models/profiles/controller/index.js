const service = require("../services/index");

module.exports.viewProfile = async (req, res) => {
  try {
const { profileId } = req.body;
const viewerId = req.user.id;
    console.log("😍😍😍", viewerId, profileId);

    if (!viewerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!profileId) {
      return res.status(400).json({
        success: false,
        message: "profileId is required",
      });
    }

    const result = await service.viewProfile(viewerId, profileId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};