// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract Lottery {
    address public owner;
    address[] public players;
    uint public minimumBet;
    uint public randomNumber;
    bool public lotteryOpen;
    
    event NewPlayer(address indexed player, uint indexed amount);
    event LotteryClosed(address indexed winner, uint indexed amountWon);
    
    constructor() {
        owner = msg.sender;
        minimumBet = 1 ether;
        lotteryOpen = true;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyWhenOpen() {
        require(lotteryOpen, "Lottery is not open");
        _;
    }
    
    function participate() public payable onlyWhenOpen {
        require(msg.value >= minimumBet, "Not enough Ether sent");
        players.push(msg.sender);
        emit NewPlayer(msg.sender, msg.value);
    }
    
    function pickWinner() public onlyOwner onlyWhenOpen {
        require(players.length > 0, "No players in the lottery");
        uint seed = block.timestamp + block.difficulty + players.length;
        randomNumber = uint(keccak256(abi.encodePacked(blockhash(block.number - 1), seed))) % players.length;
        
        address winner = players[randomNumber];
        uint balance = address(this).balance;
        uint deducted = balance / players.length; // lottery fee and belong to lottery owner by call withdrawFund function
        uint amountWon = balance - deducted;
        
        payable(winner).transfer(amountWon);
        emit LotteryClosed(winner, amountWon);
        
        delete players;
        lotteryOpen = false;
    }
    
    function withdrawFunds() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function getManager() public view returns (address)  {
        return owner;
    }

    function getBanlance() public view returns (uint) {
        return address(this).balance;
    }
}