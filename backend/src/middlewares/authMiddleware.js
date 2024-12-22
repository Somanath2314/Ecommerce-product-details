import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({
  path: "../.env"
});

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  // Check if token is provided
  if (!token) {
    return res.status(401).send("Access denied... No token provided...");
  }

  try {
    // Decode the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    // Set email and objectId to req.user
    req.user = decoded.email

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid or expired, clear the cookie and return an error
    res.clearCookie("token");
    return res.status(400).send(err.message);
  }
};

export default authMiddleware;
