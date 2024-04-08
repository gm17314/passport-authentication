const express = require("express");
const UserModel = require("../model/UserModel");
const router = express.Router();
const passport = require("passport")

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/", (req, res) => {
  res.render("home");
});
router.post("/signup", async (req, res) => {
  const { username, email, password, gender } = req.body;
  const user = new UserModel({ username, email, gender });
  const newUser = await UserModel.register(user, password);
  res.redirect("/");
});

router.post("/login",passport.authenticate("local", { failureRedirect: "/login" }),function (req, res) {
    res.redirect("/");
  }
);
router.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });


module.exports = router;
