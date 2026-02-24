const service = require("../services/index");


module.exports.viewProfile = async (req, res) => {
  try {
    const { profileId, viewerId } = req.body;

    if (!viewerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
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