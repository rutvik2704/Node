const express = require("express")
const app = express();
const PORT = 9000;
const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
app.use(express.json())
const dburl = "mongodb://127.0.0.1:27017/rutvik"
mongoose.connect(dburl).then(() => {
    console.log("db connected");
}).catch(err => {
    console.log(err);
})

const userrouter = require("./router/userrouter")
// const productroutr = require("./router/productrouter")
app.use("/", userrouter)
// app.use("/", productroutr)


app.listen(PORT, () => {
    console.log("server running on port : " + PORT);
})