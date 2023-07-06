const router = require("express").Router()
const auth = require("../middleware/user_auth")
const category=require("../model/categories")
const product=require("../model/products")
const User =require("../model/users") 
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
router.get("/",async(req,resp)=>{
    const data = await category.find()
    const pdata = await product.find()
    resp.render("index",{catdata:data,pdata:pdata})
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


router.post("/do_register",async(req,resp)=>{
    try {
        const User =new User(req.body)
        const data= await User.save();
        console.log(data);

        resp.render("register",{msg:"Registration successfully done !!!"})

    } catch (error) {
        console.log(error);
    }
})
//********************user login*****************/

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
Cart =require("../model/cart")
router.get("/cart",auth,async(req,resp)=>{
    const user =req.user

    const cartdata=await Cart.aggregate([{$match:{uid:user._id}},{$lookup:{from:"products",localField:"pid",foreignField:"_id",as:"product"}}])
    resp.render("cart",{currentuser:user.uname,cartdata:cartdata})
})
router.get("/add_cart",auth,async(req,resp)=>{
    
    const pid =req.query.pid
    const uid = req.user._id
    try {
        const pdata = await product.findOne({_id:pid})
        const cartdata = await Cart.findOne({pid:pid})
        if(cartdata){
            var qty =cartdata.qty
            qty++;
            var price =qty*pdata.price
            console.log(price); 
            await Cart.findByIdAndUpdate(cartdata._id,{qty:qty,total:price})
            resp.redirect("/")

        }
        else{
        const cart= new Cart({
            uid:uid,
            pid:pid,
            qty:1,
            price:pdata.price,
            total:pdata.price
        })
        await cart.save()
        resp.redirect("/")
    }
    } catch (error) {
     console.log(error);   
    }
})
module.exports=router
//20:08_11