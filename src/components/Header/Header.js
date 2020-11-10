import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import './Header.css';
import { withRouter } from 'react-router';


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


function Header(props) {
    const classes = useStyles();

    const home = () => {
        props.history.push('/')
    }


    return (
        <header >
            <h1>DC Movie Gallery</h1>
            <span className="home-button">
            <Button  className={classes.root} onClick={home}>
            <HomeOutlinedIcon />
            </Button>
            </span>
        </header>
    );

}


export default connect()(withRouter(Header));