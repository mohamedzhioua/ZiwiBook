const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function checkAuth(req, res, next) {
  try {
    const token = req.cookies.Authorization;
    console.log("🚀 ~ file: checkAuth.js:7 ~ checkAuth ~ token", token);
    //decoding the token
    var decoded = jwt.verify(token, "zhioua_DOING_GOOD");
      //finding the user using decoded sub
      const user = await User.findById(decoded.sub);
      console.log("🚀 ~ file: checkAuth.js:12 ~ checkAuth ~ user", user)
    // checking the ExpirationTime
    if (Date.now() > decoded.exp) {
      return res.status(400).json("token expired");
    }
    if (!user) {
      return res.status(401).json("user not found");
    } else {
      // attach user to req
      req.user = user;

      next();
    }
  } catch (error) {
    console.log(error.message);
      res.status(403).json("unauthorized");
  }
}

module.exports = checkAuth;
