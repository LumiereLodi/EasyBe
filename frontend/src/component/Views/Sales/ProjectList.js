import React, {Fragment, useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import ListLayout from "../../Layout/ListLayout";
import Details from "../../Layout/Details";
import {makeStyles} from "@material-ui/styles";
import ProjectFile from "../ProjectFile.js"
import ProjectListComponent from "../List.js";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import {useAppState} from "../../WithStore";
import {useObserver} from "mobx-react"
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles(theme => ({

    searchContainer: {
        paddingLeft: "1em", 
        paddingRight: "1em",
    
        
    },
    form: {
        marginTop: "1em",
        //marginLeft: "1em",
        
        "& .MuiInputLabel-root": {
            color: theme.palette.primary.main,
            
            
        },
        "& .MuiInputBase-root": {
            borderRadius: "0.3em",
            // backgroundColor: "white"
            //height: "2.5em"
            fontSize: "1em",


        },
        "& .MuiInput-formControl": {
            color:"black",
        
        }
        
    },
    ListContainer: {
        width: "90%",
        height: "5em",
        backgroundColor: "#FFF8DD",
        marginLeft: "1em",
        marginRight: "1em",
        marginTop: "0.7em",
        //boxShadow: "0px 0.5px 3px  #888888",
        paddingLeft: "2em",
        borderRadius: "0.3em",
        [theme.breakpoints.down("xs")]: {
            width: "91%",
        }
    },

    fab: {
        position: 'fixed',
        top: theme.spacing(19),
        right: theme.spacing(6),
        zIndex: 1320
    },
    sendButton: {
        ...theme.typography.login,
        backgroundColor: theme.palette.primary.main,
        height: 32,
        width: 250,
        borderRadius: "10px",
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
            color: "black"
        },
        marginTop: "1em",

    },
    sendButtonDisabled: {

            backgroundColor: theme.palette.secondary.light,
            color: "black"

    },
    completedButton: {
        ...theme.typography.login,
        ...theme.completedButton,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
            color: "black"
        }
    },
    completedButtonDisabled: {
        backgroundColor: theme.palette.secondary.light,
        color: "black"
    },

}))

