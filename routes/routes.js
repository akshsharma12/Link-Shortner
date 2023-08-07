const express=require('express')
const router=express.Router();
const controller=require('../controller/controller')
const {validate_sign,validate_login}=require('../validate/validate');


router.post('/login',validate_login,controller.login)
router.post('/sign',validate_sign,controller.sign_up)
router.post('/verify',controller.verify)
router.post('/shortlink',controller.urlGenerate)
router.get('/get/:id',controller.getdata)
router.post('/qr',controller.qrgenerator)
router.get("/data",controller.showdata)

module.exports=router;
