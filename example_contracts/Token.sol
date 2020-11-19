//SPDX-License-Identifier: Unlicense
// Add Solidity compiler 0.6.2 to you hardhat.config.ts
pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 amount
    ) public ERC20(name, symbol) {
        _mint(msg.sender, amount);
    }
}
