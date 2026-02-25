const Joi = require("joi");

/* ========== SEND OTP ========== */
exports.forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
});

/* ========== VERIFY OTP ========== */
exports.verifyOTPSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required()
});

/* ========== RESET PASSWORD ========== */
exports.resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().min(6).required()
});