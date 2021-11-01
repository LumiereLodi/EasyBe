import React, {Fragment, useEffect, useState} from 'react';
import AppBar from "../../AppBar";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {useAppState} from "../../WithStore";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import {makeStyles,useTheme} from "@material-ui/styles";
import ProjectList from "./ProjectList";
import AddProject from "./AddProject";
import axios from "axios";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden  from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';


const useStyles = makeStyles(theme => ({

    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "Transparent"
        }
    },
    tab: {
        ...theme.typography.tab,
        opacity: 1
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(1),
        zIndex: 1320
    },
    dialogContainer:{
        "& .MuiDialog-paper": {
            width: "70em",
            backgroundColor: theme.palette.secondary.main,
            padding: "1em",
            height: "38.3em",
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

function Project(props) {
    const classes = useStyles();
    const appState = useAppState()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("xs"));
    const [openDialog, setOpenDialog] = useState(false)
    const [reload, setReload] = useState(false)

    const handleFabClick= ()=>{
        appState.setShowListLayout(true)
    }
    useEffect(() => {
        async function fetchData() {
            try {
                // const response = await axios.get("/Sales/customerlist", {
                //     withCredentials: true
                // })
                // console.log(response.data)
                // appState.setCustomerList(response.data)
                //
                // const staff = await axios.get(`/employee/employeelist/${appState.userInfo.departmentid}`)
                // console.log(staff.data)
                // appState.setStaffList(staff.data)

            } catch (error) {
                alert(error)
            }
        }
        fetchData()

    }, [reload])


    const addButton = (
        <div style={{marginLeft: "auto"}}>
            <IconButton onClick={()=> {
                setOpenDialog(true);
                setReload(!reload)
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
                <AddProject reloadDrawer={props.reloadDrawer} setReloadDrawer={props.setReloadDrawer}/>

            </Dialog>
        </Fragment>
    )
    return (
        <div>

            <AppBar tab={[]} title={appState.userInfo.position === "Manager" ?  "Projects" : "Tasks"} addButton={appState.userInfo.position === "Manager" ? addButton : undefined} link={"/drawer/project/projectlist"}/>
            <Hidden mdDown={appState.showListLayout}>
                {matches ? <Fab color={"primary"} className={classes.fab}  component={Link} to={"/drawer/project/addproject" } onClick={()=> handleFabClick()}>
                    <AddIcon/>
                </Fab> : null}
            </Hidden>
            {dialogAddProject}
            <Switch>
                <Redirect exact from={"/drawer/project"} to={"/drawer/project/projectlist"}/>
            </Switch>

            <Switch>
                <Route path={"/drawer/project/projectlist"} render={()=> <ProjectList setOpenDialog={setOpenDialog}  setReload={setReload} reload={reload} reloadDrawer={props.reloadDrawer} setReloadDrawer={props.setReloadDrawer}/>}/>
                <Route path={"/drawer/project/addproject"} render={()=> <AddProject reloadDrawer={props.reloadDrawer} setReloadDrawer={props.setReloadDrawer}/>}/>
            </Switch>
        </div>
    );
}

export default Project;