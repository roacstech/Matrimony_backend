exports.acceptTemplate = (name) => `
  <h2>Welcome to Dasapalanjiga Kalyanamalai 💍</h2>
  <p>Hi <b>${name}</b>,</p>
  <p>Your profile has been approved by our admin.</p>
  <p>You can now start exploring matches.</p>
  <br/>
  <p>– Admin Dasapalanjiga Kalyanamalai</p>
`;

exports.rejectTemplate = (name, reason = "") => `
  <h2>Profile Update – Kalyanamalai</h2>
  <p>Hi <b>${name}</b>,</p>
  <p>We regret to inform you that your profile was rejected.</p>
  ${reason ? `<p><b>Reason:</b> ${reason}</p>` : ""}
  <br/>
  <p>– Admin Dasapalanjiga Kalyanamalai</p>
`;


exports.otpTemplate = (otp) => `
  <h2>Password Reset OTP</h2>
  <p>Your OTP is:</p>
  <h1 style="letter-spacing:3px;">${otp}</h1>
  <p>This OTP is valid for 10 minutes.</p>
  <br/>
  <p>– Kalyanamalai Team</p>
`;

module.exports.passwordResetSuccessTemplate = (name) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Password Reset Successful</h2>
      <p>Hi <strong>${name}</strong>,</p>
      <p>Your password has been reset successfully.</p>
      <p>If you did not do this, please contact support immediately.</p>
    </div>
  `;
};