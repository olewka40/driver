const Migrations = artifacts.require("Migrations");
const Driver = artifacts.require("Driver");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Driver);
};
