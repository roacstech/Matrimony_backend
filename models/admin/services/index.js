const db = require("../../../config/db");

module.exports.getPendingForms = async () => {
  try {
    const pendingForms = await db("users")
      .where({ status: "PENDING" });

    if (!pendingForms || pendingForms.length === 0) {
      return {
        success: false,
        message: "No pending forms found",
      };
    }

    return {
      success: true,
      message: "Pending forms fetched successfully",
      data: pendingForms,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// REJECT USER + NOTIFICATION


module.exports.rejectUser = async (userId) => {
  try {
    // 🔴 ONLY status update using ID
    const updated = await db("users")
      .where({ id: userId })
      .update({
        status: "REJECTED",
      });

    if (!updated) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // 🔔 Notification insert (optional but recommended)
    await db("notifications").insert({
      user_id: userId, // users.id
      type: "ADMIN_REJECT",
      message: "Your profile was rejected by admin",
      is_read: 0,
      created_at: new Date(),
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
