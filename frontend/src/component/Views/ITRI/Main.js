import React from 'react';
import AppBar from "../../AppBar";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import ProjectList from "./ProjectList";
import {useAppState} from "../../WithStore";

function Main(props) {

    const appState = useAppState()

    return (
        <div>

            <AppBar tab={[]} title={appState.userInfo.position === "Manager" ?  "Projects" : "Tasks"} addButton={null} link={null}/>
            <Switch>
                <Redirect exact from={"/drawer/researchProject"} to={"/drawer/researchProject/projectlist"}/>
            </Switch>

            <Switch>
                <Route path={"/drawer/researchProject/projectlist"} component={ProjectList}/>
            </Switch>
        </div>
    );
}

export default Main;