// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

pragma solidity ^0.8.17;

contract Invest is Ownable, ReentrancyGuard {
    using SafeMath for uint256;


    mapping(address => mapping(address=>uint256)) internal balances;
    mapping(address => uint256) internal bnbBalance;

    event NewDeposit(address indexed _from, uint256 _value);
    event Withdrawal(address indexed _to, uint256 _value);
    event WithdrawalOwner(address indexed _to, uint256 _value, uint256 _Value);

    IERC20 public token;

    function deposit(uint256 _amount, address selectedToken) public {
        require(_amount > 0, "amount can not be zero"); //if amount is zero or not
        uint256 allowance = IERC20(selectedToken).allowance(msg.sender, address(this));
        require(allowance >= _amount, "not enough balance");
        IERC20(selectedToken).transferFrom(msg.sender, address(this), _amount);
        balances[msg.sender][selectedToken] = balances[msg.sender][selectedToken].add(_amount);
        emit NewDeposit(msg.sender, _amount);
    }

    function depositBnb() public payable {
        bnbBalance[msg.sender] = bnbBalance[msg.sender].add(msg.value);
        emit NewDeposit(msg.sender, msg.value);
    }

    function withdraw(uint256 _amount, address selectedToken, bool native) public {
        if (!native) {
            require(_amount > 0, "amount can not be zero"); //if amount is zero or not
            require(IERC20(selectedToken).balanceOf(address(this)) >= _amount, "amount can not be withdrawed"); //if amount is zero or not
            require(balances[msg.sender][selectedToken] >= _amount, "amount can not be withdrawed"); //if amount is zero or not
            balances[msg.sender][selectedToken] = balances[msg.sender][selectedToken].sub(_amount);
            emit Withdrawal(msg.sender, _amount); 
        } 
        else{

            require(address(this).balance >= _amount, "amount can not be withdrawed"); //if amount is zero or not
            require(bnbBalance[msg.sender] >= _amount, "amount can not be withdrawed"); //if amount is zero or not
            bnbBalance[msg.sender] = bnbBalance[msg.sender].sub(_amount);
            payable(msg.sender).transfer(_amount);
            emit Withdrawal(msg.sender, _amount);  
        }
    }

    function withdrawOwner(address selectedToken) public onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
        payable(owner()).transfer(IERC20(selectedToken).balanceOf(address(this)));
        emit WithdrawalOwner(owner(), address(this).balance, IERC20(selectedToken).balanceOf(address(this)));
    }


    function deduct(address _user, address selectedToken, uint256 _amount, bool native) public onlyOwner {
        if( !native) {
            // uint256 balance = balances[_user][selectedToken];
            // if (balance > _amount)
            //     balances[_user] = balances[_user].sub(_amount);
            // else
            //     balances[_user] = 0;
            require(balances[_user][selectedToken] >= _amount, "amount can not be bigger!");
            balances[_user][selectedToken] = balances[_user][selectedToken].sub(_amount);
        }
        else{
            require(bnbBalance[_user] >= _amount, "amount can not be bigger!");
            bnbBalance[_user] = bnbBalance[_user].sub(_amount);
        }       
    }

    function getBalance(address _tokenAddress) public view returns (uint256) {
        return (balances[msg.sender][_tokenAddress]);
    }
    function getBalanceBnb() public view returns (uint256) {
        return (bnbBalance[msg.sender]);
    }
}