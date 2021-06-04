const contract = require('truffle-contract');

const DossierMedicale_artifact = require('../build/contracts/DossierMedicale.json');
var DossierMedicale = contract(DossierMedicale_artifact);
const UserSystem_artifact = require('../build/contracts/UserSystem.json');
var UserSystem = contract(UserSystem_artifact);

var addresse="0x83EdD8096D7820b97aE73ecE744b5fC3c4EbfEbA"

module.exports = {
  sendUser: function(/*nom,prenom,adresse,telephone,*/email,password,PK,callback) {
    var self = this;
    // Bootstrap the MetaCoin abstraction for Use.
    UserSystem.setProvider(self.web3.currentProvider);
    var meta;
 //   var k=self.web3.fromAscii(PK);
 
    UserSystem.deployed().then(function(instance) {
      meta = instance;
      return meta.setUser(/*nom,prenom,adresse,telephone,*/email,password,PK,{from:addresse,gas:1090996000});
    }).then(function(val) {
      callback(val);
    }).catch(function(e) {
      console.log(e)
      callback(e);
    });
  },
  setPK: function(/*nom,prenom,adresse,telephone,*/id,PK,callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    UserSystem.setProvider(self.web3.currentProvider);
    var meta;
    UserSystem.deployed().then(function(instance) {
      meta = instance;
      return meta.setPK(/*nom,prenom,adresse,telephone,*/id,PK,{from:addresse,gas:1090996000});
    }).then(function(val) {
      callback(val);
    }).catch(function(e) {
      console.log(e)
      callback(e);
    });
  },
  VerifieUser: function(email,password,  callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    UserSystem.setProvider(self.web3.currentProvider);

    var meta;
    UserSystem.deployed().then(function(instance) {
      meta = instance;
      return meta.VerifieUser(email,password,{from:addresse});
    }).then(function(val) {
      callback(val);
    }).catch(function(e) {
      callback(false);
    });
  },
  GetUser:function(id,  callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    UserSystem.setProvider(self.web3.currentProvider);
    var meta;
    UserSystem.deployed().then(function(instance) {
      meta = instance;
      return meta.GetUser(id,{from:addresse,gas:1090996000});
    }).then(function(val) {
      console.log(val)
      callback(val);
    }).catch(function(e) {
      callback(e);
    });
  },
  setUserDossier:function(id,  callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    DossierMedicale.setProvider(self.web3.currentProvider);
    var meta;
    DossierMedicale.deployed().then(function(instance) {
      meta = instance;
      console.log(id)
      return meta.setUserDossier(id,"anis",{from:addresse,gas:10996000});
    }).then(function(val) {
      console.log(val+" then setUserDossier")
      callback(val);
    }).catch(function(e) {
      callback(e);
    });
  },
  GetUserDossier:function(id,  callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    DossierMedicale.setProvider(self.web3.currentProvider);
    var meta;
    DossierMedicale.deployed().then(function(instance) {
      meta = instance;
      console.log(id)
      return meta.GetUserDossier(id,{from:addresse,gas:10996000});
    }).then(function(val) {
      console.log(val+" then GetUserDossier")
      callback(val);
    }).catch(function(e) {
      callback(e);
    });
  }
}
