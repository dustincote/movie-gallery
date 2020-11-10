import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Input from '@material-ui/core/Input';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Select from '@material-ui/core/Select';
import ListItem from '@material-ui/core/ListItem';





const useStyles = makeStyles({
    root: {
        alignItems: "center",
        maxWidth: 500,
    },
    media: {
        maxWidth: 300,
    },
    content: {
    },
});





// in this component we will be editing the title, description, and genres of the movie  with id that 
//is passed in from the EditMovie component.
const EditMovieView = (props) => {
    const classes = useStyles();

    const [movieUpdate, setMovie] = useState({ title: props.movie.title, description: props.movie.description })

    //filter the genre reducer state to make genres include only the movie id we are editing
    const genres = props.genre.filter(movie => props.movie.id === movie.id)
    console.log('genres array in edit movie view', genres)


    const changeHandler = (event) => {
        setMovie({
            ...movieUpdate,
            [event.target.name]: event.target.value
        });
        console.log(movieUpdate);
    }

    const submitEdit = () => {
        props.dispatch({ type: 'UPDATE_MOVIE', payload: { id: props.movie.id, title: movieUpdate.title, description: movieUpdate.description } });
        props.history.push(`/details/${props.movie.id}`)
    }

    const backToDetails = () => {
        props.history.push(`/details/${props.movie.id}`)
    }


    const addGenre = (event) => {
        console.log(event.target.value, "was clicked");
        props.dispatch({ type: 'ADD_GENRE_TO_MOVIE', payload: { movie_id: props.movie.id, genre_id: Number(event.target.value) } });
    }

    const removeGenre = (event) => {
       // console.log(event.currentTarget)//used for testing
        props.dispatch({
            type: 'REMOVE_GENRE_FROM_MOVIE',
            payload: {
                movie_id: props.movie.id,
                genre_id: Number(event.currentTarget.value)
            }
        });
    }

    return (
        <>

            <Card >
              
                    <CardMedia
                        component="img"
                        className={classes.media}
                        alt="Contemplative Reptile"
                        image={props.movie.poster}
                        title="Contemplative Reptile"
                    />
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5" component="h2">
                        Edit Title: <Input onChange={changeHandler} name="title" value={movieUpdate.title} /><br />
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                            Edit Description:
                        </Typography>
                    <TextareaAutosize onChange={changeHandler} name="description" rowsMax={8} cols={50} defaultValue={movieUpdate.description} />
                        <Typography gutterBottom variant="h5" component="h2">
                            Add Genre:
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {/* dropdown menu of genres not associated with the movie, to choose from */}
                            {genres[0] != undefined ? (
                                // genres[0] is defined so that means we have genres associated with the movie
                                //and need to filter out those genres from our drop down menu so we do
                                //not add them to the movie again
                                <select onChange={addGenre} >
                                    <option value="">Add a Genre</option>
                                    {/* we will make sure that we do not render until we have the array of associated
                            genres for the current movie.  then we will filter the list of all
                            possible genres to only include the options that are not included
                            in the array of genres associated with this movie. then map over the 
                            resulting array and place an option in the select list
                             */}
                                    {genres[0].movie_genres != undefined && props.genreList.filter(genre => genres[0].movie_genres.indexOf(genre.name) == -1)
                                        .map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                                </select>)

                                : (
                                    //  genres[0] is undefined so we need to include all genres as options
                                    //in the select so now it is just a simple
                                    //map over the genreList
                                    <select onChange={addGenre} >
                                        <option value="">Add Genre</option>
                                        {props.genreList.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                                    </select>)}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                            Remove Genres:
                        </Typography>

                    </CardContent>
                    <Typography variant="body2" color="textSecondary" component="ul">
                       
                            {genres[0] != undefined &&
                                props.genreList.filter(genre => genres[0].movie_genres.indexOf(genre.name) != -1)
                                    .map(genre =>
                                        <ListItem key={genre.id}>{genre.name}
                                            <Button key={genre.id} value={genre.id} onClick={removeGenre}>Remove Genre</Button>
                                        </ListItem>)}
                       
                    </Typography> 
                
                <CardActions>
                    <Button onClick={submitEdit}>Save</Button>
                    <Button onClick={backToDetails}>Cancel</Button>
                </CardActions>
            </Card>
        </>
    );

}

const map = (state) => ({ genre: state.genres, genreList: state.genreList })
export default connect(map)(withRouter(EditMovieView));