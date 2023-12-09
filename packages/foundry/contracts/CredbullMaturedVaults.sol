//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";

contract CredbullMaturedVaults {
    address[] public vaults;

    function addMaturedVault(address _vault) external {
        vaults.push(_vault);
    }

    function getMaturedVaults() external view returns (string memory) {
        bytes memory output;

        for (uint256 i = 0; i < vaults.length; i++) {
            if (i != 0) {
                output = abi.encodePacked(output, ",");
            }
            output = abi.encodePacked(output, Strings.toHexString(vaults[i]));
        }

        return string(output);
    }
}
