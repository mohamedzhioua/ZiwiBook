const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function checkAuth(req, res, next) {
  let token;
  try {
    //  check if token exist
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
     } else if (req.cookies.Authorization) {
      token = req.cookies.Authorization;
     }
    if (!token)
      return res
        .status(401)
        .json("You are not logged in, please log in to access");
    //decoding the token
    var decoded = jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET);
    //finding the user using decoded sub
    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json("user not found");
    } else {
      // attach user to req
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = checkAuth;
