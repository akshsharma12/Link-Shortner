const mongoose=require('mongoose')
const schema= mongoose.Schema({
    Email:{
        type:String
    },
    otp:{
        type:String,
    },
    isverify:{
        type:Boolean,
        default:false,
    }
})

const user= mongoose.model('otp',schema)
module.exports=user;