const express = require('express');
const path = require('path');
const port = 1808;
const app = express();
app.use(express.static("views"))
// require mongoose and make it connect
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/newscon',{useNewUrlParser:true,useUnifiedTopology:true});
// when connected and wen not wat should be display
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
    console.log("connection successful")
})

// now we will give some insruction for what we need that is called schema
const feedschema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    yourconcern:String
})
// now we will create model we will compile the schema into model
const feedback = mongoose.model('feedback',feedschema);




app.get("/",(req,res)=>{
    res.statusCode = 200;
    res.sendFile("index.html",{root: path.join(__dirname,"./views")})
})

app.get("/contactus",(req,res)=>{
    res.statusCode = 200;
    res.sendFile("contact.html",{root: path.join(__dirname,"./views")})
})

app.get("/Topnews",(req,res)=>{
    res.statusCode = 200;
    res.sendFile("topnews.html",{root: path.join(__dirname,"./views")})
})

app.get("/feedback",(req,res)=>{
    res.statusCode = 200;
    res.sendFile("feedback.html",{root: path.join(__dirname,"./views")})
})

app.get("/about",(req,res)=>{
    res.statusCode = 200;
    res.sendFile("about.html",{root: path.join(__dirname,"./views")})
})

app.post("/feedback",(req,res)=>{
    var mydata = new feedback(req.body);
    mydata.save().then(()=>{
        res.send("item is stored in database")
    }).catch(()=>{
        res.status(400).send("item not saved in database")
    })
})

app.listen(port,(req,res)=>{
    console.log(`started server on port ${port}`)
})