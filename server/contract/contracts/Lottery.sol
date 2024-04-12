// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract Lottery {
    address public manager;
    address payable[] public players;
    address payable public winner;

    constructor() {
        manager = msg.sender;
    }

    function participate() public payable {
        require(msg.value == 1 ether, "Please pay 1 ether only");
        players.push(payable(msg.sender));
    }

    function getManager() public view returns (address) {
        return manager;
    }

    function getPlayers() public view returns (address payable[] memory) {
        console.log("PLAYERS:");
        for (uint256 i = 0; i < players.length; i++) {
            console.log(players[i]);
        }

        return players;
    }

    function getBanlance() public view returns(uint) {
        require(manager == msg.sender, "You are not the manager");
        return address(this).balance;
    }

    function random() internal view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }

    function pickWinner() public returns (address) {
        require(manager == msg.sender, "You are not the manager");
        require(players.length >= 3, "Players are less than 3");
        
        uint r = random();
        uint index = r%players.length;
        winner = players[index];
        winner.transfer(getBanlance());

        address resWinner = winner;

        console.log("WINNER:");
        console.log(resWinner);

        players = new address payable[](0);
        winner = payable(address(0));

        return resWinner;
    }
}