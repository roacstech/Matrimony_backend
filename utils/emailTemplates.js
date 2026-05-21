exports.acceptTemplate = (name) => `
  <h2>Welcome to Dasabalanjika Kalyanamalai 💍</h2>
  <p>Hi <b>${name}</b>,</p>
  <p>Your profile has been approved by our admin.</p>
  <p>You can now start exploring matches.</p>
  <br/>
  <p>– Admin Dasabalanjika Kalyanamalai</p>
`;

exports.rejectTemplate = (name, reason = "") => `
  <h2>Profile Update – Kalyanamalai</h2>
  <p>Hi <b>${name}</b>,</p>
  <p>We regret to inform you that your profile was rejected.</p>
  ${reason ? `<p><b>Reason:</b> ${reason}</p>` : ""}
  <br/>
  <p>– Admin Dasabalanjika Kalyanamalai</p>
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

module.exports.connectionRequestSentTemplate = (senderName, receiverName) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>Connection Request Sent</h2>
    <p>Hi <strong>${senderName}</strong>,</p>
    <p>You have successfully sent a connection request to <strong>${receiverName}</strong>.</p>
    <p>We will notify you once they respond to your request.</p>
    <br/>
    <p>– Dasabalanjika Kalyanamalai Team</p>
  </div>
`;

module.exports.connectionRequestReceivedTemplate = (receiverName, senderName) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>New Connection Request</h2>
    <p>Hi <strong>${receiverName}</strong>,</p>
    <p>You have received a new connection request from <strong>${senderName}</strong>.</p>
    <p>Log in to your account to review and accept or reject this request.</p>
    <p>Visit us at: <a href="https://www.dasabalanjika.com/">https://www.dasabalanjika.com/</a></p>
    <br/>
    <p>– Dasabalanjika Kalyanamalai Team</p>
  </div>
`;

module.exports.connectionRequestAcceptedTemplate = (senderName, receiverName) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>Connection Request Accepted! 🎉</h2>
    <p>Hi <strong>${senderName}</strong>,</p>
    <p>Great news! <strong>${receiverName}</strong> has accepted your connection request.</p>
    <p>You can now view their full profile and start communicating.</p>
    <p>Visit us at: <a href="https://www.dasabalanjika.com/">https://www.dasabalanjika.com/</a></p>
    <br/>
    <p>– Dasabalanjika Kalyanamalai Team</p>
  </div>
`;

module.exports.connectionRequestRejectedTemplate = (senderName, receiverName) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>Connection Request Update</h2>
    <p>Hi <strong>${senderName}</strong>,</p>
    <p>We wanted to let you know that <strong>${receiverName}</strong> has declined your connection request.</p>
    <p>Don't worry, there are many other matches waiting for you. Keep exploring!</p>
    <p>Visit us at: <a href="https://www.dasabalanjika.com/">https://www.dasabalanjika.com/</a></p>
    <br/>
    <p>– Dasabalanjika Kalyanamalai Team</p>
  </div>
`;
