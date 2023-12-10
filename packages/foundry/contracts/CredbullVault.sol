//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC4626 } from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { VestingWallet } from "@openzeppelin/contracts/finance/VestingWallet.sol";

contract CredbullVault is Ownable, ERC4626 {
    error SharesNotMatured();

    struct Returns {
        uint256 principal;
        uint256 yield;
        uint256 total;
    }

    address public custodian;
    uint256 private assetSum;
    mapping(address => Returns) private _returns;

    VestingWallet public vesting;

    constructor(
        IERC20 _asset,
        address _custodian,
        string memory _shareName,
        string memory _shareSymbol,
        uint64 _start,
        uint64 _duration
    ) Ownable(_msgSender()) ERC4626(_asset) ERC20(_shareName, _shareSymbol) {
        custodian = _custodian;
        vesting = new VestingWallet(address(this), _start, _duration);
    }

    function totalAssets() public view virtual override returns (uint256) {
        return assetSum;
    }

    function receiveAssets(uint256 assets) public virtual onlyOwner {
        assetSum += assets;
    }

    function loanReturns(address owner) public view returns (Returns memory) {
        return _returns[owner];
    }

    function deposit(uint256 assets, address receiver) public virtual override returns (uint256) {
        uint256 shares = super.deposit(assets, receiver);

        IERC20(asset()).approve(address(this), assets);
        IERC20(asset()).transferFrom(address(this), custodian, assets);

        assetSum += assets;

        return shares;
    }

    function withdraw(uint256 assets, address receiver, address owner)
        public
        virtual
        override
        onlyOwner
        returns (uint256)
    {
        uint256 shares = super.withdraw(assets, receiver, owner);

        assetSum -= assets;

        _returns[owner] = Returns(shares, assets - shares, assets);

        return shares;
    }

    function redeem(uint256 shares, address receiver, address owner)
        public
        virtual
        override
        onlyOwner
        returns (uint256)
    {
        uint256 assets = super.redeem(shares, receiver, owner);

        assetSum -= assets;

        _returns[owner] = Returns(shares, assets - shares, assets);

        return assets;
    }

    function _withdraw(address caller, address receiver, address owner, uint256 assets, uint256 shares)
        internal
        virtual
        override
    {
        _burn(owner, shares);
        SafeERC20.safeTransfer(IERC20(asset()), receiver, assets);

        emit Withdraw(caller, receiver, owner, assets, shares);
    }

    function maturity() public view returns (uint256) {
        return vesting.end();
    }

    function maturityReached() public view returns (bool) {
        return uint64(block.timestamp) >= maturity();
    }
}
