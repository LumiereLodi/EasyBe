import React from 'react';
import ListLayout from "../../../Layout/ListLayout";
// import Details from "../../../Layout/Details";
import Grid from "@material-ui/core/Grid";

function AddDepartment(props) {
    return (
        <div>
            <Grid container>
                <ListLayout text={"Department List"}/>

                ADD DEPARTMENT
            </Grid>
        </div>
    );
}

export default AddDepartment;