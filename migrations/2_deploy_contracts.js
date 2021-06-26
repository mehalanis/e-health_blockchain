var UserSystem = artifacts.require("./UserSystem.sol");
var DossierMedicale = artifacts.require("./DossierMedicale.sol");
var Medecin = artifacts.require("./Medecin.sol");
var admin = artifacts.require("./admin.sol");

module.exports = function(deployer) {
  deployer.deploy(DossierMedicale);
  deployer.deploy(UserSystem);
  deployer.deploy(Medecin);
  deployer.deploy(admin);
};
