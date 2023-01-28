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

app.post("/group",(req,res)=>{
    var date = req.body.date-change;
    var phoneno = req.body.phoneno;
    var idu = req.body.id-no;
    var ratings = req.body.ratings;
    var ccno = req.body.ccno;
    var country = req.body.country;
    var ccountry = req.body.other;
  
    var data = {
        "date-change" : date,
        "phoneno" : phoneno,
        "id-no" : idu,
        "ratings" : ratings,
        "ccno" : ccno,
        "country" : country,
        "other" : ccountry,
         }
     db.collection('search-form').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
     });
     return res.redirect('forms-advanced.html')
})

app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.redirect("forms-advanced.html");
    }).listen(3000)

console.log("Listening on PORT 3000");