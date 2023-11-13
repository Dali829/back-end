var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    customerId:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    productCount:
    {
        type:String,
        required:true
    },
    subTotalPrice:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true
    }
});







var panier=mongoose.model("panier",schema);
module.exports=panier;