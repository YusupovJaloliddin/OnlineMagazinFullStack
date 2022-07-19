const { verifyTokenAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken");
const Order=require("../models/Order")
const router=require("express").Router();

//CREATE 

router.post("/",verifyToken,async (req,res)=>{    
    const newOrder=new Order(req.body)
    try {
        const savedOrder=await newOrder.save();
        res.status(200).json(savedOrder)    
    } catch (error) {
        res.status(500).json(error);
    }
})

// // //UPDATE
router.put("/:id",verifyTokenAndAdmin,async (req,res)=>{
    
    try{
        const updateOrder=await  Order.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateOrder);
    }catch(error){
        res.status(500).json(error);
    }
})

// // //DELETE 

router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted!");
    } catch (error) {
        res.status(500).json(error);
    }
})

// // //GET USER  Orders

router.get("/find/:userId",verifyTokenAuthorization,async(req,res)=>{
    try {
        const Orders=await Order.find({userId:req.params.userId});
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json(error);
    }
})

// // // GET ALL USER OrderS

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const Orders=await Order.find();
        res.status(200).json(Orders);
    }catch(err){
        res.status(500).json(err);
    }
})
//GET MONTHLY INCOME

router.get("/income",verifyTokenAndAdmin,async(req,res)=>{
    const date=new Date();
    const lastMonth=new Date(date.setMonth(date.getMonth()-1));
    const priviousMonth=new Date(new Date().setMonth(lastMonth.getMonth()-1));
    try {
        const income=await Order.aggredate([
            {$match:{createdAt:{$gte:priviousMonth}}
        },
            {
                $project:{
                    month:{$month:"$createdAt"},
                    sales:"$amount"
                },
                    $group:{
                        _id:"$month",
                        total:{$sum:"$sales"}
                    }
                
            }
        ]);
        res.status(200).json(income);}
        catch(err){
            res.status(500).json(err);
        }
});
module.exports=router;