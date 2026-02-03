const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendApprovalMail = async (toEmail, name) => {
  try {
    console.log("📨 Sending approval mail to:", toEmail);

    await transporter.sendMail({
      from: `"Kalyanamalai Matrimony" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: "Profile Approved ✅",
      html: `<h3>Hello ${name}</h3><p>Your profile approved 🎉</p>`,
    });

    console.log("✅ Approval mail sent successfully to:", toEmail);
  } catch (err) {
    console.error("❌ Approval mail failed:", err.message);
  }
};


const sendRejectionMail = async (toEmail, name, reason = "") => {
  await transporter.sendMail({
    from: `"Kalyanamalai Matrimony" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "Profile Rejected ❌",
    html: `<h3>Hello ${name},</h3><p>${reason}</p>`,
  });
};

module.exports = {
  sendApprovalMail,
  sendRejectionMail,
};
