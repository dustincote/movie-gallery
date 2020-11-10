import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Header from '../Header/Header';
import {useParams, withRouter} from 'react-router';
import DetailsView from './DetailsView';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "left",
        color: "white",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


//this component will be given a movie id on the url so we can filter out
//our movie list to only show details for the desired movie...
//we will render the actual details in the DetailsView component
const Details = (props) => {
    const classes = useStyles();
    const home = () => {
        props.history.push('/')
    }

    useEffect(() => { props.dispatch({ type: 'GET_MOVIES' }) }, []);
    useEffect(() => { props.dispatch({ type: 'GET_GENRES' }) }, []);
    //const {id} is the id of the movie pulled off the url so /details/:id 
    const {id} = useParams();

    //console.log('details id is', id);//used in testing
    //console.log('details props are', props);//used in testing
    //filter the movies global state so the new movie array includes only the movie we want.
  const movie =  props.movies.filter(m => m.id === Number(id));
    console.log('details movie is', movie);

    const editMovie = () => {
        props.history.push(`/edit/${id}`);
    }


    
    return (

        
        <>   
            <Container>
            <header className="App" >
                {movie[0] != undefined ? (<h1>{movie[0].title}</h1>) : <h1>Edit</h1>}
                <span className="home-button">
                    <Button className={classes.root} onClick={home}>
                        <ArrowBackIcon />Back
                    </Button>
                    <Button className={classes.root} onClick={editMovie}>Edit</Button>
                </span>
            </header>


           {movie[0] != undefined &&  movie.map(movie => <DetailsView movie={movie} key={movie.id} />)}

            </Container>
        </>
    );

}

const map = (state) => ({ movies: state.movies })

export default connect(map)(withRouter(Details));