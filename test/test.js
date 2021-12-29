const NFTMarket = artifacts.require("NFTMarket");
const NFT = artifacts.require("NFT");

contract("NFTMarket", function(accounts) {
    it("Should create Token and execute market sales", async function() {
      let instance = await NFTMarket.deployed();

      let NFTINstance = await NFT.deployed();

      const nftContractAddress = await NFTINstance.address;
  
      await NFTINstance.createToken("#000000", {from: accounts[0]});
      await NFTINstance.createToken("#ffffff", {from: accounts[0]});

      assert.equal(await NFTINstance.ownerOf(1), accounts[0]);

      console.log("Before Sale Owner: ",await NFTINstance.ownerOf(1), " is account 0", accounts[0]);
    
      await instance.createMarketItem(nftContractAddress, 1, {from: accounts[0], value: 25000000000000000 });
      await instance.createMarketItem(nftContractAddress, 2, {from: accounts[0], value: 25000000000000000 });
        
      await instance.createMarketSale(nftContractAddress, 1, {from: accounts[1], value: 1000000000000000000});

      console.log("After Sale Owner: ",await NFTINstance.ownerOf(1), " is account 1", accounts[1]);

      assert.equal(await NFTINstance.ownerOf(1), accounts[1]);  
    })
  })