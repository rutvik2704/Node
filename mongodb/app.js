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

    mydb.collection("emp").insertOne({
        name:"rutvik",
        emali:"rutvik@gamli.com"
    }).then(result =>{
        console.log("data inserted");
    }).catch(err =>{
        console.log(err);
    })


})