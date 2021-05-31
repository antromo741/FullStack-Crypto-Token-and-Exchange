pragma solidity ^0.5.0;
import "./Token.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Exchange {
    using SafeMath for uint;

    address public feeAccount; //account that recieves exchange fees
    uint256 public feePercent; //THe fee percentage
    mapping(address => mapping(address => uint256)) public tokens;

    constructor (address _feeAccount, uint256 _feePercent) public {
        feeAccount = _feeAccount; //state variable set equal to the local variable
        feePercent = _feePercent;
    }

    function depositToken(address _token, uint256 _amount) public {
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));
        tokens[_token][msg.sender] = tokens[_token][msg.sender].add(_amount);
    
    }


}




//Deposit & Withdraw





//Manage Orders






//Handle Trades