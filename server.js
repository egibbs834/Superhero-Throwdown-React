// Server dependendencies
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
// const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
// const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("./models/user");
const Villain = require("./models/villains");

const app = express();
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// =================== middleware
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

// =================== end of middleware

// ===================== routes
require("./routes/villainRoutes")(app);
require("./routes/heroRoutes")(app);
require("./routes/userRoutes")(app);

// ===================== end of routes

// mongoose.connect before linking Mongo Atlas database to deployed heroku app
// mongoose
//   .connect(process.env.MONGODB_URI || "mongodb://localhost/reactsuperhero", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactsuperhero",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

// .then(() => {
// console.log("🎯 connected to reactsuperhero mongodb");
app.listen(PORT, () => {
  console.log(
    `🚀 blast off 🚀 =====> app listening on http://localhost:${PORT}`
  );
});
// });
