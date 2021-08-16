import React from 'react';
// import Layout from "../../../Layout"
import ListLayout from "../../../Layout/ListLayout"
import Details from "../../../Layout/Details"
import Grid from "@material-ui/core/Grid";


function DepartmentList(props) {
    return (
        <div>

            <Grid container>
                <ListLayout text={"Department List"}/>
                <Details text={"Department Details"}/>
            </Grid>
        </div>
    );
}

export default DepartmentList;