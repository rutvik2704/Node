const router = require("express").Router()
const Admin = require("../model/admin")
const jwt = require("jsonwebtoken")
const aauth = require("../middleware/admin_auth")
const multer = require("multer")
const category=require("../model/categories")

const storage = multer.diskStorage({    
    destination: function (req, file, cb)
    {

       cb(null, "./public/productimg")
       cb(null, "./public/productimg")
   },
   filename: function (req, file, cb) {
     cb(null, file.fieldname + "-" + Date.now()+".jpg")
   }
 })


var upload = multer({
   storage: storage 
})


router.get("/dashboard",aauth,(req,resp)=>{
    resp.render("dashboard")
})

router.get("/admin",(req,resp)=>{
    resp.render("admin_login")
})

router.post("/do_adminlogin", async(req,resp)=>{
    try {
        
            const admin = await Admin.findOne({uname:req.body.uname})

            if(admin.pass===req.body.pass)
            {
                const token = await jwt.sign({_id:admin._id},process.env.A_KEY)
                resp.cookie("ajwt",token)
                resp.redirect("dashboard")
            }
            else{
             
                resp.render("admin_login",{err:"Invalid credentials"})
            }
    } catch (error) {
        console.log(error);
        resp.render("admin_login",{err:"Invalid credentials"})
    }

})
router.get("/admin_logout",aauth,async(req,resp)=>{
    try {
        resp.clearCookie("ajwt")
        resp.render("admin_login")
    } catch (error) {
        
    }
})

/********************************************category*************************/

router.get("/ACategory",aauth,async(req,resp)=>{
    try {
        const catdata = await category.find()
        resp.render("admin_category",{catdata:catdata})
    } catch (error) {
        
    }
    })
router.post("/add_category",async(req,resp)=>{
    try {
        if(req.body.id==""){
            const cat= new category(req.body)
            await cat.save();
            resp.redirect("ACategory")

        }
        else{
            await category.findByIdAndUpdate(req.body.id,{catname:req.body.catname})
            resp.redirect("ACategory")
        }
            
       
    } catch (error) {
        console.log(error);
        
    }
})
router.get("/deletecategory",async(req,resp)=>{
    const _id= req.query.cid;
    try {
        await category.findByIdAndDelete(_id)
        resp.redirect("ACategory")

    } catch (error) {
        console.log(error);
    }
})
router.get("/editcategory",async(req,resp)=>{
    const _id= req.query.cid;
    try {
        const data= await category.findOne({_id:_id})
        const catdata = await category.find()
        resp.render("admin_category",{edata:data,catdata:catdata})

    } catch (error) {
        console.log(error);
    }
})
/***************************************product*********************************************** */
const product=require("../model/products")
const categories = require("../model/categories")
router.get("/Aproduct",aauth,async(req,resp)=>{
    try {
        const catdata = await category.find()
        const pdata = await product.aggregate([{$lookup:{from:"categories",localField:"catid",foreignField:"_id",as:"category"}}])
        console.log(pdata);
        resp.render("admin_product",{catdata:catdata,pdata:pdata})
    } catch (error) {
        console.log(error);
    }
    })
    router.post("/add_product",upload.single("file"),async(req,resp)=>{
        try {
            if(req.body.id==""){
                const prod= new product({
                    catid:req.body.catid,
                    pname:req.body.pname,
                    price:req.body.price,
                    qty:req.body.qty,
                    img:req.file.filename
                })
           
                await prod.save();
                resp.redirect("Aproduct")
    
            }
            else{
                await product.findByIdAndUpdate(req.body.id,{
                    catname:req.body.catname,
                    pname:req.body.pname,
                    price:req.body.price,
                    qty:req.body.qty,
                    img:req.file.filename
                })
                resp.redirect("Aproduct")
            }
                
           
        } catch (error) {
            console.log(error);
            
        }
    })
    router.get("/deleteproduct",async(req,resp)=>{
        const _id= req.query.pid;
        try {
            await product.findByIdAndDelete(_id)
            resp.redirect("Aproduct")
    
        } catch (error) {
            console.log(error);
        }
    })
    router.get("/editproduct",async(req,resp)=>{
        const _id= req.query.pid;
        try {
            const data= await product.findOne({_id:_id})
            const pdata = await product.find()
            resp.render("admin_product",{edata:data,pdata:pdata})
    
        } catch (error) {
            console.log(error);
        }
    })
/***************************user*********************/
    router.get("/viewusers",async(req,resp)=>{
        User = require("../model/users")
        try {
            const users = await User.find()
            resp.render("admin_users",{userdata:users})
            
        } catch (error) {
            console.log(error);
        }
    })





module.exports=router
