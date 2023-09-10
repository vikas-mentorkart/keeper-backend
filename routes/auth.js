const router = require("express").Router();
const isLoggedIn = require("../middlewares/auth");
const User = require("../models/users");

const { signUp, login } = require("../controllers/auth");

router.post("/login", login);
router.post("/signup", signUp);
router.get("/logintest", isLoggedIn, (req, res) => {
  User.find({})
    .then((users) => {
      return res.json(users);
    })
    .catch(() => {
      return res.json("something went wrong");
    });
});

module.exports = router;
