import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "../../../AppBar"
import {makeStyles} from "@material-ui/styles";
import {useAppState} from "../../../WithStore";
import ListLayout from "../../../Layout/ListLayout";
import Details from "../../../Layout/Details";
import Grid from "@material-ui/core/Grid";
import RegisterEmployee from "../humanResource/RegisterEmployee";
import DepartmentList from "../humanResource/DepartmentList";
import EmployeeList from "../humanResource/EmployeeList";
import AddDepartment from "../humanResource/AddDepartment";
import ClientList from "./ClientList";
import AddClient from "./AddClient";

const useStyles = makeStyles(theme =>({

    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "Transparent"
        }
    },
    tab:{
        ...theme.typography.tab,
        opacity: 1
    }

}))

function Client(props) {

    const classes = useStyles();
    const appState = useAppState()


    const addButton=(
        <div style={{marginLeft: "auto"}}>
            <IconButton component={Link} to={"/drawer/client/addclient" }>
                <AddIcon className={classes.tab} />
            </IconButton>
        </div>
    )
    return (
        <div>

            <AppBar tab={[]} title={"Clients"} addButton={addButton} link={"/drawer/client/clientlist"}/>
            <Switch>
                <Redirect exact from={"/drawer/client"} to={"/drawer/client/clientlist"}/>
            </Switch>

            <Switch>

                <Route path={"/drawer/client/clientlist"} component={ClientList}/>
                <Route path={"/drawer/client/addclient"} component={AddClient}/>


            </Switch>
        </div>
    );
}

export default Client;
