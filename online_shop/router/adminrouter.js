const router = require("express").Router()

router.get("/admin_login",(req,resp)=>{
    resp.render("admin_login")
})
router.get("/dashboard",(req,resp)=>{
    resp.render("dashboard")
})

router.post("do_adminlogin",async(req,resp)=>{
try {
    const admin = await Admin.findOne({aname:req.body,aname})
    if(admin.pass==req.body.pass){
        resp.redirect("dashboard")

    }
    else{
        resp.render("admin_login",{err:"Invalid credentials"})
    }
} catch (error) {
    resp.render("admin_login",{err:"Invalid credentials"})
}
})

module.exports=router