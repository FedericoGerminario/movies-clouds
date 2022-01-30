import React from "react";
import { Button } from "react-bootstrap";
import {Link} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from './firebase';
import { Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import popcorn from "./popcornresize.png";
import { Row, Col } from "react-bootstrap";

export const Header = (user) => {
    const signOutFirebase = () => {
        signOut(auth);
    }

    return(
        <header>
            <div className="container">
                <Row clasName="inner-content" >
                    <Col className="brand">
                        <Link to="/"><img src={popcorn} width="64" height="64" alt="..."/></Link>
                    </Col>
                    <Col md="auto">
                        
                    <Row className="nav-links">
                        <Col md="auto" style={{ paddingTop: 15, paddingRight: 0 }}>
                            <Link to="/">
                            {auth.currentUser.displayName}                                
                            </Link>
                        </Col>
                        <Col style={{ paddingTop: 15}}>
                            <Link to="/wishlist">
                                <FontAwesomeIcon icon={faHeart}/>
                            </Link>
                        </Col>
                        <Col style={{ paddingTop: 15}}>
                            <Button onClick={signOutFirebase}>
                            Logout
                            </Button>
                        </Col>
                    </Row>
                    </Col>
                </Row>
            </div>
        </header>
    );
};