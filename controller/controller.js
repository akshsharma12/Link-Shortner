const Modal = require('../src')
const mongoose = require('mongoose')
const jwt= require('jsonwebtoken')
const qrcode = require('qrcode')
const nodemailer = require('nodemailer')
const shortid = require('shortid');
const Otpgenerate = require('otp-generator')
const secretkey="hello"
const bcrypt=require('bcryptjs')
let globalemail 
let globalshort,globaltoken

async function login(req, res) {
    try 
    {
        const user1 = await Modal.user.findOne({ Email: req.body.Email })
        if (!user1)
            res.send("user not find")
        else {
            const result = await Modal.Otp.findOne({ Email: req.body.Email, isverify: false })
            if (result) {
                res.send("please verify your Email")
            }
            else {
                const result1 = await bcrypt.compare(req.body.Password,user1.Password)
                if (result1){
                    id=user1._id
                 token=jwt.sign({id}, secretkey, { expiresIn: "2h" })
                 globaltoken=token
                    res.render("main")
                }
                else {
                    res.json({ message: "incorrect password" })
                }
            }

           }}catch (err) {
            res.json({message: err.message})
             }
      
}

async function sign_up(req, res) {
    const Otp_number = Otpgenerate.generate(4, { upperCaseAlphabets: false, specialChars: false })
    const users = {
        Userame: req.body.Username,
        Email: req.body.Email,
        Password: req.body.Password,
        Confirm_Password: req.body.Confirm_Password,
    }

    const check = await Modal.user.findOne({ Email: req.body.Email, isregister: true })
    if (check) {
        res.status(200).json({
            statuscode: 200,
            message: "already register"
        })
    }
    else {
        const result = await Modal.user.create(users)

        globalemail = req.body.Email

        const value = await Modal.Otp.create({
            Email: req.body.Email,
            otp: Otp_number
        })
        console.log(Otp_number)
        try {
            const transporter = await nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "akshapptunix@gmail.com",
                    pass: "lbinqvyedyafsuzo"
                }

            })
            const info = await transporter.sendMail({
                from: "Akshay sharma" < "akshapptunix@gmail.com",
                to: req.body.Email,
                subject: "Link Shortner",
                html: `<pr>Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes : 
        ${Otp_number}</pre>`
            })
            res.render("verify", {
                email: req.body.Email,

            })
        } catch (err) {
            res.json({
                message: err
            })
        }
    }
}

async function verify(req, res) {
    // console.log(globalemail)
    try {
        const result = await Modal.Otp.findOne({ Email: globalemail, isverify: false })
        // console.log(result)
        if (result) {
            const result1 = await Modal.Otp.findOne({ Email: globalemail, otp: req.body.otp })
            if (result1) {
                await Modal.Otp.findOneAndUpdate({ Email: globalemail }, { $set: { isverify: true } }, { new: true })
                const result2 = await Modal.Otp.findOne({ Email: globalemail, isverify: true })
                if (result2) {
                    await Modal.user.findOneAndUpdate({ Email: globalemail }, { isregister: true }, { new: true })
                    res.render("login")
                }

            } else {
                res.send("incorrect otp")
            }
        }
    } catch (err) {
        res.send(err)
    }
}

async function qrgenerator(req, res) {
    try {
        const url = req.body.url
        const result = await qrcode.toDataURL(url)
        res.render("Qr", { result })
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

async function urlGenerate(req, res) {
  
    try {
    const body = req.body.url;
    if (!body) return res.status(400).json({ error: "url is required" })
   
        const result = await Modal.Url.create({ 
            full: body,
         })
        globalshort = result.short
        res.redirect("/data")

    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

async function getdata(req, res) {
    try {
        const entry = await Modal.Url.findOne({ short: req.params.id })
        if (entry == null)
            res.json({
                message: "no data found"
            })
        else {
            entry.clicks++
            entry.save()
            res.redirect(entry.full)
        }
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

async function showdata(req, res) {
    const shorturl = await Modal.Url.find()
    const data = await Modal.Url.findOne({ short: globalshort })
    res.render("data", {
        shorturl: shorturl,
        data: data
    })
}
module.exports = { login, sign_up, verify, qrgenerator, urlGenerate, getdata, showdata }