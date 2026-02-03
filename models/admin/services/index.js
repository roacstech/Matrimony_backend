const db = require("../../../config/db");
const {
  sendApprovalMail,
  sendRejectionMail,
} = require("../../../utils/email");

exports.getPending = async () => {
  const [rows] = await db.query(
    "SELECT id, full_name, email, city, country FROM user_forms WHERE status='PENDING'"
  );
  return rows;
};

exports.approve = async (formId) => {
  const [[form]] = await db.query(
    "SELECT * FROM user_forms WHERE id=?",
    [formId]
  );

  await db.query(
    "UPDATE user_forms SET status='APPROVED' WHERE id=?",
    [formId]
  );

  await db.query(
    "UPDATE users SET status='APPROVED' WHERE id=?",
    [form.user_id]
  );

  await sendApprovalMail(form.email, form.full_name);
};

exports.reject = async (formId, reason) => {
  const [[form]] = await db.query(
    "SELECT * FROM user_forms WHERE id=?",
    [formId]
  );

  await db.query(
    "UPDATE user_forms SET status='REJECTED' WHERE id=?",
    [formId]
  );

  await sendRejectionMail(form.email, form.full_name, reason);
};
