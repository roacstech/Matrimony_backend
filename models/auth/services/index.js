const db = require("../../../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendMail } = require("../../../utils/mailer");      // ✅ sendMail
const { otpTemplate } = require("../../../utils/emailTemplates");  
const { passwordResetSuccessTemplate } = require("../../../utils/emailTemplates"); // ✅ otpTemplate
module.exports.login = async (props) => {
  const { email, phone, password } = props;

  try {
    let query = db("users");

    // Email or Phone validation
    if (email) {
      query = query.where("email", email);
    } else if (phone) {
      query = query.where("phone", phone);
    } else {
      return {
        code: 400,
        status: false,
        message: "Email or phone is required",
      };
    }

    const user = await query.first();

    console.log("❤️", user);

    // User not found
    if (!user) {
      return {
        code: 400,
        status: false,
        message: "Invalid credentials",
      };
    }

    // 🚫 Restrict ONLY rejected users
    if (user.status === "REJECT" || user.status === "INACTIVE") {
      return {
        code: 403,
        status: false,
        message: "Your account is not active. Please contact admin.",
      };
    }

    // Password check (plain text - not recommended for production)
    const isMatch = password === user.password;
    if (!isMatch) {
      return {
        code: 400,
        status: false,
        message: "Invalid credentials",
      };
    }

    // JWT Token
    const token = jwt.sign(
      {
        userid: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        roleid: user.roleid,
        status: user.status,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
    );

    return {
      code: 200,
      status: true,
      message: "Login successful",
      response: token,
      roleid: user.roleid,
      status: user.status,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    };
  } catch (error) {
    console.error("Auth Service Login Error:", error);

    return {
      code: 500,
      status: false,
      message: "Authentication failed",
    };
  }
};

module.exports.register = async (props) => {
  const { name, email, password, phone } = props;

  try {
    // 🚫 Block admin registration
    if (email === "admin@gmail.com") {
      return {
        code: 403,
        status: false,
        message: "Admin registration is not allowed",
      };
    }

    const existingUser = await db("users").where({ email }).first();

    if (existingUser) {
      return {
        code: 400,
        status: false,
        message: "Email already registered",
      };
    }

    const [userid] = await db("users").insert({
      name,
      email,
      phone,
      password, //// plain password (unchanged)
      roleid: 2,
      status: "NEW",
    });

    const token = jwt.sign(
      {
        userid,
        name,
        email,
        phone,
        roleid: 2,
        status: "ACTIVE",
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
    );

    return {
      code: 201,
      status: true,
      message: "Registration successful",
      response: token,
      roleid: 2,
    };
  } catch (error) {
    console.error("Auth Service Register Error:", error);

    return {
      code: 500,
      status: false,
      message: "Registration failed",
    };
  }
};

/* ================= SEND OTP ================= */

module.exports.sendOtp = async (props = {}) => {
  const { email } = props;

  try {
    const user = await db("users").where({ email }).first();

    // Security: do not reveal user existence
    if (!user) {
      return {
        status: true,
        message: "If the email exists, OTP has been sent",
      };
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("USER:", user);
    console.log("OTP GENERATED:", otp);
    // Hash OTP
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Expiry: 10 minutes
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    // Update user record
    await db("users").where({ id: user.id }).update({
      reset_token: hashedOtp,
      reset_token_expiry: expiry,
      otp_verified: 0,
      // updated_at: new Date()
    });

    // Send OTP email using YOUR nodemailer
    await sendMail({
      to: email,
      subject: "Password Reset OTP",
      html: otpTemplate(otp),
    });

    return {
      status: true,
      message: "OTP sent successfully",
    };
  } catch (err) {
    console.error("Send OTP Service Error:", err);
    return {
      status: false,
      message: "Unable to send OTP",
    };
  }
};

/* ================= VERIFY OTP ================= */
module.exports.verifyOtp = async (props = {}) => {
  const { email, otp } = props;

  try {
    const user = await db("users")
      .where({ email })
      .andWhere("reset_token_expiry", ">", new Date())
      .first();

    if (!user || !user.reset_token) {
      return {
        status: false,
        message: "Invalid or expired OTP",
      };
    }

    const isValidOtp = await bcrypt.compare(otp, user.reset_token);
    if (!isValidOtp) {
      return {
        status: false,
        message: "Invalid or expired OTP",
      };
    }

    await db("users").where({ id: user.id }).update({
      otp_verified: 1,
      updated_at: new Date(),
    });

    return {
      status: true,
      message: "OTP verified successfully",
    };
  } catch (err) {
    console.error("Verify OTP Service Error:", err);
    return {
      status: false,
      message: "OTP verification failed",
    };
  }
};

/* ================= RESET PASSWORD ================= */
module.exports.resetPassword = async (props = {}) => {
  const { email, newPassword } = props;

  try {
    const user = await db("users").where({ email, otp_verified: 1 }).first();

    if (!user) {
      return {
        status: false,
        message: "OTP verification required",
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db("users").where({ id: user.id }).update({
      password: hashedPassword,
      reset_token: null,
      reset_token_expiry: null,
      otp_verified: 0,
      updated_at: new Date(),
    });

    await sendMail({
      to: email,
      subject: "Password Reset Successful",
      html: passwordResetSuccessTemplate(user.name || "User"),
    });

    return {
      status: true,
      message: "Password reset successfully",
    };
  } catch (err) {
    console.error("Reset Password Service Error:", err);
    return {
      status: false,
      message: "Password reset failed",
    };
  }
};
