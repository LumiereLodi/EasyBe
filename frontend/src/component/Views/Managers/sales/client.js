import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "../../../AppBar"
import {makeStyles,useTheme} from "@material-ui/styles";
import {useAppState} from "../../../WithStore";
import CustomerList from "./CustomerList";
import AddClient from "./AddClient";
import Fab from '@material-ui/core/Fab';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden  from '@material-ui/core/Hidden';
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
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(1),
    }

}))

function Client(props) {

    const classes = useStyles();
    const appState = useAppState()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("xs"));

    const handleFabClick= ()=>{
        appState.setShowListLayout(true)
    }
    const addButton=(
        <div style={{marginLeft: "auto"}}>
            <IconButton component={Link} to={"/drawer/client/addclient" }>
                <AddIcon className={classes.tab} />
            </IconButton>
        </div>
    )
    return (
        <div>

            <AppBar tab={[]} title={"Customers"} addButton={addButton} link={"/drawer/client/clientlist"}/>
            <Hidden mdDown={appState.showListLayout}>
                {matches ? <Fab color={"primary"} className={classes.fab}  component={Link} to={"/drawer/client/addclient" } onClick={()=> handleFabClick()}>
                    <AddIcon/>
                </Fab> : null}
            </Hidden>
           
            

            <Switch>
                <Redirect exact from={"/drawer/client"} to={"/drawer/client/clientlist"}/>
            </Switch>

            <Switch>

                <Route path={"/drawer/client/clientlist"} component={CustomerList}/>
                <Route path={"/drawer/client/addclient"} component={AddClient}/>


            </Switch>
        </div>
    );
}

export default Client;
