const router = require("express").Router()
const auth=require("../middleware/user_auth")
router.get("/",(req,resp)=>{
    resp.render("index")
})
router.get("/contact",(req,resp)=>{
    const user =req.user
    resp.render("contact")
})
router.get("/blog",(req,resp)=>{
    const user =req.user
    resp.render("blog")
})
router.get("/product",(req,resp)=>{
    const user =req.user
    resp.render("product")
})
router.get("/about",(req,resp)=>{
    const user =req.user
    resp.render("about")
})
router.get("/login",(req,resp)=>{
    resp.render("login")
})
router.get("/reg",(req,resp)=>{
    resp.render("register")
})
router.get("/cart",auth,(req,resp)=>{
    const user =req.user
    resp.render("cart")
})
//************************user register***************/
const user =require("../model/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
router.post("/do_register",async(req,resp)=>{
    try {
        const User =new user(req.body)
        await User.save();
        resp.render("register",{msg:"Registration successfully done !!!"})

    } catch (error) {
        console.log(error);
    }
})
//********************user login*****************/
router.post("/do_login",async(req,resp)=>{
    try {
        const useremail = req.body.email
        const userpass = req.body.pass
        const user = await User.findOne({email:useremail})
        if (user.Tokens.length >= 3) {
            resp.render("login", { err: "Max login limit reached !!!!" })
            return;
        }

        const isMatch = bcrypt.compare(userpass,user.pass)
        if(isMatch){
            const token = await jwt.sign({_id:user._id},process.env.S_KEY) 
            console.log(token);
            resp.cookie("jwt",token)
            
            resp.render("index",{currentuser:user.uname})
        }
        else{
            resp.render("login",{err:"Invalid credentials !!!"})
        }
    } catch (error) {
        resp.render("login",{err:"Invalid credentials !!!"})
    }
})
module.exports=router