const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');
const { exec } = require("child_process");
const fs = require('fs');
const IPFS = require("ipfs-api")
const ipfs=new IPFS({host:"localhost",port:5001,protocol:"http"});
const ipfs_address="http://localhost:8080/ipfs/"
const https = require('http');
const attribut=["neurologie",'cardiologie',"radiologie","gynécologie","chirurgien","dermatologie","ophtalmologie"]
// parse application/x-www-form-urlencoded
///
app.set("views","./public_static")
app.set("view engine","ejs")

var session = require("express-session");
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true}))

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

function VerifieUser(req,res){
  truffle_connect.VerifieUser(req.session.email,req.session.password,(balance) => {
    console.log("VerifieUser :" +balance)
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
app.get('/admin/login',(req,res)=>{
  res.sendFile(__dirname+"/public_static/admin/login.html")
}
)


app.use(express.static('public_static'));


app.get('/save/:email/:password', (req, res) => {
  console.log("**** GET /saveVal ****");
  truffle_connect.sendUser(/*req.params.nom,req.params.prenom,req.params.adresse,req.params.telephone,*/req.params.email,req.params.password,(balance) => {  
    res.send(balance);
  });
});

app.get('/save2/:email/:password', (req, res) => {
  console.log("**** GET /saveVal ****");
  truffle_connect.AddMedecin(req.params.email,req.params.password,(balance) => {  
    res.send(balance);
  });
});
app.get('/save3/:email/:password', (req, res) => {
  console.log("**** GET /saveVal ****");
  truffle_connect.AddAdmin(req.params.email,req.params.password,(balance) => {  
    res.send(balance);
  });
});

app.post('/loginPatient', (req, res) => {
  console.log("**** GET /saveVal ****");
  // methode get req.query.val
  truffle_connect.VerifieUser(req.body.email,req.body.password,(balance) => {
    console.log(balance[0])
    console.log(balance[1].c[0]+"")
    if(balance[0]==true){
      req.session.user_id=balance[1].c[0]+"";
      req.session.email=req.body.email;
      req.session.password=req.body.password;
      req.session.type="patient";
      /*  generer la SK */
      exec("cpabe-keygen -o a_private_key pub_key master_key patient", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: vous n'avez pas l'autorisation d'accéder a ce dossier ${error.message}`);
            res.send("vous n'avez pas l'autorisation d'accéder a ce dossier" )
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            
            res.send("error"); 
            return;
        }

        }); 
    }
    res.send(balance)
  });
});

app.post('/loginMedecin', (req, res) => {
  console.log("**** GET /saveVal ****");
  // methode get req.query.val
  truffle_connect.VerifieMedecin(req.body.email,req.body.password,(balance) => {
    console.log(balance)
    if(balance[0]==true){
      req.session.user_id=balance[1].c[0]+"";
      req.session.email=req.body.email;
      req.session.password=req.body.password;
      req.session.type="medecin";
      /*  generer la SK */
      truffle_connect.GetAllAttribut(balance[1].c[0]+"",(result) => {
        var list_attr="";
        for(var i=0;i<result.length;i++){
          if(result[i]!="")
          list_attr+= result[i]+" ";
        }
        exec("cpabe-keygen -o a_private_key pub_key master_key "+list_attr, (error, stdout, stderr) => {
          if (error) {
              console.log(`error: vous n'avez pas l'autorisation d'accéder a ce dossier ${error.message}`);
              res.send("vous n'avez pas l'autorisation d'accéder a ce dossier" )
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              
              res.send("error"); 
              return;
          }
          console.log("ok cle medecin")
          });
      });
    }
    res.send(balance)
  });
});
app.post('/loginAdmin', (req, res) => {
  console.log("**** GET /saveVal ****");
  // methode get req.query.val
  truffle_connect.VerifieAdmin(req.body.email,req.body.password,(balance) => {
    console.log(balance)
    if(balance==true){
//      req.session.user_id=balance[1].c[0]+"";
      req.session.email=req.body.email;
      req.session.password=req.body.password;
      req.session.type="admin";
      /*  generer la SK */
    }
    res.send(balance)
  });
});
app.get('/Profile', (req, res) => {
 VerifieUser(req,res);
  truffle_connect.GetUser(req.session.user_id,(balance) => {
    console.log(balance)
    res.render("Profile",{"profile":balance})
  });
});
app.get('/RecherchePatient', (req, res) => {
     res.render("RecherchPatient")
 });

app.post('/GetPatient', (req, res) => {
 // VerifieUser(req,res);
   // res.sendFile(__dirname+"/public_static/Profile.html")
   truffle_connect.GetUserByEmail(req.body.email,(balance) => {
     console.log(balance)
     truffle_connect.GetAllDossier(balance[0],(listDossier) => {
      truffle_connect.GetAllDossierId(balance[0],(listDossierId) => {
        balance[2]=listDossier
        balance[3]=listDossierId
        // res.render("Dossier",{"result":result})
      res.send(balance)
        });
      });
   });
 });

app.get('/AddAttribut/:attr', (req, res) => {
  truffle_connect.addAttribut(0,req.params.attr,(result) => {
    console.log(result)
    res.send(result)
  });
});

app.get('/GetAttribut', (req, res) => {
  truffle_connect.GetAllAttribut(0,(result) => {
    var list=[];
    for(var i=0;i<result.length;i++){
      if(result[i]!="")
      list.push(result[i])
    }
    res.send(list)
  });
});
app.get('/InitAttribut', (req, res) => {
  truffle_connect.InitAttribut(req.session.user_id,(result) => {
    console.log(result)
    res.send(result)
  });
});

app.get('/Dossier', (req, res) => {
  VerifieUser(req,res);
 // res.sendFile(__dirname+"/public_static/Dossier.html")
  truffle_connect.GetAllDossier(req.session.user_id,(resultDossier) => {
    truffle_connect.GetAllDossierId(req.session.user_id,(resultDossierId) => {
      res.render("Dossier",{"resultDossier":resultDossier,
      "resultDossierId":resultDossierId,"patient_id":req.session.user_id})
    });
  });
 });
app.get("/CreateDossier",(req,res)=>{
  res.render("CreateDossier",{"attribut":attribut});
})
app.post('/CreateDossier', (req, res) => {
  
  fs.writeFile('dossier.txt', '[]', err => {
    if (err) {
      console.error(err)
      return
    }
    console.log(req.body.politique);
    exec("cpabe-enc pub_key dossier.txt '"+req.body.politique+"'", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          
          return;
      } 
      let readablestream = fs.createReadStream("dossier.txt.cpabe");
      readablestream.on('readable', () => {
      let result = readablestream.read();
      if (result) {
        ipfs.files.add(result, function(err, files) {
          if (err) {
            res.json('err');
            console.log(err);
          }
          
          truffle_connect.CreerDossier(req.session.user_id,req.body.NomDossier,files[0]["hash"],req.body.politique,(balance) => {
            console.log(files);
            res.redirect("/Dossier")
            return;
          });
        });
      }
      });
    });
  })

});




