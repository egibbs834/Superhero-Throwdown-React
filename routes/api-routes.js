const { db } = require("../models/villains");

const router = require("express").Router();
const villainsController = require("../controllers/villainsController");

// match with /api/villain_data
router.route("/").get(villainsController.findAll);

router.route("/search").get(villainsController.randomizeOne);
