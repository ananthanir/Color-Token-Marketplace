// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    mapping(uint256 => string) public colorsName;
    mapping(string => bool) _colorExists;

    using Counters for Counters.Counter;
    Counters.Counter private tokenIds;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("ColorToken", "CT") {
        contractAddress = marketplaceAddress;
    }

    function getTokenCount() public view returns (uint256) {
        return tokenIds.current();
    }

    function createToken(string memory colorCode) public {
        require(!_colorExists[colorCode]);

        tokenIds.increment();
        uint256 tokenId = tokenIds.current();
        colorsName[tokenId] = colorCode;

        _colorExists[colorCode] = true;

        _mint(msg.sender, tokenId);
        approve(contractAddress, tokenId);
    }
}
