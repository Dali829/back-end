var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:false
    },
    regionAddress:{
        type:String,
        required:false
    },
    cityAddress:{
        type:String,
        required:false
    },
    postalCode:{
        type:String,
        required:false
    },
    phone:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    }
});
var admin=mongoose.model("admin",schema);
module.exports=admin;