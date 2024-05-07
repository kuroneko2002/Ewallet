// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract Lottery {
    address public owner;
    address[] public players;
    address public winner;
    uint public amountWon;
    uint public minimumBet;
    uint public randomNumber;
    bool public lotteryOpen;
    struct Transaction {
        address sender;
        address receiver;
        uint amount;
        uint timestamp;
    }
    Transaction[] public transactions;
    
    event NewPlayer(address indexed player, uint indexed amount);
    event LotteryClosed(address indexed winner, uint indexed amountWon);
    event TransactionRecorded(address indexed sender, address indexed receiver, uint amount, uint timestamp);
    
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

    modifier onlyWhenClose() {
        require(!lotteryOpen, "Lottery is open");
        _;
    }
    
    function participate() public payable onlyWhenOpen {
    require(msg.value >= minimumBet, "Not enough Ether sent");
    players.push(msg.sender);
    transactions.push(Transaction(msg.sender, address(this), msg.value, block.timestamp));
    emit NewPlayer(msg.sender, msg.value);
    }

    
    function pickWinner() public payable onlyOwner onlyWhenOpen {
        require(players.length > 0, "No players in the lottery");
        uint seed = block.timestamp + block.difficulty + players.length;
        randomNumber = uint(keccak256(abi.encodePacked(blockhash(block.number - 1), seed))) % players.length;
        
        winner = players[randomNumber];
        uint balance = address(this).balance;
        uint deducted = balance / players.length; // lottery fee and belong to lottery owner by call withdrawFund function
        amountWon = balance - deducted;
        
        transactions.push(Transaction(address(this), winner, amountWon, block.timestamp));
        payable(winner).transfer(amountWon);
        emit LotteryClosed(winner, amountWon);
        
        delete players;
        lotteryOpen = false;
    }
    
    function withdrawFunds() public payable onlyOwner onlyWhenClose {
        transactions.push(Transaction(address(this), owner, address(this).balance, block.timestamp));
        payable(owner).transfer(address(this).balance);
    }

    function reopenLottery() public onlyOwner onlyWhenClose {
        lotteryOpen = true;
    }
    
    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function getManager() public view returns (address)  {
        return owner;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getWinner() public view returns (address) {
        return winner;
    }
    
    function getIsOpen() public view returns (bool) {
        return lotteryOpen;
    }    
    
    function getAmountWon() public view returns (uint) {
        return amountWon;
    }    
    
    function getTransactions() external view returns (address[] memory senders, address[] memory receivers, uint[] memory amounts, uint[] memory timestamps) {
        uint count = transactions.length;
        senders = new address[](count);
        receivers = new address[](count);
        amounts = new uint[](count);
        timestamps = new uint[](count);

        for (uint i = 0; i < count; i++) {
            Transaction memory transaction = transactions[i];
            senders[i] = transaction.sender;
            receivers[i] = transaction.receiver;
            amounts[i] = transaction.amount;
            timestamps[i] = transaction.timestamp;
        }
    }
}
