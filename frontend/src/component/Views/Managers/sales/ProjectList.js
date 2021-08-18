import React from 'react';
import Grid from "@material-ui/core/Grid";
import ListLayout from "../../../Layout/ListLayout";
import Details from "../../../Layout/Details";

function ProjectList(props) {
    return (
        <div>
            <Grid container>
                <ListLayout text={"Project List"}/>

                <Details details/>
            </Grid>
        </div>
    );
}

export default ProjectList;