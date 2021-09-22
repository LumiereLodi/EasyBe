import React,{Fragment} from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({

    customerInfoContainer: {
        //backgroundColor: theme.palette.primary.main,
        backgroundColor: "#FFF8DD",
        borderRadius: "0.3em",
        height: "27em",

    },
    customerProjectContainer: {
        backgroundColor: "#FFF8DD",
        borderRadius: "0.3em",
        height: "25em",
        overflow: "auto"
    }


}))

function UserOverview(props) {

    const classes = useStyles()
    return (
        <div>
            <Grid item container>
                <Typography variant={"h1"} style={{fontWeight: "bold" , marginTop: "2em"}} >
                    {props.title}
                </Typography>
            </Grid>
            <Grid container className={classes.customerProjectContainer} style={{marginTop: "2em", marginBottom: "1em"}}>
                <Grid container  sm={12} direction={"column"}>
                    <ListSubheader disableGutters>
                        <Grid item container style={{marginTop: "1.5em", marginBottom: "1em"}}>

                            {props.OverviewHeaders ? props.OverviewHeaders.map((headers, index) => (
                                <Grid item container xs justify={"center"} >
                                    <Typography style={{fontWeight: "bold", color: "black"}} key={index}>
                                        {headers}
                                    </Typography>

                                </Grid>
                            )) : undefined}


                        </Grid>
                    </ListSubheader>

                    <Grid item container style={{marginBottom: "0.3em"}}>

                        {props.OverviewData ? props.OverviewData.map((data, index) => (
                            <Grid item container xs justify={"center"} alignItems={"center"}>
                                <Typography >
                                    {data}
                                </Typography>

                            </Grid>
                        )) : undefined}

                    </Grid>

                </Grid>
            </Grid>
        </div>
    );
}

export default UserOverview;
