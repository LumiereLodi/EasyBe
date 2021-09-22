import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles(theme => ({
    customerInfoContainer: {
        //backgroundColor: theme.palette.primary.main,
        backgroundColor: "#FFF8DD",
        borderRadius: "0.3em",


    },
    customerProjectContainer: {
        backgroundColor: "#FFF8DD",
        borderRadius: "0.3em",
        height: "25em",
        overflow: "auto"
    }


}))
function ObjectInformation(props) {

    const classes = useStyles()

    return (
        <div>
            <Grid container justifyContent={"center"} className={classes.customerInfoContainer}>
                <Grid item container  direction={"column"}>
                    <Grid item container>
                        <Grid item xs style={{marginTop: "1em",marginLeft: "2em"}}>
                            <Typography variant={"h1"}>
                                {props.title ? props.title : undefined}
                            </Typography>
                        </Grid>
                        <Grid item xs style={{marginTop: "1em", marginRight: "2em"}}>
                            <Grid container justifyContent={"flex-end"} >
                                {props.editButton ? props.editButton : undefined}
                            </Grid>


                        </Grid>
                    </Grid>
                    <Grid item container style={{marginTop: "1em"}}>
                        <Grid item>
                            <Grid container direction={"column"}>

                                {props.InformationHeader ? props.InformationHeader.map((value, index) => (
                                    <Grid item style={{marginLeft: "4em", marginBottom: "1em"}} key={index}>
                                        <Typography>
                                            {value}:
                                        </Typography>
                                    </Grid>
                                )) : undefined}

                            </Grid>
                        </Grid>


                        <Grid item style={{marginLeft: "4em"}}>

                            <Grid container direction={"column"}>
                                {props.InformationData ? props.InformationData.map((value, index) => (
                                    <Grid item style={{marginLeft: "4em", marginBottom: "1em"}} key={index}>
                                        <Typography>
                                            {value}
                                        </Typography>
                                    </Grid>
                                )) : undefined}

                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    );
}

export default ObjectInformation;
