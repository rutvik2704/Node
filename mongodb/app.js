const mongodb = require("mongodb")
const MongodbClient = mongodb.MongoClient

const DB_URL ="mongodb://127.0.0.1:27017";
const database ="rutvik"

MongodbClient.connect(DB_URL).then(result =>{
    console.log("db connected");

    const mydb = result.db(database)

    // mydb.createCollection("emp").then(data =>{
    //     console.log("collection create");
    // })

    // mydb.collection("emp").insertOne({
    //     name:"rutvik",
    //     emali:"rutvik@gamli.com"
    // }).then(result =>{
    //     console.log("data inserted");
    // }).catch(err =>{
    //     console.log(err);
    // })
    // var e1={name:"jay",emali:"jay@gmali.com",sal:60000,dept:"php"}
    // var e2={name:"piyush",emali:"piyush@gmali.com",sal:5000,dept:"node"}
    // mydb.collection("emp").insertMany([e1,e2]).then(result=>{
    //     console.log(result);
    // }).catch(err=>{
    //     console.log(err);
    // })

    // mydb.collection("emp").updateOne({name:"rutvik"},{$set:{sal:30000,dept:"php"}}).then(result=>{
    //     console.log(result);
    // }).catch(err=>{
    //     console.log(err);
    // })
    // 
    


    // mydb.collection("emp").find({sal:{ $lte : 5000}}).toArray().then(result=>{
    //     console.log(result);
    // }).catch(err=>{
    //     console.log(err);
    // })



    mydb.collection("emp").find({$nor:[{dept:{$eq:"node"}},{sal:{$lt:5000}}]}).toArray().then(result=>{
        console.log(result);
    }).catch(err=>{
        console.log(err);
    })


})