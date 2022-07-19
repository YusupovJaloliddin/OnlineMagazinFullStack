const { verifyTokenAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken");
const Card=require("../models/Card")
const router=require("express").Router();

//CREATE 

router.post("/",verifyToken,async (req,res)=>{
    
    const newCard=new Card(req.body)

    try {
        const savedCard=await newCard.save();
        res.status(200).json(savedCard)    
    } catch (error) {
        res.status(500).json(error);
    }
})

// // //UPDATE
router.put("/:id",verifyTokenAuthorization,async (req,res)=>{
    
    try{
        const updateCard=await  Card.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateCard);
    }catch(error){
        res.status(500).json(error);
    }
})

// // //DELETE 

router.delete("/:id",verifyTokenAuthorization,async(req,res)=>{
    try {
        await Card.findByIdAndDelete(req.params.id);
        res.status(200).json("Card has been deleted!");
    } catch (error) {
        res.status(500).json(error);
    }
})

// // //GET USER  Card

router.get("/find/:userId",verifyTokenAuthorization,async(req,res)=>{
    try {
        const Card=await Card.findOne({userId:req.params.userId});
        res.status(200).json(Card);
    } catch (error) {
        res.status(500).json(error);
    }
})

// // // GET ALL USER CardS

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const cards=await Card.find();
        res.status(200).json(cards);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports=router;