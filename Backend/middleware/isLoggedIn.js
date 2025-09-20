const jwt = require("jsonwebtoken")


const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided. Please log in....!!!" });
  }

  const token = authHeader.split(" ")[1]; // Format: Bearer <token>

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("JWT Error:", err.message);
      return res.status(401).json({ message: "Invalid or expired token. Please log in." });
    }

    req.user = decoded; // attach decoded payload to request
    next(); // proceed to next middleware/controller
  });
};

module.exports={
    isLoggedIn
}