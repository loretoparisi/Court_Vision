const express = require("express");
const router = express.Router();
// const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/Users");

// @routeGET    GET api/profile/me
// @desc        get current users profile
// @access      private - needs token

// asnyc await used because we are using mongoos promise
router.get("/me", async (req, res) => {
  try {
    // get the user from user profile
    profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "name"
    );

    // next check to see if there is no profile
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    // if there is a profile we share that
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;