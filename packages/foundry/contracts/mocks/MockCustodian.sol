//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract MockCustodian is Ownable {
    constructor() Ownable(_msgSender()) { }

    function withdraw(address _asset, address _vault, uint256 _amount) external onlyOwner {
        IERC20 asset = IERC20(_asset);

        asset.approve(address(this), _amount);
        asset.transferFrom(address(this), _vault, _amount);
    }
}
