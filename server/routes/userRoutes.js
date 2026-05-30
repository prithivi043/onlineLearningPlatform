const express = require("express");
const router = express.Router();

const User =
  require("../models/User");

router.get("/:id",
  async (req, res) => {

    const user =
      await User.findById(
        req.params.id
      );

    res.json(user);
});

router.put("/:id",
  async (req, res) => {

    const updated =
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updated);
});

module.exports = router;