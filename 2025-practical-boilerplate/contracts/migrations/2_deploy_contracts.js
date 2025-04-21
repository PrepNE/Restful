const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  deployer.deploy(Voting, { gas: 5000000 });
};