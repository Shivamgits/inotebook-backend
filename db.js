const moongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"


const connectToMongo = ()=>{
    moongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo successfully");
    })
}

module.exports = connectToMongo;