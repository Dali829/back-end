var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    regionAddress:{
        type:String,
        required:true
    },
    cityAddress:{
        type:String,
        required:true
    },
    postalCode:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
var customer=mongoose.model("customer",schema);
module.exports=customer;