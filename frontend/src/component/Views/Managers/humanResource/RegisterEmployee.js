import React from 'react';
import Layout from "../../../Layout";
import ListLayout from "../../../Layout/ListLayout";
import Grid from "@material-ui/core/Grid";

function RegisterEmployee(props) {
    return (
        <div><Grid container>
            <ListLayout text={"Employee List"}/>

            ADD EMPLOYEE
        </Grid></div>
    );
}

export default RegisterEmployee;