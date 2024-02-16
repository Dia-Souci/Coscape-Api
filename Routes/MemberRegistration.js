const router = require("express").Router();
const userModel = require('../Models/userSchem')

//Registration

router.post("/register", async (req, res) => {
  try {
    const Leader = await userModel.find({inviteCode : req.body.inviteCode , teamName: req.body.teamName})

    if(!Leader){
        res.status(400).json({
            status: "failed",
            message: "wrong invite code or team name",
        })
    }else{
        const user = new userModel({
            email: req.body.email,
            password: req.body.password,
            fullName: req.body.fullName,
            teamName: req.body.teamName,
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
          
    }
    
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err,
    });
  }
});


module.exports = router;