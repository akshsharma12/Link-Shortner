const joi=require('joi')

function validate_sign(req,res,next)
{
    const schema=joi.object().keys({
        Username:joi.string().required(),
        Email:joi.string().email({
            minDomainSegments:2,
            tlds:{allow:['com','in']}
        }).required(),
        Password:joi.string().min(8).max(20).required(),
        Confirm_Password:joi.string().valid(joi.ref('Password')).required(),
       }).unknown(false)
 const {error}=schema.validate(req.body,{abortEarly:false})
  if(error)
  {
  res.send(error)
  }else{
    next()
  }
}


function validate_login(req,res,next)
{
  const schema=joi.object().keys({
    Email:joi.string().required(),
    Password:joi.string().required(),
  }).unknown(false)

const {error}=schema.validate(req.body,{abortEarly:false})
if(error)
{
  res.json({
    message:error.message
  })
}else{
  next()
}
}
module.exports={validate_sign,validate_login};