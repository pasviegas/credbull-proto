//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC4626 } from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract CredbullVault is Ownable, ERC4626 {

    address public custodian;
    uint256 private assetSum;

    constructor(IERC20 _asset, address _custodian, string memory _shareName, string memory _shareSymbol)
        Ownable(_msgSender())
        ERC4626(_asset)
        ERC20(_shareName, _shareSymbol)
    {
        custodian = _custodian;
    }

    function totalAssets() public override view virtual returns (uint256) {
        return assetSum;
    }

    function deposit(uint256 assets, address receiver) public override virtual returns (uint256) {
        uint256 shares = super.deposit(assets, receiver);

        IERC20(asset()).approve(address(this), assets);
        IERC20(asset()).transferFrom(address(this), custodian, assets);

        assetSum += assets;

        return shares;
    }

    function mint(uint256 shares, address receiver) public override virtual onlyOwner returns (uint256) {
        return super.mint(shares, receiver);
    }
}
