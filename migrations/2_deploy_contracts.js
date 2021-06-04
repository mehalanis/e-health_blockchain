var UserSystem = artifacts.require("./UserSystem.sol");
var DossierMedicale = artifacts.require("./DossierMedicale.sol");

module.exports = function(deployer) {
  deployer.deploy(DossierMedicale);
  deployer.deploy(UserSystem);

};
