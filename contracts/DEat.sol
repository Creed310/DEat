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
    string loc;
    uint price;
  }

  //string public userType;
  uint public foodCount = 0;

  uint[] public arrOrd;
  mapping(uint => Item) public C2I;
  mapping(address => uint[]) public B2I;

  constructor() public
  {
    addFood(0x86478E3dFcfffBbc9B22Ba2B0dF9A439C097a08f, 'Cake', 'Anna Nagar East', 12);
    addFood(0x08144aa4D7faa7e965596094d9E4745B946A5Dc9, 'Noodles', 'Perungudi', 41);
    addFood(0x1Bdd0248b4aD5a27Da5E3482bFA4F5D15473bC23, 'Bisi Bela Bath', 'Adyar', 31);
  }
  function addFood(address _cook,  string memory _food, string memory _loc, uint _price) public
  {
    foodCount++;
    C2I[foodCount].id = foodCount;
    C2I[foodCount].cook = _cook;
    C2I[foodCount].food = _food;
    C2I[foodCount].loc = _loc;
    C2I[foodCount].price = _price;
  }

  function orderFood(address _buyer, uint _id) public
  {
    B2I[_buyer].push(_id);
  }

  /*function order_len(address _viewer) private view returns(uint) 
    {  
        uint ord_len = B2I[_viewer].length;
        return ord_len; 
    } 

  function viewOrders(address _viewer) public view returns(uint[] memory)
  {
    address viewer = _viewer;
    uint ord_len = order_len(viewer);
    uint[] memory js_ord_arr;
    uint[] storage sol_ord_arr = B2I[_viewer];
    for (uint i = 0; i<ord_len; i++)
    {
      js_ord_arr[i] = sol_ord_arr[i];
    }
    return js_ord_arr;
  }*/
}
