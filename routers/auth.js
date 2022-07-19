const router=require("express").Router();
const User = require("../models/User");
const CryptoJS=require("crypto-js");
const dotenv=require("dotenv");
const jwt=require("jsonwebtoken");

dotenv.config();
//REGISTER 
router.post("/register",async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_PASSWORD).toString()
    })

    try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser)
    } catch (error) {
    res.status(500).json(error.message)
    }
})

//LOGIN

router.post("/login",async(req,res)=>{
    try {
        const user = await User.findOne({
            username:req.body.username
        });
        if(!user){
            res.status(401).json("Wrong credetials!");
        }else{
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_PASSWORD
        );
        const OrignalPassword=hashedPassword.toString(CryptoJS.enc.Utf8);
        if(OrignalPassword!==req.body.password){
            res.status(401).json("Wrong credetials!");
        }else{
            const accesToken=jwt.sign({
                id:user._id,
                isAdmin:user.isAdmin
            },process.env.JWT_SECRET,
            {expiresIn:"3d"})

            const {password,...others} = user._doc;
            res.status(200).json({msg:"Login succesfully",msgJWT:"jwt is expires in 3 days",...others,accesToken});
        }
    }
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports=router;