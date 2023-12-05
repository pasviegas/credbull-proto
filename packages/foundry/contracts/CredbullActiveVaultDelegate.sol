//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract CredbullActiveVaultDelegate {
    address public activeVault;

    constructor(address _activeVault) {
        activeVault = _activeVault;
    }
}
