const express = require("express")
const app = express();
const PORT = 9001;
const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
app.use(express.json())
const dburl = "mongodb+srv://Rutvik_2704:Rutvik2704@cluster0.i95lplr.mongodb.net/restapi?retryWrites=true&w=majority"
mongoose.connect(dburl).then(() => {
    console.log("db connected");
}).catch(err => {
    console.log(err);
})

const userrouter = require("./router/userrouter")
const productroutr = require("./router/productrouter")
app.use("/", userrouter)
app.use("/", productroutr)


app.listen(PORT, () => {
    console.log("server running on port : " + PORT);
})