const Express=require('express');
var bodyParser = require('body-parser');
const Mongoose= require('mongoose');
var request=require('request');
var cors = require('cors');

var app=new Express();
app.use(cors())

let Schema=Mongoose.Schema;

const courseSchema = new Schema({

    name: {"type":String,"required":true},
    friendName:  {"type":String,"required":true},
    friendNickName: {"type":String,"required":true},
    DescribeYourFriend: {"type":String,"required":true}
});

var courseModel = Mongoose.model('friends', courseSchema);


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

Mongoose.connect("mongodb+srv://anishpdm:hello12345@cluster0.cp5gozh.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0");



// For CORS,Pgm Line no 12 to 29
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.post("/adddata", async (request, response) => {
    try {
      var courseData = new courseModel(request.body);
        var result = await courseData.save();
        console.log(result.courseTitle)
        if(result.courseTitle!=""){
            response.json({status:'success'});

        }
        else{
            response.json({status:'error'});

        }
    } catch (error) {
      console.log(error)

        response.status(500).send(error);
    }
});


app.get("/view", async (request, response) => {

    try {
        var result = await courseModel.find();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});


app.get("/removeall", async (request, response) => {

    try {
        var result = await courseModel.remove({}).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});



app.listen(process.env.PORT || 3000, function(){
    console.log('Your node js server is running');
});