var DeliveryDeposit = artifacts.require("./deliverydeposit.sol");

module.exports = (deployer) => 
{
  deployer.deploy(DeliveryDeposit);
};