app.get('/GetDossier/:id', (req, res) => {
  var x=req.params.id.split("_")
  truffle_connect.GetPatientDossier(x[0],x[1],(result) => {
    //console.log(balance[1])
    console.log(result)
    const file = fs.createWriteStream("dossier.txt.cpabe");
    https.get(ipfs_address+result[2], function(response) {
      response.pipe(file);  
      exec("cpabe-dec pub_key a_private_key  dossier.txt.cpabe", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: vous n'avez pas l'autorisation d'accéder a ce dossier ${error.message}`);
            res.send("vous n'avez pas l'autorisation d'accéder a ce dossier" )
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            
            res.send("error"); 
            return;
        }
        let rawdata = fs.readFileSync('dossier.txt');
        var dossier = JSON.parse(rawdata);
          res.render("FicheDeSuivi",{"dossier":dossier,"dossier_id":x[1],"patinet_id":x[0],"user_type":req.session.type})
        });   
    });
  });
});
app.get('/ADDFicheDeSuivi/:id', (req, res) => {
  var x=req.params.id.split("_")
  console.log(x)
  if(req.session.type!="medecin"){ res.send("error");}
  res.render("AddFicheDeSuivi",{"patient_id":x[0],"dossier_id":x[1]})

});

app.post('/ADDFicheDeSuivi', (req, res) => {
  truffle_connect.GetPatientDossier(req.body.user_id,req.body.dossier_id,(result) => {
    //console.log(balance[1])
    console.log(result)
    const file = fs.createWriteStream("dossier.txt.cpabe");
    https.get(ipfs_address+result[2], function(response) {
      response.pipe(file);  
      exec("cpabe-dec pub_key a_private_key  dossier.txt.cpabe", (error, stdout, stderr) => {
          if (error) {
              console.log(`error: vous n'avez pas l'autorisation d'accéder a ce dossier ${error.message}`);
              res.send("vous n'avez pas l'autorisation d'accéder a ce dossier" )
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              
              res.send("error"); 
              return;
          }
          var a = JSON.parse(fs.readFileSync('dossier.txt'));
          var FicheDeSuivi='{"Type":"'+req.body.Type+'","DataCreation":"'+req.body.DataCreation+'","Observation":"'+req.body.Observation+'","CompteRendu":"'
          +req.body.CompteRendu+'"}';
          FicheDeSuivi=JSON.parse(FicheDeSuivi)
          a.push(FicheDeSuivi);
          ADDInfoDossier(JSON.stringify(a),req.body.user_id,req.body.dossier_id,result[3],res,"/GetDossier/"+req.body.user_id+"_"+req.body.dossier_id)
          
        });   
    });
  });
});

