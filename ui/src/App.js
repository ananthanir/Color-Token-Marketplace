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
    enableMetaMask();
  }, []);

  const [nftValue, setnftValue] = useState("");
  const [colorTokenDetails, setColorTokenDetails] = useState([]);

  const ethereum = window.ethereum;

  const web3 = new Web3(ethereum);

  const NFTMarketContractAddress = NFTMarket.networks["5777"].address;
  const NFTMarketContractAbi = NFTMarket.abi;
  const NFTMarketContract = new web3.eth.Contract(NFTMarketContractAbi, NFTMarketContractAddress);

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

  return (
    <div style={{ maxWidth: "99.20%" }}>
      <Navbar bg="light" expand="sm">
        <Container fluid>
          <Navbar.Brand href="/">
            <b>Color Token Collection</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />

          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Hex Color Code"
              className="me-2"
              aria-label="hexCode"
              onChange={nftValueChangeHandler}
            />
            <Button variant="outline-primary" onClick={mintTokenHandler}>Mint Token</Button>
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
                    style={{ backgroundColor: colorDetail.colorTokenValue, height: "3rem" }}
                  ></Card.Header>
                  <Card.Body>
                    <Card.Title style={{ fo: "#000000" }}>
                      <b> {colorDetail.colorTokenValue} </b>
                    </Card.Title>

                    <Card.Text>
                      0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
                    </Card.Text>
                    <Button variant="warning">Sell Token</Button>
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
            {[
              "#fcba03",
              "#75d147",
              "#ffffff",
              "#000000",
              "#f20707",
              "#025173",
              "#7de374",
              "#e174e3",
              "#5a045c",
            ].map((variant, idx) => (
              <Col>
                <Card style={{ width: "20rem" }} key={idx}>
                  <Card.Header
                    style={{ backgroundColor: variant, height: "3rem" }}
                  ></Card.Header>
                  <Card.Body>
                    <Card.Title style={{ fo: "#000000" }}>
                      <b> {variant} </b>
                    </Card.Title>

                    <Card.Text>
                      0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
                    </Card.Text>
                    <Button variant="info">Buy Token</Button>
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
