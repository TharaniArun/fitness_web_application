var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://0.0.0.0:27017/Logindb')
var db = mongoose.connection;
db.on('error',()=>console.log('Error in Connecting to Database'));
db.once('open',()=>console.log("connected to db"));

app.post("/survey_get",(req,res)=>{
    var name = req.body.name-label;
    var email = req.body.email-label;
    var age = req.body.number-label;
    var day = req.body.dropdown;
    var rating = req.body.Overall_5;
    var remark = req.body.comments;
  
    var data = {
        "name-label" : name,
        "email-label" : email,
        "number-label" : age,
        "dropdown" : day,
        "Overall_5" : rating,
        "comments" : remark
         }
     db.collection('know').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
     });
     return res.redirect('D:/Full stack project/public/popup.html')
})

app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.redirect("survey.html");
    }).listen(3000)

console.log("Listening on PORT 3000");