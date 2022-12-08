const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function checkAuth() {
  try {
    const token = req.cookies.Authorization;
    //decoding the token
    var decoded = jwt.verify(token, "zhioua_DOING_GOOD");
    // checking the ExpirationTime
    if (Date.now() > decoded.exp) return res.sendStatus(401);
    //finding the user using decoded sub
    const user = await User.findById(decoded.sub);
    if (!user) return res.sendStatus(401);
    // attach user to req
    req.user = user;

    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

module.exports = checkAuth;
