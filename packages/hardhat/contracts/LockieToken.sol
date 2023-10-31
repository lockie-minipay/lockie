// SPDX-License-Identifier: MIT
// Author @nnamdipremium

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LockieToken is ERC20Burnable {
    address lockieHQ;

    constructor(address _lockieHQ) ERC20("LockieToken", "LOCK") {
        lockieHQ = _lockieHQ;
    }

    modifier onlyLockieHq() {
        require(msg.sender == lockieHQ, "Not Permitted");
        _;
    }

    function mint(address to, uint256 amount) external onlyLockieHq {
        _mint(to, amount);
    }

    
}
