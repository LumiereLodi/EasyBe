import React from 'react';
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Hidden from "@material-ui/core/Hidden";
import {useObserver} from "mobx-react"
import {useAppState} from "../WithStore"


const useStyles = makeStyles(theme => ({
    layout: {
        height: "38.3em",
        marginLeft: "1em",
        marginRight: "0.3em",
        backgroundColor: theme.palette.secondary.main,
        // border: "2px solid",
        // borderColor: "rgba(35,37,38,0.25)",
        [theme.breakpoints.down("sm")]: {
            marginTop: "2em",
            marginLeft: 0
        },
        [theme.breakpoints.down("xs")]: {
            marginTop: "0.5em",
            marginLeft: 0,
            marginBottom: "1em"
        },
        overflow: "auto",
        paddingLeft: "1em",
        paddingRight: "1em",
        borderRadius: "0.5em",
    },


}))

function Details(props) {
    const classes = useStyles();
    const appState = useAppState()
    return (

        <Hidden smDown={!appState.showListLayout}>
            <Grid item

            className={classes.layout}
            md
            xs={12}
            direction={"column"}

            >
            {props.details}
            <Grid container className="grid-container">


            </Grid>
            </Grid>
        </Hidden>
        
    );
}

export default Details;