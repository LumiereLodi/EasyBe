import React from 'react';
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    layout:{
        height: "38.3em",
        marginLeft: "1em",
        marginRight: "0.3em",
        backgroundColor: "white",
        border: "2px solid",
        borderColor: "rgba(35,37,38,0.25)",
        [theme.breakpoints.down("sm")]: {
            marginTop: "2em",
            marginLeft:0
        },
        overflow: "auto",
        paddingLeft: "1em",
        paddingRight: "1em"
    },


}))

function Details(props) {
    const classes = useStyles();
    return (

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
    );
}

export default Details;