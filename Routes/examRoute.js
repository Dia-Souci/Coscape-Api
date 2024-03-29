const router = require("express").Router();
const userModel = require('../Models/userSchem')





router.put('/reduceChances/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const user = await userModel.findByIdAndUpdate(id,{ $inc: { chances: -1 } }, { new: true })
        if(user!==null){
            if (user.chances === 0 ){
                try {
                    await userModel.findByIdAndUpdate(id,{ $set: { stateOfexams : 'disqualified' } }, { new: true })
                } catch (error) {
                    res.status(500).json({
                        status:'Failed',
                        message: 'Couldnt set user status to disqualified'
                    })
                }
            }
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



router.put('/Qualify/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const user =await userModel.findByIdAndUpdate(id,{$set : {stateOfexams : 'qualified'}}, { new: true })
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






module.exports = router;