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
    const [enableSendButton, setEnableSendButton] = useState(false)
    const [enableCompletedButton, setEnableCompletedButton] = useState(false)
    const [reload, setReload] = useState(false)
    const appState = useAppState()

    //here we will pass list of project for manager, list of tasks for staff.

    const handleProjectCLick = async (projectid)=> {
        try{
            const result = await axios.get(`/project/projectlist/${projectid}`)

            //console.log(result.data)
            appState.setSelectedProject(result.data.project[0])

            //console.log(appState.selectedProject.givennames)


            const startDate = new Date(result.data.project[0].startdate);
            //console.log(result.data)
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
                //setReload(!reload)
                //console.log(location.data.location)
            } else {
                appState.setEnableSendButton(false)
                //setReload(!reload)
            }

            //enable or disable complete button

            if (status.data.status === '2') {
                appState.setEnableCompletedButton(true)
                //setReload(!reload)
            } else {
                appState.setEnableCompletedButton(false)
                //setReload(!reload)
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

        //setReload(!reload)

        //CHANGE THE STATE IN ORDER TO RELOAD STATE DATA

        //props.setReload = (!props.reload)
    }
    const handleSendButtonClick = async ()=> {
        try{
            await axios.put(`/sales/sendproject/${appState.selectedProject.projectid}`)
            const location = await axios.get(`/sales/location/${appState.selectedProject.projectid}`)

            if (location.data.location === '1') {
                appState.setEnableSendButton(true)
                setReload(!reload)
                //console.log(location.data.location)
            } else {
                appState.setEnableSendButton(false)
                setReload(!reload)
            }

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
                //console.log(location.data.location)
            } else {
                appState.setEnableSendButton(false)
                setReload(!reload)
            }

            setReload(!reload)

        }catch (error) {
            alert(error)
        }
    }
    useEffect(()=>{

        // async function fetchData(){
        //
        //     try{
        //         const location = await axios.get(`/sales/location/${appState.selectedProject.projectid}`)
        //         if(location.data.location === '1') {
        //             appState.setEnableSendButton(true)
        //             console.log(location.data.location)
        //         }
        //         else{
        //             appState.setEnableSendButton(false)
        //
        //         }
        //     const status = await axios.get(`/sales/status/${appState.selectedProject.projectid}`)
        //         console.log(status.data.status)
        //         if(status.data.status === '2'){
        //             appState.setEnableCompletedButton(true)
        //
        //         }
        //         else{
        //             appState.setEnableCompletedButton(false)
        //
        //         }
        //     }catch (error) {
        //         alert(error)
        //     }
        // }
        // fetchData()
    },[])

    const list = (
        <ProjectListComponent search={"Search by name"} filter={"Filter"} list={appState.leftList} setReload={props.setReload} reload={props.reload} handleClick={handleProjectCLick}/>
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
                onClick={()=> handleSendButtonClick()}
            >
                Send
            </Button>
        </Fragment>
    ))

    const editProject=(
        <Fragment>
            <Grid item container xs={1} justify={"center"}>
                <IconButton
                    onClick={()=> props.setOpenDialog(true)}
                >
                    <EditIcon fontSize="small" htmlColor={"black"}/>
                </IconButton>

            </Grid>
        </Fragment>
    )

    const completedButton = (

        //The title of the button will come from the Database.
        <Fragment>
            <Button
                className={classes.completedButton}
                classes={{disabled: classes.completedButtonDisabled}}
                disabled={appState.enableCompletedButton}
                onClick={()=> handleCompleteClick()}

            >
                COMPLETE
            </Button>
        </Fragment>
    )
    const detail= (
        <Fragment>
            <ProjectFile sendButton={sendButton} editProject={editProject} completedButton={completedButton}/>
            {/*<Fab color={"primary"} size={"small"} disabled={false} className={classes.fab} >*/}
            {/*   <SendIcon size={"small"}/>*/}
            {/*</Fab>*/}
        </Fragment>

    )
    return (
        <div>
            <Grid container>
               <ListLayout list={list}/>

                <Details details={detail}/>
            </Grid>
        </div>
    );
}

export default ProjectList;