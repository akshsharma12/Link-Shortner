const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const bodyparser=require('body-parser')
const templatepath=path.join(__dirname,'./tempelates')
const router=require('./routes/routes')
const session=require('express-session')


const mongoose= require('mongoose')
mongoose.connect("mongodb://localhost:27017/project")
.then(()=>{
 console.log("mongodb connected")
})
.catch((err)=>
    {
console.log(err )
})


app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatepath)
app.use(express.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(router)
app.use('/public',express.static("public"));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));



app.get("/",(req,res)=>{
    res.render("home") //homee
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get("/sign",(req,res)=>{
    res.render("sign") //sign.hsb
})
app.get('/qr',(req,res)=>{
    res.render("Qr")
})

app.get('/verify',(req,res)=>{
    res.render("verify")
})
app.get('/shortlink',async(req,res)=>{
    // const shorturl= await Modal.Url.find()
    // res.render("shortlink",{short:shorturl})
    res.render('shortlink')
})
app.get('/data',(req,res)=>{
    res.render('data')
})
app.get('/main',(req,res)=>{
    res.render("main")
})
app.listen(4001,()=>
{
    console.log("port connected")
})