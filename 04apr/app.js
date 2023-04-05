const mongoose = require("mongoose");
const validator = require('validator')
mongoose.connect("mongodb://127.0.0.1:27017/tops03292023")
    .then(() => {
        console.log("Connection Done Successfully...");
    })
    .catch((err) => {
        console.log(err);
    })
// Create schema for the collection
const studSchema = new mongoose.Schema({
    stud_id: Number,
    stud_name: {
        type: String,
        require: true,
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new Error("Please Enter Valid Name");
            }
        }
    },
    stud_address: { 
        type:String,
        trim:true    
    },
    stud_email: { 
        type:String,
        require:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please Enter Valid Email");
            }
        }
    },
    stud_bdate: {
        type: Date,
        default: Date.now
    }
})
const Studentlist = new mongoose.model("Studentlist", studSchema);
//Insert data in mongodb from node js
const insertData = async () => {
    try {

        const myStud = new Studentlist({
            stud_id: 70,
            stud_name: "MahedraDhoni",
            stud_email:"msd@gmail.com",
            stud_address: "            Chennai                 "
        })
        const myStud2 = new Studentlist({
            stud_id: 8,
            stud_name: "RavindraJadeja",
            stud_email:"ravindra@gmail.com",
            stud_address: "Gujarat"
        })


        const result = await Studentlist.insertMany([myStud, myStud2]);
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
}
insertData();

const displayData = async () => {
    try {
        // const result=await Studentlist.find({stud_name:"m S D"});
        // const result=await Studentlist.find({stud_id:{$eq:4}}); //matches stud_id with 4
        // const result=await Studentlist.find({stud_id:{$ne:3}}); //matches stud_id whose id is less than 4
        // const result=await Studentlist.find({stud_name:{$nin:["M S D","Hardik Pandya"]}}); //matches stud_id whose id is less than 4
        // const result=await Studentlist.find({$and:[{stud_name:"M S D"},{stud_id:2},{stud_address:"Chennai"}]}); //matches stud_id whose id is less than 4
        // const result=await Studentlist.find().limit(2);   //prints the matching criteria with first 2 records
        // const result=await Studentlist.find().sort({stud_address:-1}).limit(2); //sort stud_address wise in ascending order
        const result = await Studentlist.find().sort({ stud_name: -1 }).limit(2);   // sort stud_name wise in descending order
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
}

// displayData();



const updateData = async () => {
    try {
        const result = await Studentlist.updateMany({ stud_id: 4 }, { $set: { stud_name: "Zaheer Khan", stud_address: "Chennai" } });   // update data 
        console.log(result);
    }
    catch (err) {
        console.log(err); 1
    }
}

//updateData();


const deleteData = async () => {
    try {
        const result = await Studentlist.deleteMany({ stud_id: 4 });   //Delete data 
        console.log(result);
    }
    catch (err) {
        console.log(err); 1
    }
}

//deleteData();

