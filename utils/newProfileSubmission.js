exports.newProfileSubmissionTemplate = (name, email) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>New Profile Submission – Dasabalanjika Kalyanamalai</h2>
    <p>A new profile has been submitted and is awaiting your approval.</p>
    <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><b>Name</b></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><b>Email</b></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
      </tr>
    </table>
    <p style="margin-top: 16px;">Please log in to the admin panel to review and approve/reject this profile.</p>
    <br/>
    <p>– Kalyanamalai System</p>
  </div>
`;