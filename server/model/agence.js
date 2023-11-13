var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    nomAgence:{
        type:String,
        required:false,
        
    }
    ,
    lieu:{
        type:String,
        required:false,
        
    },
    categorie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
        
    },
   
});







var agence=mongoose.model("agence",schema);
module.exports=agence;