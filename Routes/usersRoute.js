const router = require("express").Router();
const userModel = require('../Models/userSchem')
const teamModel = require('../Models/teamSchem')



router.get('/getOne/:id',async(req,res)=>{
    try{
        const id= req.params.id
        const user = await userModel.findById(id)
        
        res.status(200).json({
            status:"Success",
            user :user
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            message: err
        })
    }
})

router.get('/getAll/',async(req,res)=>{
    try{

        const users = await userModel.find()
        
        res.status(200).json({
            status:"Success",
            users
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            message: err
        })
    }
})

router.put('/updateOne/:id',async(req,res)=>{
    try{
        const id = req.params.id
        await userModel.findByIdAndUpdate(id,{$set : req.body,})
        const user = await userModel.findById(id)
        if(user!==null){
            res.status(200).json({
                status:"Success",
                user
            })
        }else{
            res.status(404).json({
                status:"Failed",
                message:'unmatched ID'
            })
        }
    }catch(err){
        res.status(500).json({
            status:'Failed',
            message: err
        })
    }
})


router.delete('/deleteOne/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const user = await userModel.findById(id)
        // case Leader delete the whole team // *After*
        if(user!==null){
            try {
                await userModel.DeleteOne({_id:id})
                res.status(200).json({
                    status:"Success",
                    user :user
                })
            } catch (error) {
                res.status(500).json({
                    status:'failed',
                    message: error
                })
            }
           
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