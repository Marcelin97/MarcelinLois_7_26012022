const jwt = require("jsonwebtoken");

module.exports = {
  validateToken: async (req, res, next) => {
    //  catch TokenExpiredError in verifyToken()
    const { TokenExpiredError } = jwt;
    const catchError = (err, res) => {
      if (err instanceof TokenExpiredError) {
        return res
          .status(401)
          .send({ message: "Unauthorized! Access Token was expired!" });
      }
      return res.sendStatus(401).send({ message: "Unauthorized!" });
    };

    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(403).send({
          message: "No token provided!",
        });
      }

      try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        // req.decoded = decodedToken;
        // next();
        return decodedToken;
      } catch (error) {
        return res
          .status(401)
          .json({ status: "error", message: "Invalid Authentication.", error });
      }
    } else {
      return res.status(401).json({
        status: "error",
        message: "Authentication error. Token required.",
      });
    }
  },
};
