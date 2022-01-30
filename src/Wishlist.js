import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { getDocs, deleteDoc, collection, doc} from "firebase/firestore";
import { useState, useEffect} from "react";
import { getFirestore } from "firebase/firestore";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import { Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import { auth } from "./firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.css'


export const Wishlist = () => {

    const [isEmpty, setIsEmpty] = useState(true);
    const [updating, setUpdating] = useState(true);
    const dbStore = getFirestore();
    const [wishlistMovies, setWishlistMovies] = useState([]);
    const { SearchBar } = Search; 


    const deleteMovieFromWishlist = (row) =>{
        console.log(auth.currentUser.email + " " + row.id)
        deleteDoc(doc(dbStore, "users", auth.currentUser.email + " " + row.id));
        setUpdating(true);
    }

    const deleteWish = (cell, row) =>(
        <Button onClick ={() =>{
            deleteMovieFromWishlist(row);
        }}><FontAwesomeIcon icon={faHeartBroken} /></Button>
    )

    const columns = [{
        dataField: 'title',
        text: 'Title',
        sort: true
    },
    {    
        dataField: 'genre',
        text: 'Genre',
        sort: true
    },
    {
        dataField: 'year',
        text: 'Year',
        sort: true
    },
    {
        dataField: 'deleteWish',
        text: 'Remove from Wishlist',
        formatter: deleteWish,
    }
    ];


    useEffect(() => {
        let wishListMovies = [];
        getDocs(collection(dbStore, "users")).then((querySnapshot) =>{
            querySnapshot.forEach((doc) => {
                if(doc.id.includes(auth.currentUser.email)){
                wishListMovies.push(doc.data());}
        }
        )}).then(() => {
            if(wishListMovies.length > 0){
                
                setWishlistMovies(wishListMovies)
                setIsEmpty(false);
                setUpdating(false);
            }
            else{
                setIsEmpty(true);
                setUpdating(false);
            }
    
        })

       
    }, [updating]);


    if(isEmpty){
        return(
            <Container>
                <div style={{paddingTop:100}}>
                    <Row className="justify-content-md-center">
                        <Col md="auto" style={{paddingTop:50}}><h1>You did not add any movie to wishlist!</h1></Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="auto"><Link to="/"><Button>Movies list</Button></Link></Col>
                    </Row>
                </div>
            </Container>
        );
    }
    else{
        return(
            <Container>
            <Row>
            <ToolkitProvider
            keyField="id"
            data={ wishlistMovies }
            columns={ columns }
            search = {
                {
                srText: ""}
            }
            > 
            {
                props =>(
                <Col>
            <Row style={{paddingTop: 10, paddingBottom:10}}><SearchBar { ...props.searchProps }/></Row>
            <Row><BootstrapTable { ...props.baseProps }/></Row>
            </Col>
                )
            }
            </ToolkitProvider>
            </Row>
            </Container>
        )
    }
};