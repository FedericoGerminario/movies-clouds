import React from "react";
import { signInWithFirebase } from "./firebase"
import { Button } from 'react-bootstrap';
import popcorn from "./popcornresize.png"
import { Row, Col, Container } from "react-bootstrap";

export const LoginApp = () => {

    return(
      <Container style={{paddingTop: 50}}>
          <Row className="justify-content-md-center">
          <Col md="auto" p="10"><h1>Movies Room</h1></Col>
          </Row>
          <Row className="justify-content-md-center">
          <Col md="auto"><img src={popcorn} width="400" alt="Popcorn movies"/></Col>
          </Row>
          <Row className="justify-content-md-center">
          <Col md="auto"><Button onClick={signInWithFirebase}>Sign in with Google</Button></Col>
          </Row>
      </Container>
    );  
};