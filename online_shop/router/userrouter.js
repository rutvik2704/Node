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

module.exports=router