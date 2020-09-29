// Server dependendencies
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactsuperhero"
);
app.listen(PORT, () => {
  console.log(`🚀Blast off🚀 =====> App listening on http://localhost:${PORT}`);
});