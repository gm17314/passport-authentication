const express = require("express")
const app = express()
const path = require("path");
const mongoose = require('mongoose');
const authRouter = require("./routes/auth");
const passport = require("passport")
const LocalStrategy = require("passport-local")
const session = require("express-session")
const UserModel = require("./model/UserModel")


mongoose.connect('mongodb://127.0.0.1:27017/passport-auth')
.then(()=>{console.log("Db connected")})
.catch((err)=>{console.log(err.message)})

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'pkcd',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }))
app.use(passport.initialize())
app.use(passport.session())
  
// use static serialize and deserialize of model for passport session support
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

passport.use(new LocalStrategy(UserModel.authenticate()));

app.use(authRouter);




app.listen(8080,()=>{
    console.log("Server connected at 8080")
})