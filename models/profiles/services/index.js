const db = require("../../../config/db");


module.exports.viewProfile = async (viewerId, profileId) => {
  try {
    if (!viewerId || !profileId) {
      return { success: false, message: "Invalid request data" };
    }

    // Get the profile owner
    const profile = await db("profiles")
      .select("user_id")
      .where({ id: profileId })
      .first();

    if (!profile) {
      return { success: false, message: "Profile not found" };
    }

    const viewedUserId = profile.user_id;

    // Check if this viewer has already viewed this profile
    const existingView = await db("profile_views")
      .where({ viewer_id: viewerId, viewed_user_id: viewedUserId })
      .first();

    if (!existingView) {
      // ✅ First time view → insert + set expiry
      await db("profile_views").insert({
        viewer_id: viewerId,
        viewed_user_id: viewedUserId,
        viewed_at: db.fn.now(),
      });

      await db("connections")
        .where({
          from_user: viewedUserId,
          to_user: viewerId,
          status: "Accepted",
        })
        .update({
          expires_at: db.raw("NOW() + INTERVAL 24 HOUR"),
        });

      return { success: true, message: "Profile viewed successfully (first view triggered expiry)" };
    }

    // ✅ Subsequent views → no DB insert, no expiry reset
    return { success: true, message: "Profile already viewed before (expiry unchanged)" };

  } catch (error) {
    return { success: false, message: error.message };
  }
};
