var EscrowC2P = artifacts.require("./escrowc2p.sol");

module.exports = (deployer) => 
{
  deployer.deploy(EscrowC2P);
};
