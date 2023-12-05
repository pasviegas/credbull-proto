//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC4626 } from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract CredbullVault is Ownable, ERC4626 {
    constructor(IERC20 _asset, string memory _shareName, string memory _shareSymbol)
        Ownable(_msgSender())
        ERC4626(_asset)
        ERC20(_shareName, _shareSymbol)
    { }
}
