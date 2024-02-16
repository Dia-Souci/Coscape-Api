const router = require("express").Router();
const userModel = require('../Models/userSchem')
const teamModel = require('../Models/teamSchem')



router.get('/teamMembers/:id',async(req,res)=>{
    try{
        const id= req.params.id
        const team = await teamModel.findById(id)
        const users = await userModel.find({teamName : team.teamName})
        res.status(200).json({
            status:"Success",
            users :users
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            message: err
        })
    }
})

//extra
router.put('/update/:id',async(req,res)=>{
    try{
        const id= req.params.id
        const teamOld = await teamModel.findById(id)
        if(teamOld){
            try {
               const newTeam = await teamModel.UpdateOne({_id:id},{$set : req.body,})
               try {
                const team = await teamModel.findById(id)
                await userModel.updateMany({teamName : teamOld.teamName} , {$set : {teamName : newTeam.teamName}})
               } catch (error) {
                console.log('Could not update teamName for users')
               }
            } catch (error) {
                console.log('could not update team name ')
            }
            
            res.status(200).json({
                status:"Success",
                team :team
            })
        }else{
            res.status(404).json({
                status:"Failed",
                message:'unmatched ID'
            })
        }
       
    }catch(err){
        res.status(500).json({
            status:'failed',
            message: err
        })
    }
})

module.exports = router;