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
    
    /**
     * @dev Constructor function.
     * Sets the contract owner, minimum bet, and opens the lottery.
     */
    constructor() {
        owner = msg.sender;
        minimumBet = 1 ether;
        lotteryOpen = true;
    }
    
    /**
     * @dev Modifier to restrict access to the contract owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    /**
     * @dev Modifier to restrict access when the lottery is open.
     */
    modifier onlyWhenOpen() {
        require(lotteryOpen, "Lottery is not open");
        _;
    }

    /**
     * @dev Modifier to restrict access when the lottery is closed.
     */
    modifier onlyWhenClose() {
        require(!lotteryOpen, "Lottery is open");
        _;
    }
    
    /**
     * @dev Allows a player to participate in the lottery by sending Ether.
     * The minimum bet amount must be met.
     */
    function participate() public payable onlyWhenOpen {
        require(msg.value >= minimumBet, "Not enough Ether sent");
        players.push(msg.sender);
        transactions.push(Transaction(msg.sender, address(this), msg.value, block.timestamp));
        emit NewPlayer(msg.sender, msg.value);
    }

    /**
     * @dev Picks a winner for the lottery.
     * Only the contract owner can call this function.
     * The lottery must have at least one player.
     * Generates a random number based on the current block timestamp, block difficulty, and number of players.
     * Transfers the prize amount to the winner and deducts the lottery fee.
     * Closes the lottery and emits the LotteryClosed event.
     */
    function pickWinner() public payable onlyOwner onlyWhenOpen {
        require(players.length > 0, "No players in the lottery");
        uint seed = block.timestamp + block.difficulty + players.length;
        randomNumber = uint(keccak256(abi.encodePacked(blockhash(block.number - 1), seed)));
        
        winner = players[(randomNumber % players.length)];
        uint balance = address(this).balance;
        uint deducted = balance / players.length; // lottery fee and belong to lottery owner by call withdrawFund function
        amountWon = balance - deducted;
        
        transactions.push(Transaction(address(this), winner, amountWon, block.timestamp));
        payable(winner).transfer(amountWon);
        emit LotteryClosed(winner, amountWon);
        
        delete players;
        lotteryOpen = false;
    }
    
    /**
     * @dev Allows the contract owner to withdraw the remaining funds in the contract.
     * Only available when the lottery is closed.
     * Transfers the remaining balance to the contract owner.
     */
    function withdrawFunds() public payable onlyOwner onlyWhenClose {
        transactions.push(Transaction(address(this), owner, address(this).balance, block.timestamp));
        payable(owner).transfer(address(this).balance);
    }

    /**
     * @dev Reopens the lottery.
     * Only the contract owner can call this function.
     * Sets the lottery status to open.
     */
    function reopenLottery() public onlyOwner onlyWhenClose {
        lotteryOpen = true;
    }
    
    /**
     * @dev Returns the array of players who participated in the lottery.
     */
    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    /**
     * @dev Returns the address of the contract owner.
     */
    function getManager() public view returns (address)  {
        return owner;
    }

    /**
     * @dev Returns the current balance of the contract.
     */
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    /**
     * @dev Returns the address of the winner of the last closed lottery.
     */
    function getWinner() public view returns (address) {
        return winner;
    }
    
    /**
     * @dev Returns the status of the lottery (open or closed).
     */
    function getIsOpen() public view returns (bool) {
        return lotteryOpen;
    }    
    
    /**
     * @dev Returns the amount won by the winner of the last closed lottery.
     */
    function getAmountWon() public view returns (uint) {
        return amountWon;
    }    
    
    /**
     * @dev Returns the array of transactions recorded in the contract.
     */
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
    
    /**
     * @dev Returns the last generated random number.
     */
    function getRandomNumber() public view returns (uint) {
        return randomNumber;
    }    

}
