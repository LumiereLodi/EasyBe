import React from 'react';
import List from "@material-ui/core/List";
import  Paper  from '@material-ui/core/Paper';
import {Grid} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import {useObserver} from "mobx-react"
import {useAppState} from "../WithStore"

import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    layout1: {
        height: "38.3em",
        backgroundColor: theme.palette.secondary.main,
        overflow: "auto",
        // border: "2px solid",
        // borderColor: "rgba(35,37,38,0.25)"
        borderRadius: "0.5em",
        
        [theme.breakpoints.down("xs")]: {
            marginTop: "0.1em",
            marginLeft: 0,
            marginBottom: "0.2em"
        },

    },
    toolbar: theme.mixins.toolbar,
    
    searchBar: {
        position: "fixed",
        marginBottom: "10em", 
        width: "26.6em",
        
    }
}))


function ListLayout(props) {
    const classes = useStyles();
    const appState = useAppState()

    return  (

        <Hidden smDown={appState.showListLayout}>
            
            <Grid item
                className={classes.layout1}
                md={3}
                xs={12}

                >                        
                    {props.list}
        
            </Grid>
        </Hidden>
        
    );
}

export default ListLayout;