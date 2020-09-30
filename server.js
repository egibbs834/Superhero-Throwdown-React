// Server dependendencies
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("./models/user");

const app = express();
const PORT = process.env.PORT || 3001;

// =================== middleware ===================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // location of react app
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig")(passport);
// console.log("passport: ", passport);
// =================== End of Middleware =============================

// ===================== routes ======================================
app.post("/login", (req, res, next) => {
  console.log("req.body: ", req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      console.log("Username or Password is incorrect");
      res.send("Username or Password is incorrect");
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        // res.redirect("/search");
        res.send("Succesfully Authenticated");
        console.log("Succesfully Authenticated");
        console.log("req.user: ", req.user);
      });
    }
  })(req, res, next);
});

app.post("/signup", (req, res) => {
  console.log("req.body signup: ", req.body);
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) {
      throw err;
    }
    if (doc) {
      console.log("doc: ", doc);
      res.send("User Already Exists");
    }
    if (!doc) {
      if (req.body.password === "" || req.body.password.length < 4) {
        console.log(
          "Error, all fields must be entered and password atleast 4 characters long"
        );
        res.send(
          "Error, all fields must be entered and password atleast 4 characters long"
        );
      } else {
        console.log("Created User");
        res.send("Succesfully Authenticated");
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        await newUser.save().catch((err) => {
          console.log(newUser);
          res.send(err);
        });
      }
    }
  });
});

app.get("/user", (req, res) => {
  res.send(req.user);
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/reactsuperhero", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("🎯 connected to reactsuperhero mongodb");
    app.listen(PORT, () => {
      console.log(
        `🚀 blast off 🚀 =====> app listening on http://localhost:${PORT}`
      );
    });
  });
