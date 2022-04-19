pragma solidity ^0.5.16;

//3 different pages open up and 3 different SC are deployed based on userType.
//the 3 contracts talk to each other.

contract DEat
{
  struct Item
  {
    address cook;
    uint id;
    string food;
    uint price;
  }

  //string public userType;
  uint public foodCount = 0;

  uint[] public arrOrd;
  mapping(uint => Item) public C2I;
  mapping(address => uint[]) public B2I;
  mapping(address => uint64) public U2A;

  constructor() public
  {
    addFood(0x86478E3dFcfffBbc9B22Ba2B0dF9A439C097a08f, 'Cake - 400g' , 12, 999988887777);
    addFood(0x08144aa4D7faa7e965596094d9E4745B946A5Dc9, 'Noodles - 500g', 41, 999988887773);
    addFood(0x1Bdd0248b4aD5a27Da5E3482bFA4F5D15473bC23, 'Bisi Bela Bath - 1kg', 31, 9999);
  }
  function addFood(address _cook,  string memory _food, uint _price, uint64 _aadhar) public
  {
    foodCount++;
    C2I[foodCount].id = foodCount;
    C2I[foodCount].cook = _cook;
    C2I[foodCount].food = _food;
    C2I[foodCount].price = _price;
    bindU2A(_cook, _aadhar);
  }

  function orderFood(address _buyer, uint _id) public
  {
    B2I[_buyer].push(_id);
  }

  function bindU2A(address _user, uint64 _aadhar) public
  {
    U2A[_user] = _aadhar;
  }
}
