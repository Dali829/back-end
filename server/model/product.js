var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    unitPrice:{
        type:Number,
        required:true
    },
    productImage:{
        type:String,
        required:false
    },
    categoryId:{
        type:String,
        required:true
    }
});







var product=mongoose.model("product",schema);
module.exports=product;