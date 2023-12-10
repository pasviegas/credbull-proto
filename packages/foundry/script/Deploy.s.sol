//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/CredbullVault.sol";
import "../contracts/CredbullActiveVaultDelegate.sol";
import "../contracts/CredbullMaturedVaults.sol";
import "../contracts/mocks/MockStableCoin.sol";
import "../contracts/mocks/MockCustodian.sol";
import "../contracts/mocks/MockTreasury.sol";
import "../contracts/mocks/MockMaturityExecution.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }

        vm.startBroadcast(deployerPrivateKey);

        CredbullMaturedVaults matured = new CredbullMaturedVaults();
        MockCustodian custodian = new MockCustodian();
        MockTreasury treasury = new MockTreasury();
        MockMaturityExecution executor = new MockMaturityExecution(custodian, treasury, matured);
        custodian.transferOwnership(address(executor));

        MockStableCoin token = new MockStableCoin();
        CredbullVault vault =
            new CredbullVault(token, address(custodian), "LPT", "Liquid Pool Token", uint64(block.timestamp), 60);
        vault.transferOwnership(address(executor));

        CredbullActiveVaultDelegate delegate = new CredbullActiveVaultDelegate(address(vault));

        console.logString(string.concat("Deployer Private Key: ", vm.toString(deployerPrivateKey)));
        console.logString(string.concat("CredbullVault deployed at: ", vm.toString(address(vault))));
        console.logString(string.concat("CredbullActiveVaultDelegate deployed at: ", vm.toString(address(delegate))));
        console.logString(string.concat("MockCustodian deployed at: ", vm.toString(address(custodian))));
        console.logString(string.concat("MockMaturityExecution deployed at: ", vm.toString(address(executor))));
        console.logString(string.concat("CredbullMaturedVaults deployed at: ", vm.toString(address(matured))));

        vm.stopBroadcast();

        exportDeployments();
    }

    function test() public { }
}
