// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter public itemIds;

    address payable owner;
    uint256 listingPrice = 0.025 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        bool sold;
    }

    mapping(uint256 => MarketItem) public idToMarketItem;

    function getItemCount() public view returns (uint256) {
        return itemIds.current();
    }

    /* Places an item for sale on the marketplace */
    function createMarketItem(address nftContract, uint256 tokenId)
        public
        payable
        nonReentrant
    {
        require(msg.sender == IERC721(nftContract).ownerOf(tokenId));
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        itemIds.increment();
        uint256 itemId = itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            false
        );
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        require(
            msg.value == 1 ether,
            "Please submit the asking price in order to complete the purchase"
        );

        idToMarketItem[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(
            idToMarketItem[itemId].seller,
            msg.sender,
            tokenId
        );
        idToMarketItem[itemId].sold = true;
        payable(owner).transfer(listingPrice);
    }
}
