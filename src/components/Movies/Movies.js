import React, {  useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MovieItem from './MovieItem';
import Grid from "@material-ui/core/Grid";
import Header from '../Header/Header';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    input:{marginTop: 25,
        color: "white",    
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));



//this is the component that will display all of the movies
//we will dispatch to get movies and genres on loading of the component
const Movies = (props) => {
    const classes = useStyles();
    useEffect(() => { props.dispatch({ type: 'GET_MOVIES' }) }, []);
    useEffect(() => { props.dispatch({ type: 'GET_GENRES' }) }, []);
    useEffect(() => { props.dispatch({ type: 'GET_GENRE_DATABASE' }) }, []);
    const [filter, setFilter] = useState(false);
    const [filteredMovies, setMovies] = useState([]);

const filterMovies = (event) => {
    setMovies(props.genres.filter(movie => movie.movie_genres.indexOf(event.target.value)!= -1 )
  .map(movie => movie.id));
  setFilter(event.target.value);
  console.log(filteredMovies);
}

    
    return (
        
        <>
            {console.log('movies props', props)}
            {console.log(filteredMovies)}
            {console.log(filter)}
            <div className="App">
                <Header />
                <InputLabel className={classes.input}>Filter By Category</InputLabel>
                <Select value={filter} className={classes.formControl} onChange={filterMovies} >
                    <MenuItem value={false}>All</MenuItem>
                    {props.genreList[0] != undefined && props.genreList.map(genre => <MenuItem key={genre.id} value={genre.name}>{genre.name}</MenuItem>)}
                </Select>
            </div>

        <Grid container spacing={4}>

            {props.movies != undefined && !filter && props.movies.map(movie => <MovieItem key={movie.id} movie={movie} />)}
                {filter && props.movies.filter(movie => filteredMovies.indexOf(movie.id) != -1).map(movie => <MovieItem key={movie.id} movie={movie} />)}
        </Grid>
        </>
    );

}

const map = (state) => ({ movies: state.movies, genreList: state.genreList, genres: state.genres })

export default connect(map)(Movies);