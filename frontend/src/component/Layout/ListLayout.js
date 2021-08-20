import React from 'react';
import List from "@material-ui/core/List";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    layout1: {
        height: "38.3em",
        backgroundColor: theme.palette.secondary.main,
        overflow: "auto",
        // border: "2px solid",
        // borderColor: "rgba(35,37,38,0.25)"
        borderRadius: "0.5em",


    }

}))

function ListLayout(props) {
    const classes = useStyles();
    return (
        <Grid item
              className={classes.layout1}
              md={3}
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
        </Grid>
    );
}

export default ListLayout;