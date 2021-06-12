const contract = require('truffle-contract');

const DossierMedicale_artifact = require('../build/contracts/DossierMedicale.json');
var DossierMedicale = contract(DossierMedicale_artifact);
const UserSystem_artifact = require('../build/contracts/UserSystem.json');
var UserSystem = contract(UserSystem_artifact);

var addresse="0xc08a3528fB788DEaef98Aed41316F03D5317D471"

module.exports = {
  sendUser: function(/*nom,prenom,adresse,telephone,*/email,password,callback) {
    var self = this;
    // Bootstrap the MetaCoin abstraction for Use.
    UserSystem.setProvider(self.web3.currentProvider);
    var meta;
  
    UserSystem.deployed().then(function(instance) {
      meta = instance;
    //  console.log(self.web3.eth.defaultAccount)
      return meta.setUser(/*nom,prenom,adresse,telephone,*/email,password,{from:addresse,gas:1090996000});
    }).then(function(val) {
      callback(val);
    }).catch(function(e) {
      console.log(e)
      callback(e);
    });
  },
  addAttrubut:function(id,attr, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    UserSystem.setProvider(self.web3.currentProvider);
    var meta;
    UserSystem.deployed().then(function(instance) {
      meta = instance;
      return meta.addAttrubut(id,attr,{from:addresse,gas:1090996000});
    }).then(function(val) {
      console.log(val)
      callback(val);
    }).catch(function(e) {
      callback(e);
    });
  },
  GetAttrubut:function(id, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    UserSystem.setProvider(self.web3.currentProvider);
    var meta;
    UserSystem.deployed().then(function(instance) {
      meta = instance;
      return meta.GetAttrubut(id,{from:addresse,gas:1090996000});
    }).then(function(val) {
      console.log(val)
      callback(val);
    }).catch(function(e) {
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
  setUserDossier:function(id, hash_file, policy, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    DossierMedicale.setProvider(self.web3.currentProvider);
    var meta;
    DossierMedicale.deployed().then(function(instance) {
      meta = instance;
      console.log(id)
      return meta.setUserDossier(id,hash_file,policy,{from:addresse,gas:10996000});
    }).then(function(val) {
      console.log(val+" then setUserDossier")
      callback(val);
    }).catch(function(e) {
      callback(e);
    });
  },
  GetUserDossier:function(patient_id,dossier_id,  callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    DossierMedicale.setProvider(self.web3.currentProvider);
    var meta;
    DossierMedicale.deployed().then(function(instance) {
      meta = instance;
      return meta.GetUserDossier(patient_id,dossier_id,{from:addresse,gas:10996000});
    }).then(function(val) {
      callback(val);
    }).catch(function(e) {
      callback(e);
    });
  },
  setHashFile:function(patient_id,dossier_id , hash,  callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    DossierMedicale.setProvider(self.web3.currentProvider);
    var meta;
    DossierMedicale.deployed().then(function(instance) {
      meta = instance;
      return meta.setHashFile(patient_id,dossier_id,hash,{from:addresse,gas:10996000});
    }).then(function(val) {
      callback(val);
    }).catch(function(e) {
      callback(e);
    });
  },
  GetAllDossier:function(patient_id,  callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    DossierMedicale.setProvider(self.web3.currentProvider);
    var meta;
    DossierMedicale.deployed().then(function(instance) {
      meta = instance;
      return meta.GetAllDossier(patient_id,{from:addresse,gas:10996000});
    }).then(function(val) {
      callback(val);
    }).catch(function(e) {
      callback(e);
    });
  },
  getUsers:function( callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    UserSystem.setProvider(self.web3.currentProvider);
    var meta;
    UserSystem.deployed().then(function(instance) {
      meta = instance;
      return meta.getUsers({from:addresse,gas:1090996000});
    }).then(function(val) {
      console.log(val)
      callback(val);
    }).catch(function(e) {
      callback(e);
    });
  }
}
