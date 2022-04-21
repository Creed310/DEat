pragma solidity ^0.5.16;

contract EscrowC2P
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

    function c2p_deposit(address payable _producer) public payable
    {
        uint256 amount = msg.value;
        deposits[_producer] = deposits[_producer]+amount;
    }

    function c2p_withdraw(address payable _producer) public payable
    {
        uint256 payment = deposits[_producer];
        deposits[_producer] = 0;
        _producer.transfer(payment);
    }
}