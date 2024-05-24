const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb://localhost:27017/login-tut");

connect.then(()=> {
    console.log("databse connected")
})
.catch(()=>{
    console.log("database not conected")
})

const LoginSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required :true
    }
});

const collection = new mongoose.model("users",LoginSchema);
module.exports = collection;