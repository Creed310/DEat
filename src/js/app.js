//client-side app.

//cannot use window.web3 as the provider anymore
//need to use window.ethereum

App =
{
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: () =>
  {
    return App.initWeb3();
  },

  initWeb3: async () =>
  {
    /*if (typeof web3 !== 'undefined') 
    {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else 
    {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();*/

    if (typeof web3 !== 'undefined') 
    {
      App.web3Provider = window.ethereum;
      web3 = new Web3(window.ethereum);
    } else 
    {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: () =>
  {
    $.getJSON("DEat.json", deat =>
    {
      App.contracts.DEat = TruffleContract(deat);
      App.contracts.DEat.setProvider(App.web3Provider);
      return App.render();
    });
  },

  render: async () =>
  {
    var deatInstance = await App.contracts.DEat.deployed();
    var foodc = await deatInstance.foodCount();
    var foodResults = $("#foodResults");
    foodResults.empty();
      for (var i = 1; i <= foodc; i++)
      {
        deatInstance.C2I(i).then((fooditem) =>
        {
          var id = fooditem[0];
          var cook = fooditem[1];
          var food = fooditem[2];
          var loc = fooditem[3];
          var price = fooditem[4];
          var foodTemplate = "<tr><th>" + id + "</th><td>" + cook + "</td><td>" + food + "</td><td>" + loc + "</td><td>" + price + "</td></tr>"
          foodResults.append(foodTemplate);
        });
      }
      web3.eth.getCoinbase(function(err, account)
    {
      if (err === null)
      {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
  },
  sell: async () =>
  {
    var eth_pk = document.getElementById("pk").value
    var eth_fd = document.getElementById("fd").value
    var eth_pl = document.getElementById("pl").value
    var eth_prc = document.getElementById("prc").value

    var deatInstance = await App.contracts.DEat.deployed();
    //console.log(deatInstance)                         //these two work so the contract has been deployed properly.
    //const result = await deatInstance.C2I(1)        //problem is not with truffle, but with web3
                                                    //new web3 contract not new truffle contract?
    //console.log(result);
  
    console.log(deatInstance.addFood(eth_pk, eth_fd, eth_pl, eth_prc, {from: App.account}));
  
  }

}; //for App.

$(function()
{
  $(window).load(function()
  {
    App.init();                               //initialise the app whenever the window loads.
  });
});
