pragma solidity ^0.5.0;
import "./Token.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Exchange {
    using SafeMath for uint;

    //Variables
    address public feeAccount; //account that recieves exchange fees
    uint256 public feePercent; //THe fee percentage
    address constant ETHER = address(0); //store ether in tokens mapping with blank addess
    mapping(address => mapping(address => uint256)) public tokens;
    mapping(uint256 => _Order) public orders;
    uint256 public orderCount;
    mapping(uint256 => bool) public orderCancelled;

    //Events
    event Deposit(address token, address user, uint256 amount, uint256 balance);
    event Withdraw(address token, address user, uint256 amount, uint256 balance);
    event Order(
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive,
        uint256 amountGive,
        uint256 timestamp
    );

    event Cancel(
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive,
        uint256 amountGive,
        uint256 timestamp
    );

    //Structs
    struct _Order {
        uint256 id;
        address user;
        address tokenGet;
        uint256 amountGet;
        address tokenGive;
        uint256 amountGive;
        uint256 timestamp;
    }

    constructor (address _feeAccount, uint256 _feePercent) public {
        feeAccount = _feeAccount; //state variable set equal to the local variable
        feePercent = _feePercent;
    }

    //Fallback: reverts if Ether is sent to this smart contract by mistake
    function() external {
        revert();
    }


    //Deposit & Withdraw

    function depositEther() payable public {
        tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].add(msg.value);
        emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
    }

    function withdrawEther(uint _amount) public {
        require(tokens[ETHER][msg.sender] >= _amount);
        tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].sub(_amount);
        msg.sender.transfer(_amount);
        emit Withdraw(ETHER, msg.sender, _amount, tokens[ETHER][msg.sender]);
    }

    function depositToken(address _token, uint256 _amount) public {
        //Dont allow Ether deposits
        require(_token != ETHER);
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));
        tokens[_token][msg.sender] = tokens[_token][msg.sender].add(_amount);
        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    function withdrawToken(address _token, uint256 _amount) public {
        require(_token != ETHER);
        require(tokens[_token][msg.sender] >= _amount);
        tokens[_token][msg.sender] = tokens[_token][msg.sender].sub(_amount);
        require(Token(_token).transfer(msg.sender, _amount));
        emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    function balanceOf(address _token, address _user) public view returns (uint256) {
        return tokens[_token][_user];
    }

    function makeOrder(address _tokenGet, uint256 _amountGet, address _tokenGive, uint256 _amountGive) public {
        orderCount = orderCount.add(1);
        orders[orderCount] = _Order(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive, now);
        emit Order(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive, now);
    }

    function cancelOrder(uint256 _id) public {
        //Need to make sure order is valid and that only the person who made the order can cancel it
        _Order storage _order = orders[_id];
        require(address(_order.user) == msg.sender);
        require(_order.id == _id); //Make sure the order exists
        orderCancelled[_id] = true;
        emit Cancel(_order.id, msg.sender, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive, now);
    }

    function fillOrder(uint256 _id) public {
        _Order storage _order = orders[_id];
        _trade(_order.id, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive);


        
    }

    function _trade(uint256 _orderId, address _user, address _tokenGet, uint256 _amountGet, address _tokenGive, uint256 _amountGive) internal{
       //fee paid by user who fills order aka msg sender
       //fee deducted from _amountGet
        uint256 _feeAmount = _amountGive.mul(feePercent).div(100);
        
        //user creates the order and msg sender fills the order
        tokens[_tokenGet][msg.sender] = tokens[_tokenGet][msg.sender].sub(_amountGet.add(_feeAmount));
        tokens[_tokenGet][_user] = tokens[_tokenGet][_user].add(_amountGet);
        //adds fees
        tokens[_tokenGive][feeAccount] = tokens[_tokenGet][feeAccount].add(_feeAmount);
        tokens[_tokenGive][_user] = tokens[_tokenGive][_user].sub(_amountGive);
        tokens[_tokenGive][msg.sender] = tokens[_tokenGive][msg.sender].add(_amountGive);
    }

}








//Manage Orders






//Handle Trades