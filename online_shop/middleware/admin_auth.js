const jwt = require("jsonwebtoken")
const Admin = require("../model/admin")
const auth = async(req,resp,next)=>{
    
    const token = req.cookies.ajwt
   
    try {
        const data = await jwt.verify(token,process.env.A_KEY)
        if(data)
        {
            const admin = await Admin.findOne({_id:data._id})
            req.admin   = admin;
            req.token = token
            next()
            
        }else
        {
            resp.render("admin_login",{err:"Please login first!!!"})
        }
    } catch (error) {
        resp.render("admin_login",{err:"Please login first !!!"})
    }


}

module.exports=auth