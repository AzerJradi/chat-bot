const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config")

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Define routes
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});


app.post("/signup", async (req,res)=>{
    const data = {
        name: req.body.username ,
        password: req.body.password
    }
    const exisitingUser = await collection.findOne({name: data.name})
    if(exisitingUser){
        res.send("user allready exists. Please enter another username")
    }else{
        const saltRounds= 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds)
        data.password = hashedPassword;
        const userdata = await collection.insertMany(data);
    }
})

app.post("/login",(req,res)=>{
    try {
        const check = await collection.findOne({name:req.body.username});
        if(!check){
            res.send("username can not be found")
        }
        const checkpassword = await bcrypt.compare({req.body.password , check.password});
        if(checkpassword){
            res.render("home");
        }else{
            req.send("wrong password")
        }
    } catch{
        res.send("wrong details")
    }
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});
