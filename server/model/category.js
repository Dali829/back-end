var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    categoryDescription:{
        type:String,
        required:false
    },
    categoryPhoto:{
        type:String,
        required:false
    },
    agence:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "agent"
        
    },
});







var category=mongoose.model("category",schema);
module.exports=category;