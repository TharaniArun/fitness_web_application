var express = require("express"),
app = express(),
bodyparser = require("body-parser"),
mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/Logindb", {useNewUrlParser: true});

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var schema = new mongoose.Schema({
  
  email : String,
  password : String
},
{ 
    collection:'users'
})

var detailsModel = mongoose.model("detailsModel", schema);
app.get("/", function (req, res) {
res.render("sample",{ details: null })
})
app.get("/getdetails", function (req, res) {   
detailsModel.find({}, function (err, allDetails) {
    if (err) {
        console.log(err);
    } else {
        res.render("sample", { details: allDetails })
    }
})
})
app.listen(3000, "localhost", function () {
console.log("server has started");
})