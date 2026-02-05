const service = require("../services/index");

module.exports.submitProfile = async (req, res) => {
  console.log("SUBMIT BODY 👉", req.body);
  console.log("USER FROM TOKEN 👉", req.user);

  const userId = req.user.id;
  console.log(req.user);

  try {
    const response = await service.submitProfile(req.body, req.files, req.user);

    if (!response.success) {
      return res.status(400).json({
        success: false,
        message: response.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.getVisibleConnections = async (req, res) => {
  console.log("REQ.USER 👉", req.user);

  try {
    const result = await service.getVisibleConnections(req.user.id);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json({
      success : true,
      message : result.message,
      data:result.data
    })

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.getUserProfile = async (req, res) => {
  try {
    const result = await service.getUserProfile(req.params.id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json({ success: true, data: result.data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.sendConnectionRequest = async (req, res) => {
  try {
    const fromUser = req.user.id;
    const { toUserId } = req.body;

    if (!toUserId || fromUser === toUserId) {
      return res.status(400).json({
        success: false,
        message: "Invalid request"
      });
    }

    const result = await service.sendConnectionRequest(fromUser, toUserId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      message: "Connection request sent"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



module.exports.getReceivedConnections = async (req, res) => {
  try {
    const userId = req.user.id; // logged-in user

    const result = await service.getReceivedConnections(userId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      data: result.data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
