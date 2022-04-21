pragma solidity ^0.5.16;

contract EscrowC2D 
{
    address consumer;
    mapping(address => uint256) public deposits;

    // modifier onlyConsumer()
    // {
    //     require(msg.sender==consumer);
    //     _;
    // }

    constructor() public
    {
        consumer = msg.sender;
    }

    function c2d_deposit(address payable _delivery) public payable
    {
        uint256 amount = msg.value;
        deposits[_delivery] = deposits[_delivery]+amount;
    }

    function c2d_withdraw(address payable _delivery) public payable
    {
        uint256 payment = deposits[_delivery];
        deposits[_delivery] = 0;
        _delivery.transfer(payment);
    }
}