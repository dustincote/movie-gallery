import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';



const useStyles = makeStyles({
    root: {
        maxHeight: 540,
        maxWidth: 350,
        marginLeft: 25,
        marginTop: 25,
        marginRight: 25,

    },
    media: {
        height: 450,
    },
});



//this is the individual cards that we render for each movie.
const MovieItem = (props) => {


    const details = () => {
        props.history.push(`/details/${props.movie.id}`)
    }

    const classes = useStyles();
    //console.log(props)

    return (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
        <Card className={classes.root}>
            <CardActionArea onClick={details} >
                <CardMedia
                    className={classes.media}
                    image={props.movie.poster}
                    title={props.movie.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                            {props.movie.title}
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">

          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>

            </CardActions>
        </Card>
        </Grid>
    );

}


export default connect()(withRouter(MovieItem));