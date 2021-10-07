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

    const handleFabClick= ()=>{
        appState.setShowListLayout(true)
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/Sales/customerlist", {
                    withCredentials: true
                })
                console.log(response.data)
                appState.setCustomerList(response.data)

                const staff = await axios.get(`/employee/employeelist/${appState.userInfo.departmentid}`)
                console.log(staff.data)
                appState.setStaffList(staff.data)

                const projectlistAll = await axios.get(`/project/projectlist`);
                console.log(projectlistAll)
                appState.setProjectListAll(projectlistAll.data)

                const defaultproject = await axios.get(`/project/defaultproject`);
                console.log(defaultproject.data.project)
                appState.setSelectedProject(defaultproject.data.project[0])

                const startDate = new Date(defaultproject.data.project[0].startdate)
                const startDateFormat = startDate.getDate() + "/" + startDate.getMonth() + "/" + startDate.getFullYear();
                appState.setStartDate(startDateFormat)

                const endDate = new Date(defaultproject.data.project[0].enddate)
                const endDateFormat = endDate.getDate() + "/" + endDate.getMonth() + "/" + endDate.getFullYear();
                appState.setEndDate(endDateFormat)

                console.log()
                appState.setCompletedTask(defaultproject.data.completedTask[0].taskcompleted)
                appState.setActiveTask(defaultproject.data.activeTask[0].taskactive)


                const activities = await axios.get(`/sales/tasks/${appState.selectedProject.projectid}/${appState.userInfo.departmentid}`)
                appState.setTaskList(activities.data)
                console.log(activities.data)
            } catch (error) {
                alert(error)
            }
        }

        fetchData()
    }, [])


    const addButton = (
        <div style={{marginLeft: "auto"}}>
            {/*<IconButton component={Link} to={"/drawer/project/addproject"}>*/}
            {/*    <AddIcon className={classes.tab}/>*/}
            {/*</IconButton>*/}
            <IconButton onClick={()=> setOpenDialog(true)}>
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
                <AddProject/>

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

                <Route path={"/drawer/project/projectlist"} render={()=> <ProjectList setOpenDialog={setOpenDialog} />}/>
                <Route path={"/drawer/project/addproject"} component={AddProject}/>


            </Switch>
        </div>
    );
}

export default Project;