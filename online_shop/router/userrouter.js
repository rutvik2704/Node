const router = require("express").Router()
const auth = require("../middleware/user_auth")
const category=require("../model/categories")
const product=require("../model/products")
const User =require("../model/users") 
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Razorpay = require("razorpay")
const Order=require("../model/orders")

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
        const isvalid = await bcrypt.compare(req.body.pass,udata.pass)
        if(isvalid)
        {
            const token  = await jwt.sign({_id:udata._id},process.env.S_KEY)
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
    var sum =0;
    for(var i=0;i<cartdata.length;i++)
    {
        sum = sum + cartdata[i].total
    }
    resp.render("cart",{currentuser:user.uname,cartdata:cartdata,sum:sum})
})
router.get("/add_cart",auth,async(req,resp)=>{
    
    const pid =req.query.pid
    const uid = req.user._id
    try {
        const pdata = await product.findOne({_id:pid})
        const cartdata = await Cart.findOne({$and:[{pid:pid},{uid:uid}]})

        if(cartdata){
            var qty =cartdata.qty
            qty++;
            var price =qty*pdata.price
             
            await Cart.findByIdAndUpdate(cartdata._id,{qty:qty,total:price})
            resp.send("product added into cart!!!")

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
        resp.send("product added into cart!!!")
    }
    } catch (error) {
     console.log(error);   
    }
})
router.get("/removecart",async(req,resp)=>{
    try {
        const _id =req.query.cid;
        await Cart.findByIdAndDelete(_id)
        resp.redirect("cart")
    } catch (error) {
        console.log(error);
    }
})
router.get("/changeQty",async(req,resp)=>{
    try {
        const cartid =req.query.cartid
        const value =req.query.value
        console.log(cartid+""+value);
        const cartdata = await Cart.findOne({_id:cartid})
        console.log(cartdata);
         const pdata = await product.findOne({_id:cartdata.pid})
        var qty =cartdata.qty+ Number(value) 
        if(qty==0){
            await Cart.findByIdAndDelete(cartid)
            resp.send("udated")
        }
        else{
        console.log(qty);
        var total = qty*pdata.price

        await Cart.findByIdAndUpdate(cartid,{qty:qty,total:total})
        resp.send("udated")
        }
    } catch (error) {
        console.log(error);
    }
})
/******************payment*********************************/
router.get("/payment",(req,resp)=>{

    const amt = req.query.amt;
    console.log(amt);
    var instance = new Razorpay({
        key_id: 'rzp_test_Tkw8jh5hipvkn6',
        key_secret: 'EE5ZgRmRCDX9UiQKsPKqBRSD',
      });

      var options = {
        amount:Number(amt)*100 ,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };

      instance.orders.create(options, function(err, order) {
       resp.send(order)
      });



})

router.get("confirmOrder",auth,async(req,resp)=>{
   try {
    const payid = req.query.pid
    const uid =req.query.uid

    const cartProduct = await Cart.find({uid:uid})
    var productlist=[]
    var alltotal =0
    for(var i=0;i<cartProduct.length;i++){
        const prod = await product.findOne({_id:cartProduct[i]._id})
        var pname= prod.pname
        var price=prod.price
        var qty = cartProduct[i].qty
        var total = Number(price)*Number(qty)
        productlist[i]={
            pname:pname,
            price:price,
            qty:qty,
            total:total
        }
        alltotal=alltotal+total;
    }
    const order = new Order({payid:payid,uid:uid,product:productlist,total:alltotal})
    await order.save()
    resp.send("Order confirned !!!!")


   } catch (error) {
    console.log(error);
   } 
})
module.exports=router
