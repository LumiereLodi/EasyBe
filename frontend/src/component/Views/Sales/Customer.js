import React, {Fragment, useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "../../AppBar"
import {makeStyles,useTheme} from "@material-ui/styles";
import {useAppState} from "../../WithStore";
import CustomerList from "./CustomerList";
import AddCustomer from "./AddCustomer";
import Fab from '@material-ui/core/Fab';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden  from '@material-ui/core/Hidden';
import Dialog from "@material-ui/core/Dialog";
import AddProject from "./AddProject";
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
    },
    dialogContainer:{
        "& .MuiDialog-paper": {
            width: "70em",
            backgroundColor: theme.palette.secondary.main,
            padding: "1em",
            height: "35em",
            marginLeft: "1em",
            marginRight: "0.3em",
            // border: "2px solid",
            // borderColor: "rgba(35,37,38,0.25)",
            [theme.breakpoints.down("sm")]: {
                marginTop: "2em",
                marginLeft: 0
            },
            [theme.breakpoints.down("xs")]: {
                marginTop: "0.5em",
                marginLeft: 0,
                marginBottom: "1em"
            },
            overflow: "auto",
            paddingLeft: "1em",
            paddingRight: "1em",
            borderRadius: "0.5em",
        },

    }

}))

function Customer(props) {

    const classes = useStyles();
    const appState = useAppState()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("xs"));
    const [openDialog, setOpenDialog] = useState(false)

    const handleFabClick= ()=>{
        appState.setShowListLayout(true)
    }
    const addButton=(
        <div style={{marginLeft: "auto"}}>

            <IconButton onClick={()=> {
                setOpenDialog(true);
                appState.setEditSelectedCustomer({});
            }}>
                <AddIcon className={classes.tab}/>
            </IconButton>
        </div>


    )
    const dialogAddProject = (
        <Fragment>
            <Dialog
                open={openDialog}
                onClose={()=> setOpenDialog(false)}
                className={classes.dialogContainer}
                fullWidth={true}
                maxWidth={"sm"}
            >
                <AddCustomer reloadDrawer={props.reloadDrawer} setReloadDrawer={props.setReloadDrawer} setOpenDialog={setOpenDialog}/>

            </Dialog>
        </Fragment>
    )
    return (
        <div>

            <AppBar tab={[]} title={"Customers"} addButton={addButton} link={"/drawer/client/clientlist"}/>
            <Hidden mdDown={appState.showListLayout}>
                {matches ? <Fab color={"primary"} className={classes.fab}  component={Link} to={"/drawer/client/addclient" } onClick={()=> handleFabClick()}>
                    <AddIcon/>
                </Fab> : null}
            </Hidden>
            {dialogAddProject}
            

            <Switch>
                <Redirect exact from={"/drawer/client"} to={"/drawer/client/clientlist"}/>
            </Switch>

            <Switch>
                {/**render={() => <Admin setSelectedMenuItem={setSelectedMenuItem}/>}***/}
                <Route path={"/drawer/client/clientlist"} render={() => <CustomerList setOpenDialog={setOpenDialog} reloadDrawer={props.reloadDrawer} setReloadDrawer={props.setReloadDrawer}/>}/>
                <Route path={"/drawer/client/addclient"} component={AddCustomer}/>


            </Switch>
        </div>
    );
}

export default Customer;
