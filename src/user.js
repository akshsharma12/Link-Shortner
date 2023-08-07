const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const schema=new mongoose.Schema({
    Username:{
        type:String,
       require:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },
    Confirm_Password:{
        type:String,
        required:true,
    },
    isregister:{
        type:Boolean,
        default:false
    }
   
})

schema.pre('save',async function(next){
    this.Password= await bcrypt.hash(this.Password,10)
    next()
})
const user=new mongoose.model('user1',schema)

module.exports=user