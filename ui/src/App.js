import {
  Navbar,
  Container,
  Button,
  Form,
  FormControl,
  Tabs,
  Tab,
  Row,
  Col,
  Card,
} from "react-bootstrap";

import Web3 from "web3";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

import NFTMarket from "./ContractJSON/NFTMarket.json";
import NFT from "./ContractJSON/NFT.json";

function App() {
  useEffect(() => {
    getColorTokenDetails();
    getItemDetails();
    enableMetaMask();
  }, []);

  const [nftValue, setnftValue] = useState("");
  const [colorTokenDetails, setColorTokenDetails] = useState([]);
  const [itemDetails, setItemDetails] = useState([]);

  const ethereum = window.ethereum;

  const web3 = new Web3(ethereum);

  const NFTMarketContractAddress = NFTMarket.networks["5777"].address;
  const NFTMarketContractAbi = NFTMarket.abi;
  const NFTMarketContract = new web3.eth.Contract(
    NFTMarketContractAbi,
    NFTMarketContractAddress
  );

  const NFTContractAddress = NFT.networks["5777"].address;
  const NFTContractAbi = NFT.abi;
  const NFTContract = new web3.eth.Contract(NFTContractAbi, NFTContractAddress);

  const nftValueChangeHandler = (event) => {
    setnftValue(event.target.value);
  };

  const enableMetaMask = async () => {
    await ethereum.request({ method: "eth_requestAccounts" });
    console.log(ethereum.selectedAddress);
  };

  const mintTokenHandler = async (event) => {
    enableMetaMask();
    console.log(nftValue);
    const infoValue = await NFTContract.methods
      .createToken(nftValue)
      .send({ from: ethereum.selectedAddress });
    console.log(infoValue);
    getColorTokenDetails();
    setnftValue("");
  };

  const getColorTokenDetails = async () => {
    const nFTCount = await NFTContract.methods.getTokenCount().call();
    console.log(nFTCount);
    let colorTokenDetailsList = [];
    for (var i = 1; i <= nFTCount; i++) {
      const colorNFTValue = await NFTContract.methods.colorsName(i).call();
      const ownerNFT = await NFTContract.methods.ownerOf(i).call();
      let newColorToken = {
        colorTokenValue: colorNFTValue,
        nftOwner: ownerNFT,
        nftID: i,
      };
      colorTokenDetailsList.push(newColorToken);
    }
    console.log(colorTokenDetailsList);
    setColorTokenDetails(colorTokenDetailsList);
  };

  const putOnSale = async (id) => {
    console.log(id);
    enableMetaMask();
    const infoValue = await NFTMarketContract.methods
      .createMarketItem(NFTContractAddress, id)
      .send({ from: ethereum.selectedAddress, value: 25000000000000000 });
    console.log(infoValue);
    getItemDetails();
  };

  const getItemDetails = async () => {
    const itemCount = await NFTMarketContract.methods.getItemCount().call();
    console.log(itemCount);
    let itemDetailsList = [];
    for (var i = 1; i <= itemCount; i++) {
      const itemDetail = await NFTMarketContract.methods
        .idToMarketItem(i)
        .call();
      const colorNFTValue = await NFTContract.methods
        .colorsName(itemDetail.tokenId)
        .call();
      console.log(itemDetail);
      if (!itemDetail.sold) {
        let newItemToken = {
          colorTokenValue: colorNFTValue,
          nftSeller: itemDetail.seller,
          itemID: i,
        };
        itemDetailsList.push(newItemToken);
      }
    }
    console.log(itemDetailsList);
    setItemDetails(itemDetailsList);
  };

  const buyToken = async (id) => {
    console.log(id);
    enableMetaMask();
    const infoValue = await NFTMarketContract.methods
      .createMarketSale(NFTContractAddress, id)
      .send({ from: ethereum.selectedAddress, value: 1000000000000000000 });
    console.log(infoValue);
    getItemDetails();
    getColorTokenDetails();
  };

  return (
    <div style={{ maxWidth: "99.20%" }}>
      <Navbar bg="light" expand="sm">
        <Container fluid>
          <Navbar.Brand href="/">
            <b>🛒</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />

          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Hex Color Code"
              className="me-2"
              aria-label="hexCode"
              value={nftValue}
              onChange={nftValueChangeHandler}
            />
            <Button variant="outline-primary" onClick={mintTokenHandler}>
              Mint Token
            </Button>
          </Form>
        </Container>
      </Navbar>{" "}
      <br />
      <Tabs
        defaultActiveKey="nftList"
        id="uncontrolled-tab-example"
        className="mb-3"
        style={{ paddingLeft: "10px" }}
      >
        <Tab
          eventKey="nftList"
          title="Color Token Collection"
          style={{ paddingLeft: "10px" }}
        >
          <Row xs={1} md={4} className="g-4">
            {colorTokenDetails.map((colorDetail) => (
              <Col>
                <Card style={{ width: "20rem" }}>
                  <Card.Header
                    style={{
                      backgroundColor: colorDetail.colorTokenValue,
                      height: "3rem",
                    }}
                  ></Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <b> {colorDetail.colorTokenValue} </b>
                    </Card.Title>

                    <Card.Text>
                      <b>Owner:</b> {colorDetail.nftOwner} <br />
                      <b>NFT ID:</b> {colorDetail.nftID}
                    </Card.Text>
                    <Button
                      variant="warning"
                      onClick={() => putOnSale(colorDetail.nftID)}
                    >
                      Sell Token
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <br />
        </Tab>
        <Tab
          eventKey="marketPlace"
          title="Market"
          style={{ paddingLeft: "10px" }}
        >
          <Row xs={1} md={4} className="g-4">
            {itemDetails.map((itemDetail) => (
              <Col>
                <Card style={{ width: "20rem" }}>
                  <Card.Header
                    style={{
                      backgroundColor: itemDetail.colorTokenValue,
                      height: "3rem",
                    }}
                  ></Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <b> {itemDetail.colorTokenValue} </b>
                    </Card.Title>

                    <Card.Text>
                      <b>Seller: </b> {itemDetail.nftSeller} <br />
                      <b>Price: </b> 1 Ether.
                    </Card.Text>
                    <Button variant="info" onClick={() => buyToken(itemDetail.itemID)}>Buy Token</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <br />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
