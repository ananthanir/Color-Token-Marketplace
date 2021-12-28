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
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div style={{ maxWidth: '99.20%'}}>
      <Navbar bg="light" expand="sm" >
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
            />
            <Button variant="outline-primary">Mint Token</Button>
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
                    <Button variant="warning">Sell Token</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <br/>
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
          <br/>
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
