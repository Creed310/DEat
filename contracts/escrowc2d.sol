pragma solidity ^0.5.16;

contract EscrowC2D
{
    enum State { AwaitingPayToEscrow, AwaitingDeliveryOfItem, Complete }        //State of the item
    State public currState;                                                     //Current state

    address public consumer;                                                       //consumer address
    address payable public deliver;                                               //producer address (payable as it recieves ether)

    modifier onlyConsumer()
    {
        require(msg.sender == consumer, "Only the consumer can call this method");
        _;
    }

    constructor (address _consumer, address payable _deliver) public
    {
        consumer = _consumer;
        deliver = _deliver;
    }

    function deposit() onlyConsumer external payable
    {
        require(currState == State.AwaitingPayToEscrow, "Consumer has already paid to the Escrow Contract");
        currState = State.AwaitingDeliveryOfItem;
    }

    function confirmDelivery() onlyConsumer external
    {
        require(currState == State.AwaitingDeliveryOfItem, "Delivery has not been confirmed");
        deliver.transfer(address(this).balance);
        currState = State.Complete;  
    }
}