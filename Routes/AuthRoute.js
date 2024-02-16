const router = require("express").Router();
const userModel = require('../Models/userSchem')
const teamModel = require('../Models/teamSchem')
const crypto = require('crypto');

// Generate a random secret with a specified length (e.g., 32 bytes)
const generateSecret = (length) => {
  return crypto.randomBytes(length).toString('hex');
};



router.post("/register", async (req, res) => {
  try {
    const team = new teamModel({
        teamName: req.body.teamName,
    })
    try {
        await team.save();
        console.log('Team saved');
    } catch (error) {
        console.error('Error saving team:', error);
    }
    // Generate a 256-bit (32-byte) secret
    const secret = generateSecret(16);
    //Registration

    const user = new userModel({
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName,
        role: 'Leader',
        teamName: req.body.teamName,
        inviteCode : secret
      });
    try {
        await user.save();
        res.status(200).json({
        status: "success",
        user,
        });
    } catch (error) {
        console.error('Error saving user:', error);
    }
    
    
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({
        status: "failed",
        message: "user email not found",
      });
    } else {
      if (user.password !== req.body.password) {
        res.status(400).json({
          status: "failed",
          message: "Invalid Password",
        });
      } else {
        res.status(200).json({
          status: "success",
          user,
        });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;