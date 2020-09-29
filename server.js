// Server dependendencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const user = require("./models/user");

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // location of react app
    credentials: true,
  })
);

app.use(
  expressSession({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));

// routes
app.post("/login", (req, res) => {
  console.log("req.body login: ", req.body);
});

app.post("/signup", (req, res) => {
  console.log("req.body signup: ", req.body);
  user.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const newUser = new user({
        email: req.body.email,
        password: req.body.password,
      });
      await newUser.save();
      res.send("User has been created");
    }
  });
});

app.get("/user", (req, res) => {});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/reactsuperhero", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("🎯connected to reactsuperhero mongodb");
    app.listen(PORT, () => {
      console.log(
        `🚀Blast off🚀 =====> App listening on http://localhost:${PORT}`
      );
    });
  });
