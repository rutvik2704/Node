const express = require("express")
const app = express();
const PORT = 9000;
const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
app.use(express.json())
const dburl = "mongodb+srv://rutviksanghani2002:<Rutvik@123>@cluster0.45y8hf5.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dburl).then(() => {
    console.log("db connected");
}).catch(err => {
    console.log(err);
})

const userSchema = new mongoose.Schema({
    uname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String
    },
    age: {
        type: Number
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

const User = new mongoose.model("User", userSchema)



app.get("/users", (req, resp) => {

    User.find().then(data => {
        console.log(data);
        resp.send(data)
    }).catch(err => {
        console.log(err);
        resp.send(err)
    })

})

app.post("/users", (req, resp) => {
    // const user = new User(req.body)
    // user.save().then(data => {
    //     resp.send(data)
    // }).catch(err => {
    //     resp.send(err)
    // })
})

app.get("/users/:id", (req, resp) => {

    // const _id = req.params.id
    // User.findById(_id).then(data => {
    //     resp.send(data)
    // }).catch(err => {
    //     resp.send(err)
    // })
})

app.put("/users/:id", (req, resp) => {
    // const _id = req.params.id
    // User.findByIdAndUpdate(_id, req.body).then(data => {
    //     resp.send(data)
    // }).catch(err => {
    //     resp.send(err)
    // })
})

app.delete("/users/:id", (req, resp) => {
    // const _id = req.params.id
    // User.findByIdAndDelete(_id).then(data => {
    //     resp.send(data)
    // }).catch(err => {
    //     resp.send(err)
    // })
})



app.listen(PORT, () => {
    console.log("server running on port : " + PORT);
})