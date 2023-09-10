const bcrypt = require("bcrypt");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const signUp = (req, res) => {
  const keys = ["first_name", "last_name", "email", "password", "c_password"];
  const { first_name, last_name, email, password, c_password } = req.body;
  for (let item of keys) {
    if (!req?.body[item])
      return res.json({
        success: false,
        message: `${item} is required.`,
      });
  }
  if (password !== c_password)
    return res.json({ success: false, message: "passwords do not match" });
  User.findOne({ email }).then((user) => {
    if (user)
      return res.json({
        success: false,
        message: "email is already in use",
      });
    const newUser = new User({
      first_name,
      last_name,
      email,
      role: "USER",
    });
    bcrypt.hash(password, 10, (err, codedPassword) => {
      if (err) {
        return res.json({
          success: false,
          message: "something went wrong",
        });
      }
      newUser.password = codedPassword;
      newUser
        .save()
        .then((user) => {
          return res.json({
            success: true,
            message: "Account created successfully",
            user,
          });
        })
        .catch((error) =>
          res.json({ success: false, message: "something went wrong", error })
        );
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user)
        return res.json({ success: false, message: "User Doesn't exist" });
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              id: user._id,
              first_name: user.first_name,
              last_name: user.last_name,
            },
            "123456"
          );
          return res.json({
            success: true,
            message: "Logged In Successfully",
            token,
          });
        }
        return res.json({ success: false, message: "Invalid Password" });
      });
    })
    .catch(() => res.json({ success: false, message: "something went wrong" }));
};

module.exports = { signUp, login };
