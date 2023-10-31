// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ILockieToken  {
    function mint(address to, uint256 amount) external;

    function burn(uint256 tokenId) external;

}