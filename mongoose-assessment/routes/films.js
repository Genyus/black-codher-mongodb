const express = require("express");

const router = express.Router();
const Film = require("../models/Film");
// all this start with "/films"
router.get("/", (req, res) => {
  res.send("we are on films");
});

router.post("/", (req, res) => {
  console.log(req.body);
});

router.get("/list", async (req, res) => {
  try {
    const film = await Film.find({}); //i for case insensitive
    res.status(200).json({
      status: true,
      res: film,
    });
  } catch (err) {
    res.status(400).json({
      status: true,
      error: err.message,
    });
  }
});

module.exports = router;
