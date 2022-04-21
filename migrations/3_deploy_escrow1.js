var EscrowC2D = artifacts.require("./escrowc2d.sol");

module.exports = (deployer) => 
{
  deployer.deploy(EscrowC2D);
};
