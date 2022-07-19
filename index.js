const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require('dotenv');
const userRoute=require("./routers/users");
const authRoute=require("./routers/auth");
const productRoute=require("./routers/product");
const cardRoute=require("./routers/card");
const orderRoute=require("./routers/order");
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
    console.log(`DB connection succesfully!!!`);})
    .catch((err)=>{
    console.log(err)
})
app.use(express.json());

//ROUTES
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/cards",cardRoute);
app.use("/api/orders",orderRoute)
app.listen(process.env.PORT || 5000,()=>{
    console.log(`Backend server is running!`);
})