// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract CredbullBadge is ERC721, Ownable, IERC721Receiver {

    mapping(address => uint256) private bagdes;

    constructor()
    ERC721("CredbullBadge", "CBB")
    Ownable(_msgSender())
    {}

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function tier(address _owner) public view returns (uint256) {
        return bagdes[_owner];
    }

    function setTier(address _owner, uint256 tokenId) public  {
        bagdes[_owner] = tokenId;
    }

    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
