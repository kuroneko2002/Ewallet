//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;

    /**
     * @dev Constructor function that initializes the Greeter contract with a greeting message.
     * @param _greeting The initial greeting message.
     */
    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    /**
     * @dev Retrieves the current greeting message.
     * @return The current greeting message.
     */
    function greet() public view returns (string memory) {
        return greeting;
    }

    /**
     * @dev Updates the greeting message.
     * @param _greeting The new greeting message.
     */
    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    /**
     * @dev Allows the contract to receive Ether.
     */
    function deposit() public payable {}
}
