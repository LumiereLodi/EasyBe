import React from 'react';
import AppBar from "../../../AppBar";
import Hidden from "@material-ui/core/Hidden";
import Fab from "@material-ui/core/Fab";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import ProjectList from "../research/ProjectList";
import AddProject from "../sales/AddProject";

function Research(props) {
    return (
        <div>

            <AppBar tab={[]} title={"Projects"} addButton={null} link={null}/>
            <Switch>
                <Redirect exact from={"/drawer/researchProject"} to={"/drawer/researchProject/projectlist"}/>
            </Switch>

            <Switch>
                <Route path={"/drawer/researchProject/projectlist"} component={ProjectList}/>
            </Switch>
        </div>
    );
}

export default Research;