// or less ideally
import { Col, Container, Row } from "react-bootstrap";
import Register from "../../components/Register/Register.component";
import Login from "../../components/Login/Login.component";
const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Col lg={6}>
          <Row>
            <h2>Login</h2>
          </Row>
          <div>
            <Login />
          </div>
        </Col>
        <Col lg={6}>
          <h2>SignUp</h2>
          <Register />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
