import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4">
      <Container>
        <Row>
          <Col md={4} className="text-center text-md-left">
            <h5>About Us</h5>
            <p>
              PixrGAN is a damaged photo restoration service that uses GFPGAN 
              made by Srivardhan, Chandrashekar, Chaturved, Junaid, Yeshwanth Sai.
            </p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Useful Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </Col>
          <Col md={4} className="text-center text-md-right">
            <h5>Contact Us</h5>
            <p>Email: reddysrivardhan13@gmail.com</p>
            <p>Phone: +91 7989681048</p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 PixrGAN. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
