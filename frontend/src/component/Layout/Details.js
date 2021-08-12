import React from 'react';
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({

    layout2:{
        height: "38.5em",
        marginLeft: "1em",
        marginRight: "0.3em",
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.down("sm")]: {
            marginTop: "2em",
            marginLeft:0
        },
        overflow: "auto"
    }

}))

function Details(props) {
    const classes = useStyles();
    return (

            <Grid item
                  className={classes.layout2}
                  md
                  xs={12}

            >
                <h1>{props.text}</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>scroll down again</h1>
                <h1>app bar is gone</h1>
                <Grid container className="grid-container">


                </Grid>
            </Grid>
    );
}

export default Details;