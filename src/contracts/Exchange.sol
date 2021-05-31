pragma solidity ^0.5.0;

contract Exchange {

    address public feeAccount; //account that recieves exchange fees
    uint256 public feePercent; //THe fee percentage
    constructor (address _feeAccount, uint256 _feePercent) public {
        feeAccount = _feeAccount; //state variable set equal to the local variable
        feePercent = _feePercent;
    }
}




//Deposit & Withdraw





//Manage Orders






//Handle Trades