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
    $.getJSON("EscrowC2D.json", (escrowc2d) =>
    {
      App.contracts.C2D = TruffleContract(escrowc2d);
      App.contracts.C2D.setProvider(App.web3Provider);
    });
    $.getJSON("EscrowC2P.json", (escrowc2p) =>
    {
      App.contracts.C2P = TruffleContract(escrowc2p);
      App.contracts.C2P.setProvider(App.web3Provider);
    });
    $.getJSON("DEat.json", (deat) =>
    {
      App.contracts.DEat = TruffleContract(deat);
      App.contracts.DEat.setProvider(App.web3Provider);
      return App.render();
    });
  },

  render: async () =>
  {
    // console.log(web3.toWei(4, 'ether')) //works
    // const getBalance = await web3.eth.getBalance("0x2d7e047dabe81a81f0c9275b336e1c3b5a3b7679")
    // console.log(getBalance)
    let deatInstance = await App.contracts.DEat.deployed();
    let foodc = await deatInstance.foodCount();
    let userc = await deatInstance.userCount();

    let foodResultsAvailable = $("#foodResultsAvailable");
    let foodResultsOpen = $("#foodResultsOpen");
    let foodResultsDelivering = $("#foodResultsDelivering");
    let foodResultsComplete = $("#foodResultsComplete");
    let foodResultsPending = $("#foodResultsPending");
    let AllUsersTable = $("#AllUsersTable");

    foodResultsAvailable.empty();
    foodResultsOpen.empty();
    foodResultsDelivering.empty();
    foodResultsComplete.empty();
    foodResultsPending.empty();
    AllUsersTable.empty();
    //console.log(App)
    
    for (var i = 1; i<=userc; i++)
    {
      deatInstance.Uid2User(i).then((user) =>
      {
      //   uint uid;
      // address user;
      // uint32 aadhar;

      // UserType user_type;
      // Authenticated status;

      // string location;

      let uid = user[0];
      let user_add = user[1];
      let aadhar = user[2]
      let user_type = user[3]
      let auth_stat = user[4]
      let location = user[5]

      const AllUsersTemplate = "<tr><th>" + uid + "</th><td>" + user_add + "</td><td>" + aadhar + "</td><td>" + user_type + "</td><td>" + auth_stat + "</td><td>" + location + "</td><td></tr>"
      AllUsersTable.append(AllUsersTemplate);
      })
    }

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
          let itid1 = str_item.concat(id_str)
          let itid2 = str_item.concat(id_str)
          let itid3 = str_item.concat(id_str)
          let itid4 = str_item.concat(id_str)

          // 0 = Available, 1 = Open, 2 = Delivering, 3 = Completed

          if(phase == 0)
          {
            const foodTemplateAvailable = "<tr><td> <div class = 'radiotext'> <label> <input type = 'radio' id = '" + itid1 + "'name = 'optradio'> </td><th>" + id + "</th><td>" + producer + "</td><td>" + food_name + "</td><td>" + price + "</td><td>" + food_desc + "</td><td>" + food_img_link + "</td><td>" + location + "</td></tr>"
            foodResultsAvailable.append(foodTemplateAvailable);
          }

          if(phase == 1)
          {
            const foodTemplateOpen = "<tr><td> <div class = 'radiotext'> <label> <input type = 'radio' id = '" + itid2 + "'name = 'optradio'> </td><th>" + id + "</th><td>" + producer + "</td><td>" + consumer + "</td><td>" + food_name + "</td><td>" + price + "</td><td>" + food_desc + "</td><td>" + food_img_link + "</td><td>" + location + "</td></tr>"
            foodResultsOpen.append(foodTemplateOpen);
          }

          if(phase == 2)
          {
            const foodTemplateDelivering = "<tr><td><th>" + id + "</th><td>" + producer + "</td><td>" + consumer + "</td><td>" + delivery + "</td><td>" + food_name + "</td><td>" + price + "</td><td>" + food_desc + "</td><td>" + food_img_link + "</td><td>" + location + "</td></tr>"
            foodResultsDelivering.append(foodTemplateDelivering);
          }

          if(phase == 3)
          {
            const foodTemplateComplete = "<tr><td> <div class = 'radiotext'> <label> <input type = 'radio' id = '" + itid4 + "'name = 'optradio'> </td><th>" + id + "</th><td>" + producer + "</td><td>" + food_name + "</td><td>" + price + "</td><td>" + food_desc + "</td><td>" + food_img_link + "</td><td>" + location + "</td></tr>"
            foodResultsComplete.append(foodTemplateComplete);
          }


          //var foodTemplate = "<tr><th>" + id + "</th><td>" + cook + "</td><td>" + food + "</td><td>" + loc + "</td><td>" + price + "</td></tr>"
          
          //const foodTemplate = "<tr><th> <div class = 'radiotext'> <label> <input type = 'radio' id ='" + itid + "' name = 'optradio'> Choose: </label>" + producer + "</th><td>" + food_name + "</td><td>" + price + "</td><td>" + food_desc + "</td><td>" + food_img_link + "<td></td>" + location + "</td></tr>"
          
        });
      }

      web3.eth.getCoinbase((err, acc) =>
      {
        if(err == null)
        App.account.address = acc;
        deatInstance.Consumer2ID(App.account.address).then((id) =>
        {
          console.log(id.toNumber())
          deatInstance.id2Food(id.toNumber()).then((fooditem) =>
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
            let phase = fooditem[9];
            console.log(phase.toNumber())
            const foodTemplatePending = "<tr><td></td><th>" + id + "</th><td>" + producer + "</td><td>" + consumer + "</td><td>" + food_name + "</td><td>" + price + "</td><td>" + food_desc + "</td><td>" + food_img_link + "</td><td>" + location + "</td></tr>"
            
            if(phase.toNumber()==2)
            foodResultsPending.append(foodTemplatePending);
          })
        })
      })
     

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
    
    let acco = "0x2d7e047dabe81a81f0c9275b336e1c3b5a3b7679"
    web3.eth.getBalance(acco, (err, balance) => 
    {
      if (err) 
      {
        console.log(err)
      } 
      else 
      {
        console.log(balance.toNumber())
      }
    })
    return App.MonteCarlo();
  },

  MonteCarlo: async () =>
  {
    let deatInstance = await App.contracts.DEat.deployed();
    let foodc = await deatInstance.foodCount();
    let userc = await deatInstance.userCount();

    // const p1x, p1y, p2x, p2y, p3x, p3y;
    // const r = 3000

    for(var i = 1; i<=foodc; i++)
    {
      deatInstance.id2Food(i).then((fooditem) =>
      {

        //SELLER AND CONSUMER LOCATIONS IN JSON.
        const c_p_location_JSON = JSON.parse(fooditem[4])
        //console.log(c_p_location_JSON)
        
        deatInstance.Uadd2User(App.account.address).then((user) =>
        {
          //DELIVERY LOCATION IN JSON
          let d_location_JSON = (JSON.parse(user[5]))
          //console.log(d_location_JSON)

          const seller_JSON = c_p_location_JSON.seller_location[0]
          const consumer_JSON = c_p_location_JSON.consumer_location[0]
          const delivery_JSON = d_location_JSON.delivery_location[0]

          const r = 3000;
           
          // determine bounding rectangle

          let left   = Math.min(seller_JSON.seller_latitude - r, consumer_JSON.consumer_latitude - r,
                                 delivery_JSON.delivery_latitude - r);

          
          let right  = Math.max(seller_JSON.seller_latitude + r, consumer_JSON.consumer_latitude + r,
                                 delivery_JSON.delivery_latitude + r);

          let top    = Math.min(seller_JSON.seller_longitude - r, consumer_JSON.consumer_longitude - r,
                                delivery_JSON.delivery_longitude - r);

          let bottom = Math.max(seller_JSON.seller_longitude + r, consumer_JSON.consumer_longitude + r,
                                 delivery_JSON.delivery_longitude + r);

          // area of bounding rectangle
          let rectArea = (right - left) * (bottom - top);

          console.log(rectArea)
          let iterations = 10000;
          let pts = 0;
          for (var i = 0; i<iterations; i++) 
  
          {
            // random point coordinates
            let x = left + Math.random() * (right - left);
            let y = top  + Math.random() * (bottom - top);
        
                // check if it is inside all the three circles (the intersecting area)
            if (Math.sqrt(Math.pow(x - seller_JSON.seller_latitude, 2) + Math.pow(y - seller_JSON.seller_longitude, 2)) <= r &&
                Math.sqrt(Math.pow(x - consumer_JSON.consumer_latitude, 2) + Math.pow(y -  consumer_JSON.consumer_longitude, 2)) <= r &&
                Math.sqrt(Math.pow(x - delivery_JSON.delivery_latitude, 2) + Math.pow(y - delivery_JSON.delivery_longitude, 2)) <= r)
              pts++;
          }

          let area = pts / iterations * rectArea;
          if (area>0)
          {
            console.log("intersects")
          }
          else
          {
            console.log("does not intersect")
          }
        
      // // the ratio of points inside the intersecting area will converge to the ratio
      // // of the area of the bounding rectangle and the intersection
      // let area = pts / iterations * rectArea;
          
        })


        
        //PARSING THE LOCATION INTO 2 CIRCLES.
      })
    // }
    
      
     
    
      
    
      
      
      // if(area>0)
      // {
      //     return true
      // }
      
      // else
      // {
      //     return false
      // }
    } 
  }, 

  createUser: async () =>
  {
    let deatInstance = await App.contracts.DEat.deployed();

    let aadhar2 = document.getElementById("aadhar2").value;
    let utype = document.getElementById("utype").value

    
    console.log(App.account.address)

    if(utype == "producer")
    {
      let str_loc = JSON.stringify({"producer_location": [{"producer_latitude": App.account.location.latitude,
    "producer_longitude": App.account.location.longitude, "producer_radius": 3000}]})

      deatInstance.createUser(App.account.address, aadhar2, 0, str_loc, {from: App.account.address});
    }
    

    if(utype == "consumer")
    {
      let str_loc = JSON.stringify({"consumer_location": [{"consumer_latitude": App.account.location.latitude,
    "consumer_longitude": App.account.location.longitude, "consumer_radius": 3000}]})

      deatInstance.createUser(App.account.address, aadhar2, 1, str_loc, {from: App.account.address});
    }
    

    if(utype == "delivery")
    {
      let str_loc = JSON.stringify({"delivery_location": [{"delivery_latitude": App.account.location.latitude,
    "delivery_longitude": App.account.location.longitude, "delivery_radius": 3000}]})

      deatInstance.createUser(App.account.address, aadhar2, 2, str_loc, {from: App.account.address});
    }
    

    deatInstance.Uadd2User(App.account.address).then((user) =>
    {
      console.log(user)
    })
    
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
    //let _str_loc = JSON.stringify(App.account.location)
    let _str_loc = JSON.stringify({"seller_location": [{"seller_latitude": App.account.location.latitude,
     "seller_longitude": App.account.location.longitude, "seller_radius": 3000}]})

    
    //console.log("Before initiating the contract the addFood function " + App.account.address)

    let deatInstance = await App.contracts.DEat.deployed();
    
    //deatInstance.Uadd2User(App.account.address).then((user) =>
    //{
      //if(user[3] == 1)
        deatInstance.addFood(App.account.address, _str_loc, _price, _food_name, _food_desc
      , _food_img_link, {from: App.account.address});
      //else
      //{
        //throw "You are not a producer, please change your type to be able to access this function."
      //}
    //)

    //console.log(deatInstance)                         //these two work so the contract has been deployed properly.
    //const result = await deatInstance.C2I(1)        //problem is not with truffle, but with web3
                                                    //new web3 contract not new truffle contract?
    //console.log(result);
  
    //need to manually connect account to the website to initiaite a transaction
  
    //console.log("Before calling the addFood function " + App.account.address)
    
  },

  order: async () =>
  {
    //console.log(App.account.address)
    let deatInstance = await App.contracts.DEat.deployed();

    let escrowc2dInstance = await App.contracts.C2D.deployed();
    let escrowc2pInstance = await App.contracts.C2P.deployed();

    let foodc = await deatInstance.foodCount();
    let ord = null;

    deatInstance.Uadd2User(App.account.address).then((user) =>
    {
      if(user[3] == 1)
      {
              for (var i = 1; i <= foodc; i++)
          {
            let it = "item" + i

            if(document.getElementById(it) == null)
            {
              continue;
            }

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

          //appending string

          deatInstance.id2Food(ord).then((fooditem) =>
          {

            let location_order = fooditem[4]
            let location_order_formatted = location_order.slice(1,location_order.length-1)

            deatInstance.Uadd2User(App.account.address).then((user) =>
            {

              let location_consumer = user[5]
              let location_consumer_formatted = location_consumer.slice(1,location_consumer.length-1)

              let location_joined = "{" + location_consumer_formatted + "," + location_order_formatted + "}"
              console.log("this is valid? yes " + location_joined)

              console.log(JSON.parse(location_joined))
              deatInstance.orderFood(ord, App.account.address, location_joined, {from: App.account.address});
            })
          })

          deatInstance.id2Food(ord).then((fooditem) =>
          {
            let producer = fooditem[1]
            let delivery = fooditem[2]

            //console.log(producer_price)
            let producer_price = fooditem[5].toString()
            let wei_producer_price = web3.toWei(producer_price, 'ether')

            const delivery_price = "1"
            let wei_delivery_price = web3.toWei(delivery_price, 'ether')

            //IMPORTANT!!! USED FOR PAYMENT

            //SENDS PAYMENT FROM CONSUMER TO PRODUCER ESCROW
            escrowc2pInstance.c2p_deposit(producer, {from: App.account.address, value: wei_producer_price})
            
            //SENDS PAYMENT FROM CONSUMER TO DELIVERY ESCROW
            escrowc2dInstance.c2d_deposit(delivery, {from: App.account.address, value: wei_delivery_price})

            //MAPS THE CONSUMER TO FOOD ID
            deatInstance.setConsumer2ID(App.account.address, ord, {from: App.account.address})
          })
      }
      else
      {
        throw "You are not a consumer, please change your user type."
      }
    })
  },

  deliver: async () =>
  {
    let deatInstance = await App.contracts.DEat.deployed();
    let foodc = await deatInstance.foodCount();
    let ord = null;
    
    for (var i = 1; i <= foodc; i++)
    {
      let it = "item" + i

      if(document.getElementById(it) == null)
      {
        continue;
      }

      if(document.getElementById(it).checked) 
      {
        ord = i;
        deatInstance.id2Food(ord).then((fooditem) =>
        {
          let producer = fooditem[1];
          alert("You are about to deliver for item with ID: " + ord + " by " + producer);
        });
       //var ord = i;
      }
    }
    deatInstance.deliverFood(ord, App.account.address, {from: App.account.address});   
  },

  confirmOrder: async () =>
  {

    let deatInstance = await App.contracts.DEat.deployed();
    let escrowc2pInstance = await App.contracts.C2P.deployed();
    let escrowc2dInstance = await App.contracts.C2D.deployed();
    
    deatInstance.Consumer2ID(App.account.address).then((foodid) =>
    {
      // console.log(foodid.toNumber())
      // console.log(App.account.address)
      deatInstance.id2Food(foodid.toNumber()).then((fooditem) =>
      {
        let producer = fooditem[1]
        let delivery = fooditem[2]
        let id = foodid.toNumber()

        // console.log("PP" + producer)
        escrowc2pInstance.c2p_withdraw(producer, {from: App.account.address})
        escrowc2dInstance.c2d_withdraw(delivery, {from: App.account.address})

        deatInstance.completeFood(id, {from: App.account.address})
      })
    })

  }
}; //for App.

$(function()
{
  $(window).load(function()
  {
    App.init();                               //initialise the app whenever the window loads.
  });
});
