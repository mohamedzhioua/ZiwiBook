const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Load User model
const User = require("../models/user");
// Load input validation
const SignupValidation =require('../validator/SignupValidation')
module.exports = {
  //  --------------------------------------- //signup method to add a new user//--------------------------- //
  signup: async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
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
            await User.create({
              firstname,
              lastname,
              email,
              password: hashedpassword,
            });
            res.status(201).json({ message: "user added with success" });
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  signin: async (req, res) => {},
  logout: async (req, res) => {},
};
