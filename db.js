const mongoose = require("mongoose");
const dotenv = require('dotenv');


function connectDB(){
    mongoose.connect(dotenv?.config()?.parsed?.MONGO_URI, {useUnifiedTopology: true , useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Failed')
    })

}







connectDB()

module.exports = mongoose