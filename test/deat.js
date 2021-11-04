//It works like this:

//Before each contract() function is run, your contracts are redeployed to the running Ethereum client so the tests within it run with a clean contract state.
//The contract() function provides a list of accounts made available by your Ethereum client which you can use to write tests.

var Deat = artifacts.require("./DEat.sol")

contract("DEat", function(accounts)
{
  it("The user can add a new food item.", function()
  {
  return Deat.deployed().then(function(instance)
    {
      instance.addFood(1, )
    })
  })
})
