const service = require("../services/index");

const {
  forgotPasswordSchema,
  verifyOTPSchema,
  resetPasswordSchema,
} = require("../../../validators/forgotPassword.validator");

module.exports.register = async (req, res) => {
  console.log("SIGN SECRET:", process.env.JWT_SECRET);

  try {
    console.log("REQ BODY 👉", req.body);
    const response = await service.register(req.body);

    return res.status(response.code).json({
      status: response.status,
      message: response.message,
      response: response.response || null,
    });
  } catch (err) {
    console.error("Register controller error:", err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports.login = async (req, res) => {
  console.log("JWT SECRET (LOGIN):", process.env.JWT_SECRET);

  try {
    const response = await service.login(req.body);

    // console.log("JWT SECRET (LOGIN):", process.env.JWT_SECRET);

    return res.status(response.code).json({
      status: response.status,
      message: response.message,
      response: response.response,
      roleid: response.roleid, // 👈 ADD
      // userid: response.userid,
    });
  } catch (err) {
    console.error("Login controller error:", err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

/* ================= SEND OTP ================= */
module.exports.sendOtp = async (req, res) => {
  try {
    const { error } = forgotPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }

    const response = await service.sendOtp(req.body);
    return res.status(response.status ? 200 : 400).json(response);
  } catch (e) {
    console.error("Send OTP Error:", e);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

/* ================= VERIFY OTP ================= */
module.exports.verifyOtp = async (req, res) => {
  try {
    const { error } = verifyOTPSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }

    const response = await service.verifyOtp(req.body);
    return res.status(response.status ? 200 : 400).json(response);
  } catch (e) {
    console.error("Verify OTP Error:", e);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

/* ================= RESET PASSWORD ================= */
module.exports.resetPassword = async (req, res) => {
  try {
    const { error } = resetPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }

    const response = await service.resetPassword(req.body);
    return res.status(response.status ? 200 : 400).json(response);
  } catch (e) {
    console.error("Reset Password Error:", e);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
