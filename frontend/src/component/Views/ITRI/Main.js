import React, {useEffect, useState} from 'react';
import AppBar from "../../AppBar";
import {Redirect, Route, Switch} from "react-router-dom";
import ProjectList from "./ProjectList";
import {useAppState} from "../../WithStore";

function Main(props) {

    const appState = useAppState()
    const [reload, setReload] = useState(false)
    useEffect(() => {

    }, [reload])
    return (
        <div>

            <AppBar tab={[]} title={appState.userInfo.position === "Manager" ?  "Projects" : "Tasks"} addButton={null} link={null}/>
            <Switch>
                <Redirect exact from={"/drawer/researchProject"} to={"/drawer/researchProject/projectlist"}/>
            </Switch>

            <Switch>
                <Route path={"/drawer/researchProject/projectlist"} render={()=> <ProjectList reload={reload} setReload={setReload} reloadDrawer={props.reloadDrawer} setReloadDrawer={props.setReloadDrawer}/>}/>
            </Switch>
        </div>
    );
}

export default Main;