function ProjectList(props) {
    const classes = useStyles()

    const [reload, setReload] = useState(false)
    const appState = useAppState()
    const [openSendDialog, setOpenSendDialog] = useState(false)
    const [openCompleteDialog, setOpenCompleteDialog] = useState(false)

    //here we will pass list of project for manager, list of tasks for staff.

    const handleProjectCLick = async (projectid)=> {
        try{
            const result = await axios.get(`/project/projectlist/${projectid}`)
            appState.setSelectedProject(result.data.project[0])

            const startDate = new Date(result.data.project[0].startdate);
            const startDateFormat = startDate.getDate() + "/" + startDate.getMonth() + "/" + startDate.getFullYear();
            appState.setStartDate(startDateFormat)

            const endDate = new Date(result.data.project[0].enddate)
            const endDateFormat = endDate.getDate() + "/" + endDate.getMonth() + "/" + endDate.getFullYear();
            appState.setEndDate(endDateFormat)

            appState.setCompletedTask(result.data.completedTask[0].taskcompleted)
            appState.setActiveTask(result.data.activeTask[0].taskactive)

            const activities = await axios.get(`/sales/tasks/${appState.selectedProject.projectid}/${appState.userInfo.departmentid}`)
            appState.setTaskList(activities.data)

            const status = await axios.get(`/sales/status/${appState.selectedProject.projectid}`)
            const location = await axios.get(`/sales/location/${appState.selectedProject.projectid}`)

            //enable or disable send button
            if (location.data.location === '1') {
                appState.setEnableSendButton(true)

            } else {
                appState.setEnableSendButton(false)
            }

            //enable or disable complete button

            if (status.data.status === '2') {
                appState.setEnableCompletedButton(true)
            } else {
                appState.setEnableCompletedButton(false)
            }

            //GET PROJECT FILE


            let SMProjectFile = await axios.get( `/project/projectfile/${appState.selectedProject.projectid}/2002`)
            let RIProjectFile = await axios.get( `/project/projectfile/${appState.selectedProject.projectid}/2001`)
            let ITProjectFile = await axios.get( `/project/projectfile/${appState.selectedProject.projectid}/2000`)

            SMProjectFile = SMProjectFile.data[0] ? '\n' + SMProjectFile.data[0].description : '';
            RIProjectFile = RIProjectFile.data[0] ? '\n' + RIProjectFile.data[0].description : '';
            ITProjectFile = ITProjectFile.data[0] ? '\n' + ITProjectFile.data[0].description : '';

            console.log(SMProjectFile)
            console.log(RIProjectFile)
            console.log(ITProjectFile)

            appState.setSMProjectFile(SMProjectFile);
            appState.setRIProjectFile(RIProjectFile);
            appState.setITProjectFile(ITProjectFile);


            props.setReload(!props.reload)


        }catch (error) {
            console.log(error)
        }
    }
    const handleSendButtonClick = async ()=> {
        try{
            await axios.put(`/sales/sendproject/${appState.selectedProject.projectid}`)
            const location = await axios.get(`/sales/location/${appState.selectedProject.projectid}`)

            if (location.data.location === '1') {
                appState.setEnableSendButton(true)
                setReload(!reload)
            } else {
                appState.setEnableSendButton(false)
                setReload(!reload)
            }

            setOpenSendDialog(false)
            setReload(!reload)
        }catch (error) {
            alert(error)
        }

    }

    const handleCompleteClick = async ()=>{
        try{
            await axios.put(`/sales/completeproject/${appState.selectedProject.projectid}`)
            const status = await axios.get(`/sales/status/${appState.selectedProject.projectid}`)

            const location = await axios.get(`/sales/location/${appState.selectedProject.projectid}`)

            if(status.data.status === '2') {
                appState.setEnableCompletedButton(true)
            }
            else{
                appState.setEnableCompletedButton(false)

            }
            if (location.data.location === '1') {
                appState.setEnableSendButton(true)
                setReload(!reload)
            } else {
                appState.setEnableSendButton(false)
                setReload(!reload)
            }

            setOpenCompleteDialog(false)
            setReload(!reload)

        }catch (error) {
            alert(error)
        }
    }

    const search = async (wordToSearch) => {



        if(wordToSearch === ''){
            props.setReloadDrawer(!props.reloadDrawer)

        }else{
            if(appState.userInfo.position === 'Manager'){

                if(appState.userInfo.departmentid === '2002'){
                    const projectlistAll = await axios.get(`/project/search/${wordToSearch}`);
                    console.log(projectlistAll);
                    appState.setProjectListAll(projectlistAll.data);
                }
                else if(appState.userInfo.departmentid === '2000' || appState.userInfo.departmentid === '2001'){
                    const projectlistAll = await axios.get(`/project/sentProjectSearch/${wordToSearch}`);
                    console.log(projectlistAll);
                    appState.setProjectListAll(projectlistAll.data);
                }
                /********GET DEFAULT VALUES FOR PROJECT********/
                if(appState.leftList[0]){
                    console.log("inside if")
                    const defaultproject = await axios.get(`/project/projectlist/${appState.leftList[0].projectid}`);
                    console.log(defaultproject.data.project);

                    appState.setSelectedProject(defaultproject.data.project[0]);
                    appState.setCompletedTask(defaultproject.data.completedTask[0].taskcompleted)
                    appState.setActiveTask(defaultproject.data.activeTask[0].taskactive)
                }else{
                    appState.setSelectedProject({});
                    appState.setCompletedTask('')
                    appState.setActiveTask('')
                }


            }else if(appState.userInfo.position === 'Staff'){
                if(appState.userInfo.departmentid === '2002'){
                    const projectlistAll = await axios.get(`/project/projectstaff/search/${appState.userInfo.employeeid}/${wordToSearch}`);
                    console.log(projectlistAll);
                    appState.setProjectListAll(projectlistAll.data);

                    /********GET DEFAULT VALUES FOR PROJECT********/

                    const defaultproject = await axios.get(`/project/projectlist/${appState.leftList[0].projectid}`);
                    console.log(defaultproject.data.project);
                    appState.setSelectedProject(defaultproject.data.project[0]);

                    appState.setCompletedTask(defaultproject.data.completedTask[0].taskcompleted)
                    appState.setActiveTask(defaultproject.data.activeTask[0].taskactive)
                }
                else  if(appState.userInfo.departmentid === '2000' || appState.userInfo.departmentid === '2001'){
                    const projectlistAll = await axios.get(`/project/taskstafflist/search/${appState.userInfo.employeeid}/${wordToSearch}`);
                    console.log(projectlistAll);
                    appState.setProjectListAll(projectlistAll.data);

                    /********GET DEFAULT VALUES FOR TASKS********/

                    const defaultproject = await axios.get(`/project/taskDetails/${appState.leftList[0].taskid}`);
                    console.log(defaultproject.data[0]);
                    appState.setSelectedProject(defaultproject.data[0]);
                }

            }
        }



    }

    const list = (
        <ProjectListComponent search={"Search by name"} filter={"Filter"} list={appState.leftList} setReload={props.setReload} reload={props.reload} handleClick={handleProjectCLick} wordToSearch={search}/>
    )
    const sendButton= useObserver(()=> (
        <Fragment>
            {/**ON CLICK WE WILL CHANGE THE STATUS OF THE PROJECT FROM SEND TO SENT
             *WHEN WE CONFIRM THE STATUS HAS BEEN CHANGED, THEN WE WILL DISABLE THE BUTTON
             * THE CURRENT USAGE IS A PLACEHOLDER. NOT THE IMPLEMENTATION
             **/}
            <Button
                disabled={appState.enableSendButton}
                className={classes.sendButton}
                classes={{disabled: classes.sendButtonDisabled}}
                onClick={()=> setOpenSendDialog(true)}
            >
                Send
            </Button>
        </Fragment>
    ))

    const handleEditProject = ()=> {

        console.log("inside handleeditproject");
        appState.setEditSelectedProject(appState.selectedProject)
    }
    const editProject=(
        <Fragment>
            <Grid item container xs={1} justify={"center"}>
                <IconButton
                    onClick={()=> {
                        props.setOpenDialog(true);
                        handleEditProject()
                    }}
                >
                    <EditIcon fontSize="small" htmlColor={"black"}/>
                </IconButton>

            </Grid>
        </Fragment>
    )

    const completedButton = (

        <Fragment>
            <Button
                className={classes.completedButton}
                classes={{disabled: classes.completedButtonDisabled}}
                disabled={appState.enableCompletedButton}
                onClick={()=> setOpenCompleteDialog(true)}

            >
                COMPLETE
            </Button>
        </Fragment>
    )

    const alertSendProject = (
        <Fragment>
            <Dialog
                open={openSendDialog}
                onClose={()=> setOpenSendDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"YOU ARE ABOUT TO SEND THIS PROJECT TO OTHER DEPARTMENTS" +
                "!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                            This operation cannot be reversed. Are you sure you want to send this project to other departments?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> handleSendButtonClick()} color="primary" variant={"contained"}>
                        Continue
                    </Button>
                    <Button onClick={()=> setOpenSendDialog(false)} color="primary" autoFocus variant={"contained"}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
    const alertCompletedProject = (
        <Fragment>
            <Dialog
                open={openCompleteDialog}
                onClose={()=> setOpenCompleteDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"YOU ARE ABOUT TO COMPLETE THIS PROJECT!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This operation cannot be reversed. Are you sure you want to complete this project?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> handleCompleteClick()} color="primary" variant={"contained"}>
                        Continue
                    </Button>
                    <Button onClick={()=> setOpenCompleteDialog(false)} color="primary" autoFocus variant={"contained"}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
    const detail= (
        <Fragment>
            <ProjectFile sendButton={sendButton} editProject={editProject} completedButton={completedButton}/>

        </Fragment>

    )

    useEffect(()=>{

    },[])


    return (
        <div>
            {alertSendProject}
            {alertCompletedProject}
            <Grid container>
               <ListLayout list={list}/>

                <Details details={detail}/>
            </Grid>
        </div>
    );
}

export default ProjectList;