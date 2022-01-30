import React, { useEffect, useState} from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { getDatabase, ref, onValue } from "firebase/database";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import { Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.css'
import {doc, setDoc, getFirestore, getDocs, collection } from "firebase/firestore";
import { auth } from "./firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-solid-svg-icons";


export const Home = (user) => {
    const { SearchBar } = Search;
    const db = getDatabase();
    const dbStore = getFirestore();
    const movies_db = ref(db, '/movies-list/');
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newMoviesWish, setNewMoviesWish] = useState(true);
    const [moviesNotWish, setMoviesNotWish] = useState([]);

    useEffect(() => {
        let newMovies = [];
        onValue(movies_db, (snapshot) =>{
            snapshot.forEach((el)=>{
                newMovies.push(el.val());
            })
            setIsLoading(true);
            setMovies(newMovies);
        })
        

    }, []);

    useEffect(()=>{
        let wishListMovies = [];
        if (movies.length > 0){
        getDocs(collection(dbStore, "users")).then((querySnapshot) =>{
            querySnapshot.forEach((doc) => {
                
            if(doc.id.includes(auth.currentUser.email)){
                wishListMovies.push(doc.data());
            }
        }
            )
        
        const notWishListMovies = movies.filter((movie) => 
            !wishListMovies.some(item => movie.id === item.id))
        setMoviesNotWish(notWishListMovies);
        setNewMoviesWish(false);
        setIsLoading(false);
        })
    }
    }, [movies, newMoviesWish]);
    

    const addMovieToWishList = (row) =>{
        
        setDoc(doc(dbStore, "users", auth.currentUser.email + " " + row.id), row);
        setNewMoviesWish(true);
    };

    

    const addWish = (cell, row) =>(
        <Button onClick ={ () =>{
            addMovieToWishList(row);
        }}><FontAwesomeIcon icon={faHeart} /></Button>
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
        dataField: 'addWish',
        text: 'Add to Wishlist',
        formatter: addWish,
    }
    ];

    if(isLoading){
        return(
            <Container>
                <div style={{paddingTop: 100}}>
                    <Row className="justify-content-md-center">
                    <Col md="auto"><h1>Loading the movies...</h1></Col>
                    </Row>
                </div>
            </Container>
        )
    }
    else{
        return(
            <Container>
            <Row>
            <ToolkitProvider
            keyField="id"
            data={ moviesNotWish }
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
            <Row ><BootstrapTable { ...props.baseProps }/></Row>
            </Col>
                )
            }
            </ToolkitProvider>
            </Row>
            </Container>
        );
    }
};