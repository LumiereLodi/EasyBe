import React,{Fragment} from 'react';
import ProjectFile from "../ProjectFile";
import ProjectList from "../ProjectList";
import Grid from "@material-ui/core/Grid";
import ListLayout from "../../Layout/ListLayout";
import Details from "../../Layout/Details";


function Project(props) {

    //we will also pass the list here.

    const list = (
        <ProjectList search={"Search"} filter={"Filter"}/>
    )

    const detail =(
        <Fragment>
            <ProjectFile/>
        </Fragment>
    )
    return (

    <div>
        <Grid container>
            <ListLayout list={list}/>

            <Details details={detail} />
        </Grid>
    </div>
    );
}

export default Project;