import React from 'react';
import {Grid, Paper,useMediaQuery,List} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


const useStyles = makeStyles(theme => ({
    layout1:{
        height: "38.5em",
        backgroundColor: theme.palette.secondary.main,



    },
    layout2:{
        height: "38.5em",
        marginLeft: "1em",
        marginRight: "0.3em",
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.down("sm")]: {
            marginTop: "2em",
            marginLeft:0
        }
    }

}))


function Index(props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container >
                <Grid  item
                       className={classes.layout1}
                       md={3}
                       xs={12}

                >

                </Grid>

                <Grid  item
                       className={classes.layout2}
                       md
                       xs={12}

                >
                    <Grid container className="grid-container">



                    </Grid>
                </Grid>


            </Grid>
        </div>
    );
}

export default Index;