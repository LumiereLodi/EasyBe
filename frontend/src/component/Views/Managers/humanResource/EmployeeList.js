import React from 'react';
import Grid from "@material-ui/core/Grid";
import ListLayout from "../../../Layout/ListLayout"
import Details from "../../../Layout/Details"

function EmployeeList(props) {
    return (
        <div>
            <Grid container>
                <ListLayout text={"Employee List"}/>
                <Details text={"Employee Details"}/>
            </Grid>
        </div>
    );
}

export default EmployeeList;