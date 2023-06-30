const router = require("express").Router()
const auth = require("../middleware/user_auth")
const category=require("../model/categories")
router.get("/",async(req,resp)=>{
    const data = await category.find()
    resp.render("index",{catdata:data})
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


//************************user register***************/
const user =require("../model/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
router.post("/do_register",async(req,resp)=>{
    try {
        const User =new user(req.body)
        const data= await User.save();
        console.log(data);

        resp.render("register",{msg:"Registration successfully done !!!"})

    } catch (error) {
        console.log(error);
    }
})
//********************user login*****************/
 const User =require("../model/users") 
router.post("/do_login",async(req,resp)=>{
    try {
        const udata = await User.findOne({email:req.body.email})
        console.log(udata);
        const isvalid = await bcrypt.compare(req.body.pass,udata.pass)
        if(isvalid)
        {
            const token  = await jwt.sign({_id:udata._id},process.env.S_KEY)
            console.log(token);
            resp.cookie("jwt",token)
            resp.redirect("/")
        }
        else
        {
            resp.render("login",{err:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
         resp.render("login",{err:"Invalid credentials"})
    }
})
/************************cart**********************/
router.get("/cart",auth,(req,resp)=>{
    const user =req.user
    resp.render("cart")
})
module.exports=router