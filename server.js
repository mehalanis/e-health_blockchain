const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');
const { exec } = require("child_process");
const fs = require('fs');

// parse application/x-www-form-urlencoded

var session = require("express-session");
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true}))

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


function VerifieUser(req,res){
  truffle_connect.VerifieUser(req.session.email,req.session.password,(balance) => {
    if(balance==false){ res.redirect("/login")}
  });
}

app.get('/',(req,res)=>{
  VerifieUser(req,res);
  res.sendFile(__dirname+"/public_static/index.html")
})
app.get('/login',(req,res)=>{
  res.sendFile(__dirname+"/public_static/login.html")
}
)
app.use(express.static('public_static'));


app.get('/save/:email/:password', (req, res) => {
  console.log("**** GET /saveVal ****");
  exec("cpabe-setup", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        
        return;
    } 
});
var PK,MK;
fs.readFile("pub_key","utf-8",function(err,data){
  console.log(data)
  truffle_connect.sendUser(/*req.params.nom,req.params.prenom,req.params.adresse,req.params.telephone,*/req.params.email,req.params.password,data,(balance) => {  
    res.send(balance);
  });
  
})

});
app.post('/get', (req, res) => {
  console.log("**** GET /saveVal ****");
  // methode get req.query.val
  truffle_connect.VerifieUser(req.body.email,req.body.password,(balance) => {
    console.log(balance[0])
    console.log(balance[1].c[0]+"")
    if(balance[0]==true){
      req.session.user_id=balance[1].c[0]+"";
      req.session.email=req.body.email;
      req.session.password=req.body.password;
    }
    res.send(balance)
  });
});

app.get('/Profile', (req, res) => {
 VerifieUser(req,res);
 res.sendFile(__dirname+"/public_static/Profile.html")
});
app.get('/ProfileJson', (req, res) => {
  truffle_connect.GetUser(req.session.user_id,(balance) => {
    res.send(balance)
    console.log(balance[3])
  });
});

app.get('/s', (req, res) => {
  
  truffle_connect.setUserDossier(req.session.user_id,(balance) => {
    res.send(balance)
  });
});

app.get('/g', (req, res) => {
  truffle_connect.GetUserDossier(req.session.user_id,(balance) => {
    res.send(balance)
  });
});


app.listen(port, () => {
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  console.log("Express Listening at http://localhost:" + port);
});
