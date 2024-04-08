const express = require("express");
const UserModel = require("../model/UserModel");
const router = express.Router();
const passport = require("passport");
const isLoggedIn = require("../middleware");

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/",isLoggedIn,(req, res) => {
  res.render("home");
});
router.post("/signup", async (req, res) => {
try {
    const { username, email, password, gender } = req.body;
    const user = new UserModel({ username, email, gender });
    await UserModel.register(user, password);
    res.redirect("/");
} catch (error) {
    res.send(error.message)
}
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
