// Server dependendencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookkie-parser");
const expressSession = require("express-session");

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

app.post("/register", (req, res) => {
  console.log("req.body register: ", req.body);
});

app.get("/user", (req, res) => {});

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactsuperhero"
);

app.listen(PORT, () => {
  console.log(`🚀Blast off🚀 =====> App listening on http://localhost:${PORT}`);
});
