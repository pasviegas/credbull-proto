//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/CredbullVault.sol";
import "../contracts/CredbullActiveVaultDelegate.sol";
import "../contracts/mocks/MockStableCoin.sol";
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

        MockStableCoin token = new MockStableCoin();
        CredbullVault vault = new CredbullVault(token,"LPT","Liquid Pool Token");
        CredbullActiveVaultDelegate delegate = new CredbullActiveVaultDelegate(address(vault));

        console.logString(string.concat("Deployer Private Key: ", vm.toString(deployerPrivateKey)));
        console.logString(string.concat("CredbullVault deployed at: ", vm.toString(address(vault))));
        console.logString(string.concat("CredbullActiveVaultDelegate deployed at: ", vm.toString(address(delegate))));

        vm.stopBroadcast();

        exportDeployments();
    }

    function test() public { }
}
