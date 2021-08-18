import React from 'react';
import ListLayout from "../../../Layout/ListLayout";
import Details from "../../../Layout/Details";
import Grid from "@material-ui/core/Grid";

function ClientList(props) {
    return (
        <div>
            <Grid container>
                <ListLayout text={"Client List"}/>

                <Details details/>
            </Grid>
        </div>
    );
}

export default ClientList;