function ADDInfoDossier(data,user_id,dossier_id,politique,res,redirect){
  fs.writeFile('dossier.txt', data, err => {
    if (err) {
      console.error(err)
      return
    }
    exec("cpabe-enc pub_key dossier.txt '"+politique+"'", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          
          return;
      } 
      let readablestream = fs.createReadStream("dossier.txt.cpabe");
      readablestream.on('readable', () => {
      let result = readablestream.read();
      if (result) {
        ipfs.files.add(result, function(err, files) {
          if (err) {
            res.json('err');
            console.log(err);
          }
          truffle_connect.setHashNewDossier(user_id,dossier_id,files[0]["hash"],(balance) => {
            console.log(files);
            res.redirect(redirect)
          });
        });
      }
      });
    });
  })
}
app.get("/admin/listMedecin",(req,res)=>{
  truffle_connect.getMedecins((balance) => {
    console.log(balance)
    res.render("admin/listemedecin",{result:balance});
  });
})
app.get("/admin/GetMedecin/:email",(req,res)=>{
  truffle_connect.GetMedecin(req.params.email,(medecin) => {
    truffle_connect.GetAllAttribut(medecin[0],(result_attr) => {
      var list=[];
      for(var i=0;i<result_attr.length;i++){
        if(result_attr[i]!="")
        list.push(result_attr[i])
      }
      medecin[2]=list;
      console.log(list)
      res.render("admin/ProfileMedecin",{medecin:medecin,attribut:attribut});
    });
  });
})
app.post("/admin/EditAttributMedecin",(req,res)=>{
  var list=req.body.attributs.split(",")
  var k=0;
  truffle_connect.InitAttribut(req.body.medecin_id,(result_init)=>{
    for(var i=0;i<list.length;i++){
      truffle_connect.addAttribut(req.body.medecin_id,list[i],(result) => {
        console.log(list[0])
        k++;
        if(k==list.length)   res.redirect("/admin/listMedecin")
      });
    }
  })
})
app.listen(port, () => {
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7546"));
  console.log("Express Listening at http://localhost:" + port);
});
