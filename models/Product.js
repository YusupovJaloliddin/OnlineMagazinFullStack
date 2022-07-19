const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    img:{type:String,required:true},
    categories:{type:Array},
    size:{type:String},
    color:{type:String},
    price:{type:Number,required:true}
},{timestamps:true})

module.exports=mongoose.model("Product",productSchema);