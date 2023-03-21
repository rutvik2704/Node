const bcrypt =require("bcryptjs")

const mypass = async(pass) =>{
    const bpass = await bcrypt.hash(pass,10)
    // console.log(bpass);

    const valid =await bcrypt.compare(bpass,pass)
    console.log(valid);
}
mypass("top")