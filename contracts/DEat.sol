pragma solidity ^0.5.16;

//3 different pages open up and 3 different SC are deployed based on userType.
//the 3 contracts talk to each other.

contract DEat
{
  //enum Dir {UP, LEFT, DOWN, RIGHT} corresponds to uint8 values 0, 1, 2 and 3.

  enum Phase { Available, Open, Delivering, Complete }
  enum UserType { Producer, Consumer, Delivery }
  enum Authenticated { V, NV } 

  struct User
  {
      uint uid;
      address user;
      uint32 aadhar;

      UserType user_type;
      Authenticated status;

      string location;
  }

  struct Food
  {
    
    address consumer;
    address payable producer;
    address payable delivery;

    uint id;

    string location;

    uint price;

    string food_name;
    string food_desc;
    string food_img_link;

    Phase phase;
  }

//string public userType;
  uint public foodCount = 0;
  uint public userCount = 0;

  mapping(uint => Food) public id2Food;
  mapping(uint => User) public Uid2User;
  mapping(address => User) public Uadd2User;
  mapping(address => uint) public Consumer2ID;
  mapping(address => Food) public Producer2Food;
  
//   constructor() public
//   {
//     addFood(0x86478E3dFcfffBbc9B22Ba2B0dF9A439C097a08f, 'Cake - 400g' , 12, 999988887777);
//     addFood(0x08144aa4D7faa7e965596094d9E4745B946A5Dc9, 'Noodles - 500g', 41, 999988887773);
//     addFood(0x1Bdd0248b4aD5a27Da5E3482bFA4F5D15473bC23, 'Bisi Bela Bath - 1kg', 31, 9999);
//   }

//   function addUser()
//   {

//   }

   

  function createUser(address payable _user, uint32 _aadhar, UserType _user_type,
  string memory _location) public
  {
    userCount++;
    Uid2User[userCount] = Uadd2User[_user];
    Uadd2User[_user].uid = userCount;
    Uadd2User[_user].user = _user;
    Uadd2User[_user].aadhar = _aadhar;
    Uadd2User[_user].user_type = _user_type;
    Uadd2User[_user].location = _location;
    Uadd2User[_user].status = Authenticated.NV;
  }

  function validateUser(address payable _user, Authenticated _status) public
  {
    Uadd2User[_user].status = _status;
  }

  function setConsumer2ID(address _consumer, uint _id) public
  {
    Consumer2ID[_consumer] = _id;
  }

  function addFood(address payable _producer,  string memory _location, uint _price,
  string memory _food_name, string memory _food_desc, string memory _food_img_link) public
  {
    foodCount++;
    Producer2Food[_producer] = id2Food[foodCount];
    id2Food[foodCount].id = foodCount;
    id2Food[foodCount].producer = _producer;
    id2Food[foodCount].location = _location;
    id2Food[foodCount].price = _price;
    id2Food[foodCount].food_name = _food_name;
    id2Food[foodCount].food_desc = _food_desc;
    id2Food[foodCount].food_img_link = _food_img_link;
    id2Food[foodCount].phase = Phase.Available; 
  }

  function orderFood(uint _id, address _consumer, string memory _location) public
  {
    id2Food[_id].location = _location;
    id2Food[_id].consumer = _consumer;
    id2Food[_id].phase = Phase.Open;
  }

  function deliverFood(uint _id, address payable _delivery) public
  {
    id2Food[_id].delivery = _delivery;
    id2Food[_id].phase = Phase.Delivering;
  }

  // this is called when the consumer and delivery both click on seperate buttons 
  // 1. id2Food[_id].phase = Phase.Complete
  // 2. Trigger Escrow Contracts between C2D, C2P.

  function completeFood(uint _id) public
   {
      id2Food[_id].phase = Phase.Complete;
   }
}
