const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

const database_url = process.env.DATABASE_URL;
mongoose.connect(database_url,{ useUnifiedTopology: true ,useNewUrlParser:true, useFindAndModify: false,
    useCreateIndex: true}).then(()=> console.log("database connected successfully"))
.catch((err)=>{
    console.log("error during establishing connection with database",err)
});

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    country : String,
    password : String
});
const User = new mongoose.model('User', userSchema);

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/login-page.html');
})
app.post('/',(req, res)=>{
    const user =  new User({
        name : req.body.userName,
        email : req.body.userEmail,
        country : req.body.userCountry,
        password : req.body.userPassword
    });
    user.save((err,docs)=>{
        if(err)
        console.log("error during save ", err);
        else
        console.log("document saved in database");
    })
})
app.listen(3000 || process.env.PORT, (err) => {
    if (err) console.log(err);
    else console.log("server is started");
  });
