// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

pragma solidity ^0.8.17;

contract Invest is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    IERC20 public token;
    mapping(address => uint256) internal balances;

    event NewDeposit(address indexed _from, uint256 _value);
    event Withdrawal(address indexed _to, uint256 _value);

    constructor(address _token) {
        token = IERC20(_token);
    }

    function deposit(uint256 _amount) public {
        require(_amount > 0, "amount can not be zero"); //if amount is zero or not
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= _amount, "not enough balance");
        token.transferFrom(msg.sender, address(this), _amount);
        balances[msg.sender] = balances[msg.sender].add(_amount);
        emit NewDeposit(msg.sender, _amount);
    }

    function withdraw(uint256 _amount) public {
        require(_amount > 0, "amount can not be zero"); //if amount is zero or not
        require(token.balanceOf(msg.sender) >= _amount, "not enough balance");
        token.transfer(msg.sender, _amount);
        balances[msg.sender] = balances[msg.sender].sub(_amount);
        emit Withdrawal(msg.sender, _amount);
    }

    function withdrawOwner() public onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
        emit Withdrawal(owner(), address(this).balance);
    }

    function deduct(address _user, uint256 _amount) public onlyOwner {
        uint256 balance = balances[_user];
        if (balance > _amount)
            balances[_user] = balances[_user].sub(_amount);
        else
            balances[_user] = 0;
    }

    function setToken(address _token) public onlyOwner {
        token = IERC20(_token);
    }

    function getBalance(address _address) public view returns (uint256) {
        return balances[_address];
    }
}