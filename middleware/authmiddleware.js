// const jwt = require("jsonwebtoken");

// exports.verifyToken = (req, res, next) => {
//   console.log("==== VERIFY TOKEN ====");
//   console.log("AUTH HEADER:", req.headers.authorization);
//   console.log("JWT_SECRET:", process.env.JWT_SECRET);

//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "No token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("DECODED TOKEN:", decoded);

//     req.user = decoded; // { id, email, role }
//     next();
//   } catch (err) {
//     console.error("JWT ERROR:", err.message);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// exports.authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Forbidden" });
//     }
//     next();
//   };
// };///
