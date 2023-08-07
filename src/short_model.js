const mongoose=require('mongoose')
const shortId=require('shortid')

const userschema= new mongoose.Schema({
   user_id:{
      type:mongoose.Schema.Types.ObjectId, ref:'user'
   }
,
full:{
   type:String,
   required:true
},
short:{
   type:String,
   required:true, 
   default:shortId.generate
},
clicks:{
   type:Number,
   required:true,
   default:0
}
},
{timeStamp:true}
);

const URL=mongoose.model("url",userschema)

module.exports=URL