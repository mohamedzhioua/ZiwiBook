const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const SignupValidation = require("../validator/SignupValidation");
const SigninValidation = require("../validator/SigninValidation");

module.exports = {
  //  --------------------------------------- //signup method to add a new user//--------------------------- //
  signup: async (req, res) => {
    const { email, password } = req.body;

    const { errors, isValid } = SignupValidation(req.body);
    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        await User.findOne({ email }).then(async (exist) => {
          if (exist) {
            errors.email = "Email already in use";
            res.status(404).json(errors);
          } else {
            const hashedpassword = bcrypt.hashSync(password, 8);
            req.body.password = hashedpassword;
            await User.create(req.body);
            res.status(201).json({ message: "user added with success" });
          }
        });
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  --------------------------------------- //signin method to add a new user//--------------------------- //

  signin: async (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = SigninValidation(req.body);

    try {
      if (!isValid) {
        return res.status(404).json(errors);
      } else {
        await User.findOne({ email }).then(async (user) => {
          if (!user) {
            errors.email =
              "Email does not exist ! please Enter the right Email or You can make account";
            return res.status(404).json(errors);
          }
          // Compare sent in password with found user hashed password
          const passwordMatch = bcrypt.compareSync(password, user.password);
          if (!passwordMatch) {
            errors.password = "Wrong Password";
            return res.status(404).json(errors);
          } else {
            // generate a token and send to client
            const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
            const token = jwt.sign(
              { "sub": user._id  },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "7d" }
           
            );
            // Authorization
            const options = {
              expires: new Date(exp),
              httpOnly: false, //accessible only by web server
              secure: true, //https
              sameSite: "None", //cross-site cookie
            };
            res.cookie("Authorization", token, options);
            res.status(201).json({
              token,
              user,
            });
          }
        });
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  --------------------------------------- // logout method //--------------------------- //

  logout: async (req, res) => {
    try {
      res.clearCookie("Authorization");
      res.status(200).json(" You are logged out , to the next login !");
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};
