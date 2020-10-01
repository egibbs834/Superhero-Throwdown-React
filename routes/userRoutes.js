const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const passportLocal = require("passport-local").Strategy;

module.exports = (app) => {
  app.post("/api/login", (req, res, next) => {
    console.log("req.body: ", req.body);
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) {
        console.log("Username or Password is incorrect");
        res.send("Username or Password is incorrect");
      } else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Succesfully Authenticated");
          console.log("Succesfully Authenticated");
          console.log("req.user: ", req.user);
        });
      }
    })(req, res, next);
  });

  app.post("/api/signup", (req, res) => {
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

  app.get("/logout", (req, res) => {
    req.logout();
    console.log("req.user: ", req.user);
    res.send();
  });
};
