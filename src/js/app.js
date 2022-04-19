//client-side app.

//cannot use window.web3 as the provider anymore
//need to use window.ethereum


App =
{
  web3Provider: null,
  contracts: {},
  account: {address: '0x0', location: { latitude: null, longitude: null, radius: 3000} },

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
    } 
    else 
    {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: () =>
  {
    $.getJSON("DEat.json", (deat) =>
    {
      App.contracts.DEat = TruffleContract(deat);
      App.contracts.DEat.setProvider(App.web3Provider);
      return App.render();
    });
  },

  render: async () =>
  {
    let deatInstance = await App.contracts.DEat.deployed();
    let foodc = await deatInstance.foodCount();

    let foodResultsAvailable = $("#foodResultsAvailable");
    let foodResultsOpen = $("#foodResultsOpen");
    foodResultsAvailable.empty();
    foodResultsOpen.empty();
    let foodResultsDelivering = $("#foodResultsDelivering");
    let foodResultsComplete = $("#foodResultsComplete");
    foodResultsDelivering.empty();
    foodResultsComplete.empty();

    //console.log(App)
      for (var i = 1; i <= foodc; i++)
      {
        deatInstance.id2Food(i).then((fooditem) =>
        {
          let consumer = fooditem[0];
          let producer = fooditem[1];
          let delivery = fooditem[2];
          let id = fooditem[3];
          let location = fooditem[4];
          let price = fooditem[5];
          let food_name = fooditem[6];
          let food_desc = fooditem[7];
          let food_img_link = fooditem[8];
          let phase = fooditem[9]

          // <th scope="col">ID</th>
          // <th scope="col">Producer</th>
          // <th scope="col">Food Name</th>
          // <th scope="col">Price (in wei)</th>
          // <th scope="col">Food Description</th>
          // <th scope="col">Food Image Link</th>
          // <th scope="col">Location</th>


          let str_item = "item"
          let id_str = id.toString();
          let itid = str_item.concat(id_str)

          if(phase == 0)
          {
            const foodTemplateAvailable = "<tr><td> <div class = 'radiotext'> <label> <input type = 'radio' id = '" + itid + "'name = 'optradio'> </td><th>" + id + "</th><td>" + producer + "</td><td>" + food_name + "</td><td>" + price + "</td><td>" + food_desc + "</td><td>" + food_img_link + "</td><td>" + location + "</td></tr>"
            foodResultsAvailable.append(foodTemplateAvailable);
          }

          if(phase == 1)
          {
            const foodTemplateOpen = "<tr><td> <div class = 'radiotext'> <label> <input type = 'radio' id = '" + itid + "'name = 'optradio'> </td><th>" + id + "</th><td>" + producer + "</td><td>" + consumer + "</td><td>" + food_name + "</td><td>" + price + "</td><td>" + food_desc + "</td><td>" + food_img_link + "</td><td>" + location + "</td></tr>"
            foodResultsOpen.append(foodTemplateOpen);
          }

          if(phase == 2)
          {
            const foodTemplateDelivering = "<tr><td> <div class = 'radiotext'> <label> <input type = 'radio' id = '" + itid + "'name = 'optradio'> </td><th>" + id + "</th><td>" + producer + "</td><td>" + food_name + "</td><td>" + price + "</td><td>" + food_desc + "</td><td>" + food_img_link + "</td><td>" + location + "</td></tr>"
            foodResultsDelivering.append(foodTemplateDelivering);
          }

          if(phase == 3)
          {
            const foodTemplateComplete = "<tr><td> <div class = 'radiotext'> <label> <input type = 'radio' id = '" + itid + "'name = 'optradio'> </td><th>" + id + "</th><td>" + producer + "</td><td>" + food_name + "</td><td>" + price + "</td><td>" + food_desc + "</td><td>" + food_img_link + "</td><td>" + location + "</td></tr>"
            foodResultsComplete.append(foodTemplateComplete);
          }


          //var foodTemplate = "<tr><th>" + id + "</th><td>" + cook + "</td><td>" + food + "</td><td>" + loc + "</td><td>" + price + "</td></tr>"
          
          //const foodTemplate = "<tr><th> <div class = 'radiotext'> <label> <input type = 'radio' id ='" + itid + "' name = 'optradio'> Choose: </label>" + producer + "</th><td>" + food_name + "</td><td>" + price + "</td><td>" + food_desc + "</td><td>" + food_img_link + "<td></td>" + location + "</td></tr>"
          
        });
      }

      web3.eth.getCoinbase((err, account) =>
    {
      if (err === null)
      {
        App.account.address = account;
        $("#accountAddress").html(App.account.address);
        $("#accountAddress2").html("Your Account: " + App.account.address);
      }
      else 
      {
        console.log(err)
      }
    });
    
    //here App.account returns 0

    //FOR RENDERING ORDERS --------------------------------------------------------------------------------------

    //return App.viewOrders()
    
    
    //var k = await deatInstance.B2I('0x7f076b2a0c80562995a92effc192a9a80f6ebcf2', 0)
    
    /*for (var i = 0;; i++)
    {

    }*/
  },

  createUser: async () =>
  {
    let deatInstance = await App.contracts.DEat.deployed();

    let aadhar2 = document.getElementById("aadhar2").value;
    let utype = document.getElementById("utype").value
    let str_loc = JSON.stringify(App.account.location)

    if(utype == "producer")
    deatInstance.createUser(App.account.address, aadhar2, 0, str_loc, {from: App.account.address});

    if(utype == "consumer")
    deatInstance.createUser(App.account.address, aadhar2, 1, str_loc, {from: App.account.address});

    if(utype == "delivery")
    deatInstance.createUser(App.account.address, aadhar2, 2, str_loc, {from: App.account.address});

    // uint uid;
    //   address user;
    //   uint32 aadhar;

    //   UserType user_type;
    //   Authenticated status;

    //   string location;
  },

  sell: async () =>
  {

    web3.eth.getCoinbase((err, acc) =>
    {
      if(err == null)
      App.account.address = acc;
    })

    //console.log("After calling the Coinbase function " + App.account.address)

    let _price = document.getElementById("price").value
    let _food_name = document.getElementById("food_name").value
    let _food_desc = document.getElementById("food_desc").value
    let _food_img_link = document.getElementById("food_img_link").value
    let _str_loc = JSON.stringify(App.account.location)

    

    //console.log("Before initiating the contract the addFood function " + App.account.address)

    let deatInstance = await App.contracts.DEat.deployed();
    //console.log(deatInstance)                         //these two work so the contract has been deployed properly.
    //const result = await deatInstance.C2I(1)        //problem is not with truffle, but with web3
                                                    //new web3 contract not new truffle contract?
    //console.log(result);
  
    //need to manually connect account to the website to initiaite a transaction
  
    console.log("Before calling the addFood function " + App.account.address)

    deatInstance.addFood(App.account.address, _str_loc, _price, _food_name, _food_desc
      , _food_img_link, {from: App.account.address});


    
  },

  order: async () =>
  {
    //console.log(App.account.address)
    let deatInstance = await App.contracts.DEat.deployed();
    let foodc = await deatInstance.foodCount();
    let ord = null;

    
    for (var i = 1; i <= foodc; i++)
    {
      let it = "item" + i
      if(document.getElementById(it).checked) 
      {
        ord = i;
        deatInstance.id2Food(ord).then((fooditem) =>
        {
          let producer = fooditem[1];
          alert("You are about to place an order for item with ID: " + ord + " by " + producer);
        });
       //var ord = i;
      }
    }
    deatInstance.orderFood(ord, App.account.address, {from: App.account.address});   
  },

  /*viewOrders: async() =>
  {
    let deatInstance = await App.contracts.DEat.deployed();
    let orders = $("#orders");
    orders.empty();
    for (var j=0; j<10; j++)
    {
      if (order==0)
      {
        console.log("No order")
        break;
      }
      var order = await deatInstance.B2I(App.account, j)
      console.log(order)
      let orderstemplate = "<p>" + order "</p>"
      orders.append(orderstemplate);
    }
  }*/

}; //for App.

$(function()
{
  $(window).load(function()
  {
    App.init();                               //initialise the app whenever the window loads.
  });
});
