var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    datedebut:{
        type:String ,
        required:true
    },
    datefin:{
        type:String ,
        required:true
    },
    prix:{
        type:Number ,
        required:true
    },
    numbrJour:{
        type:Number ,
        required:true
    },
    agent: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "agent"
     },
     product: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
     },
     statut:{
        type:String,
        required:false,
        default:"non"
    }
   
});
var reservation=mongoose.model("reservation",schema);
module.exports=reservation;

















