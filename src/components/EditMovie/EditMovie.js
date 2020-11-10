import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import { useParams, withRouter } from 'react-router';
import EditMovieView from './EditMovieView';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import './EditMovie.css'
import Container from '@material-ui/core/Container';


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



const EditMovie = (props) => {
    const classes = useStyles();
    const home = () => {
        props.history.push(`/details/${id}`)
    }

    useEffect(() => { props.dispatch({ type: 'GET_MOVIES' }) }, []);
    useEffect(() => { props.dispatch({ type: 'GET_GENRES' }) }, []);
    useEffect(() => { props.dispatch({ type: 'GET_GENRE_DATABASE' }) }, []);


    const { id } = useParams();
    console.log('details id is', id);
    console.log('details props are', props);
    const movie = props.movies.filter(m => m.id === Number(id));
    console.log('details movie is', movie);



    return (


        <>
        <Container>
            <header className="App" >
    {movie[0] != undefined ? (<h1>Edit {movie[0].title}</h1>): <h1>Edit</h1>}
                <span className="home-button">
                    <Button className={classes.root} onClick={home}>
                        <ArrowBackIcon />Back to Details
                    </Button>
                </span>
            </header>
       
                {movie[0] != undefined && movie.map(movie => <EditMovieView movie={movie} key={movie.id} />)}
            </Container>
        </>
    );

}

const map = (state) => ({ movies: state.movies })

export default connect(map)(withRouter(EditMovie));