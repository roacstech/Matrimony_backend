const service = require("../services/index");

module.exports.submitProfile = async (req, res) => {
  console.log("SUBMIT BODY 👉", req.body);
  console.log("USER FROM TOKEN 👉", req.user);

  // const userId = req.user.id;
 

  try {
    const response = await service.submitProfile(req.body, req.files, req.user);
    if (!response.success) {
      return res.status(400).json({
        success: false,
        message: response.message,
      });
    }

    return res.status(201).json(
  {
      
      success: true,
      message: response.message,
      data: response.data,
    });
    
  } catch (err) {
  
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.getVisibleConnections = async (req, res) => {
  try {
    const result = await service.getVisibleConnections(req.user.id);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// module.exports.getUserProfile = async (req, res) => {

//   const userId = req.params.id;

//   try {
//     const response = await service.getUserProfileService(userId);

//    if(!response){
//     return {
//       success : false,
//       message : response.message
//     }
//    }

//     return res.status(200).json({
//       success: true,
//       data: response.data,
//     });
//   } catch (err) {

//     console.log(err)
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

module.exports.sendConnectionRequest = async (req, res) => {
  try {
    const fromUserId = req.user.id;
    const { profileId } = req.body;

    console.log(req.user.id, req.body);

    if (!fromUserId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!profileId) {
      return res.status(400).json({
        success: false,
        message: "profileId is required",
      });
    }

    const result = await service.sendConnectionRequest(fromUserId, profileId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json({
      success: true,
      message: "Connection request sent",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// My connection

module.exports.getReceivedConnections = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("user test", req.user);

    const data = await service.getReceivedConnections(userId);
    console.log("data");

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/// GET SENTCONNECTION
module.exports.getSentConnections = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await service.getSentConnections(userId);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//// GET ACEPET CONNECCTIONS

module.exports.acceptConnection = async (req, res) => {
  try {
    const connectionId = parseInt(req.params.id);
    console.log("test connection", connectionId);
    const userId = req.user.id;
    console.log("ID:", req.params.id);
    console.log("USER:", req.user.id);

    if (!connectionId) {
      return res.status(400).json({
        success: false,
        message: "Invalid connection id",
      });
    }

    const result = await service.acceptConnection(connectionId, userId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

///REJECT CONNECTIONS

module.exports.rejectConnection = async (req, res) => {
  try {
    const connectionId = Number(req.params.id);
    const userId = req.user.id; // from JWT

    const result = await service.rejectConnection(connectionId, userId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error("Reject connection error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * WITHDRAW
 */
module.exports.withdrawConnection = async (req, res) => {
  try {
    const connectionId = req.params.id;
    const userId = req.user.id; // from_user

    const result = await service.withdrawConnection(connectionId, userId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.json({
      success: true,
      message: "Connection withdrawn successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

////  Update Profile
module.exports.updateUserProfile = async (req, res) => {
console.log("Incoming body:", req.body);


  try {
    const userid = req.user.id; // 🔥 from token
   
console.log("TOKEN USER ID:", req.user.id);


    const response = await service.updateUserProfile({
      userid,
      ...req.body,
      
    });
    console.log("test response", response)

    return res.status(200).json({
      success: true,
      message: response.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//upload Photos

module.exports.uploadProfilePhoto = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Photo file is required",
      });
    }

    const response = await service.uploadProfilePhoto({
      userId,
      file,
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getUserProfile = async (req, res) => {
  console.log("REQ.USER =>", req.user);

  const userId = req.user.id; // make sure route uses :id

  // if (!userId) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "user_id missing",
  //   });
  // }

  try {
    const response = await service.getUserProfileService(userId);

    if (!response.success) {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
