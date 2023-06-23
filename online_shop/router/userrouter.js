const router = require("express").Router()

router.get("/",(req,resp)=>{
    resp.render("index")
})
router.get("/contact",(req,resp)=>{
    resp.render("contact")
})
router.get("/blog",(req,resp)=>{
    resp.render("blog")
})
router.get("/product",(req,resp)=>{
    resp.render("product")
})
router.get("/about",(req,resp)=>{
    resp.render("about")
})
router.get("/login",(req,resp)=>{
    resp.render("login")
})
router.get("/reg",(req,resp)=>{
    resp.render("register")
})
router.get("/cart",(req,resp)=>{
    resp.render("cart")
})
//************************user register************** */
const user =require("../model/users")
router.post("/do_register",async(req,resp)=>{
    try {
        const User =new user(req.body)
        await User.save();
        resp.render("register",{msg:"Registration successfully done !!!"})

    } catch (error) {
        console.log(error);
    }
})
module.exports=router