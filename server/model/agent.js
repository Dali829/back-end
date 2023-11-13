var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    name:{
        type:String,
        required:false,
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
        required:false,
    },
    cityAddress:{
        type:String,
        required:false,
    },
    postalCode:{
        type:String,
        required:false,
    },
    phone:{
        type:String,
        required:false,
    },
    etatCompte:{
        type:String,
        required:false,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:false,
        default:"user"
    },
    isAdmin:{
        type:Boolean,
        required:false,
        default:false
    },
    isAgent:{
        type:String,
        required:false,
        default:"non"
    },
    StatutAgent:{
        type:String,
        required:false,
        default:"non"
    },
    agence: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "agence"
     },
});
var agent=mongoose.model("agent",schema);
module.exports=agent;