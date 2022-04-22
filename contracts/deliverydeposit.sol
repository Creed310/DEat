pragma solidity ^0.5.16;

contract DeliveryDeposit
{
    uint256 public balance;

    function d_security_deposit() public payable
    {
        //delivery security deposit is sent
        balance = balance + msg.value;
    }

    function bal_of_dsd() public view returns(uint256)
    {
        return address(this).balance;
    }

    function reimburse_producer(uint256 amount) public  
    {
        msg.sender.transfer(amount);
        balance = balance - amount;

    }

}

//when the delivery chooses in delivery.html, 
// this deposit contract is connected to the producer of the order's address