import React,{Fragment} from 'react';
import ListLayout from "../../../Layout/ListLayout";
import Details from "../../../Layout/Details";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme=>({

}))

function RegisterEmployee(props) {
    const classes = useStyles()

    const details = (
        <Fragment>
            <h1>Inside Add Employee</h1>
            <h1>old line</h1>
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
        </Fragment>

    )
    return (
        <div><Grid container>
            <ListLayout text={"Employee List"}/>

            <Details details={details}/>
        </Grid></div>
    );
}

export default RegisterEmployee;