// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartWallet {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // Deposit Ether into the wallet
    receive() external payable {}

    // Withdraw Ether from the wallet
    function withdraw(uint amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(owner).transfer(amount);
    }

    // Check the balance of the wallet
    function checkBalance() public view returns (uint) {
        return address(this).balance;
    }
}
