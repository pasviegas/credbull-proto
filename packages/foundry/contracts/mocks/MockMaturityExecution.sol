//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { Math } from "@openzeppelin/contracts/utils/math/Math.sol";
import { MockCustodian } from "./MockCustodian.sol";
import { CredbullVault } from "../CredbullVault.sol";
import { CredbullMaturedVaults } from "../CredbullMaturedVaults.sol";

contract MockMaturityExecution {
    using Math for uint256;

    MockCustodian public custodian;
    CredbullMaturedVaults public maturedVaults;

    constructor(MockCustodian _custodian, CredbullMaturedVaults _maturedVaults) {
        custodian = _custodian;
        maturedVaults = _maturedVaults;
    }

    function executeOnMaturity(address _vault, address[] calldata lenders) external {
        CredbullVault vault = CredbullVault(_vault);
        IERC20 asset = IERC20(vault.asset());

        uint256 principalAndYield = vault.totalAssets().mulDiv(110, 100);
        custodian.withdraw(address(asset), address(vault), principalAndYield);
        vault.receiveAssets(principalAndYield - vault.totalAssets() + 1);

        for (uint256 i = 0; i < lenders.length; i++) {
            uint256 lenderShare = vault.balanceOf(lenders[i]);
            vault.redeem(lenderShare, lenders[i], lenders[i]);
        }

        maturedVaults.addMaturedVault(_vault);
    }
}
