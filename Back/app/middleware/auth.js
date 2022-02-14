const jwt = require("jsonwebtoken");

module.exports = {
  validateToken: async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        
        if (!token) {
          return res.status(403).send({
            message: "No token provided!",
          });
        };

      try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.decoded = decodedToken;
        next();
      } catch (error) {
        return res
          .status(401)
          .json({ status: "error", message: "Invalid Authentication.", error });
      }
    } else {
      return res
        .status(401)
        .json({
          status: "error",
          message: "Authentication error. Token required.",
        });
    }
  },
};
