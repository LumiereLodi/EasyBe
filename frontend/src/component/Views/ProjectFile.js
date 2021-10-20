import React, {Fragment, useEffect, useState} from 'react';
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";
import axios from "axios";

import {useObserver} from "mobx-react"
import {useAppState} from "../WithStore";

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
    projectInfoContainer: {
        //backgroundColor: theme.palette.primary.main,
        backgroundColor: "#FFF8DD",
        borderRadius: "0.3em",
        height: "12em"
    },
    remainingDaysContainer:{
        borderRadius: "0.3em",
        height: "12em",
        borderColor: "rgba(35,37,38,0.25)",
        border: "2px solid",

    },
    projectActivities:{
        borderRadius: "0.3em",
        backgroundColor: "#FFF8DD",
        overflow: "auto",
        height: "20em"
    },
    saveButton: {
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
        marginTop: "1em"
    },
    editButton:{

        borderWidth: 2,
        borderRadius: 50,

    }


}))
function ProjectFile(props) {
    const classes = useStyles()

    const [editSM, setEditSM] = useState(false)
    const [editRI, setEditRI] = useState(false)
    const [editIT, setEditIT] = useState(false)
    const [startDate, setStartDate] = useState('')
    const appState = useAppState()

    const [descriptionTextColor, setDescriptionTextColor] = useState("black")

    const [RIDescription, setRIDescription] = useState('')
    const [ITDescription, setITDescription] = useState('')
    const [SMDescription, setSMDescription] = useState('')

    const handleSave = (e) => {
        //alert("I was clicked")
    }

    useEffect(()=> {
        if(appState.selectedProject.startdate){
            const startdate = new Date(appState.selectedProject.startdate)
            const startDateFormat = startdate.getDate() + "/" + startdate.getMonth() + "/" + startdate.getFullYear();
            setStartDate(startDateFormat)
            //const startDateFormat = startdate.getFullYear() + "/" + startdate.getMonth() + "/" + startdate.getDate();
        }

        //alert("inside Project file")
    },[])

    const saveRIProjectfile = async () => {
        try{
            const result = await axios.post(`/project/projectfile/description/${appState.selectedProject.projectid}/${appState.userInfo.employeeid}/${appState.userInfo.departmentid}`,
                {description: RIDescription} );

            console.log(result.data)
        }catch (error) {
            alert(error)
        }
    }
    const saveITProjectfile = async () => {
        try{
            const result = await axios.post(`/project/projectfile/description/${appState.selectedProject.projectid}/${appState.userInfo.employeeid}/${appState.userInfo.departmentid}`,
                {description: ITDescription} );

            console.log(result.data)
        }catch (error) {
            alert(error)
        }
    }
    const saveSMProjectfile = async () => {
        //console.log(SMDescription)
        try{
            const result = await axios.post(`/project/projectfile/description/${appState.selectedProject.projectid}/${appState.userInfo.employeeid}/${appState.userInfo.departmentid}`,
                {description: SMDescription} );

            console.log(result.data)
        }catch (error) {
            alert(error)
        }

    }
    return useObserver(()=> (
        <Fragment>

            <ListSubheader disableGutters style={{paddingBottom: "0.5em"}}>
                <Grid item>
                    <Grid container justify={"center"} style={{marginBottom: "1em", marginTop: "1em"}}>
                        <Grid item>
                            <Typography variant={"h1"} style={{fontSize: "2em"}}>
                                {/*{appState.selectedProject.name !== null ? appState.selectedProject.name.toUpperCase() : null}*/}
                                {/*{appState.selectedProject.name.length < 50 ? appState.selectedProject.name.toUpperCase() : <span>{appState.selectedProject.name.substring(0, 50)}...</span> }*/}
                                {appState.selectedProject.name && appState.selectedProject.name.length < 50 ? appState.selectedProject.name.toUpperCase() : appState.selectedProject.name  ? <span>{appState.selectedProject.name.substring(0, 50)}...</span> : null}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item style={{marginBottom: "1.5em", marginTop: "2em"}}>
                    <Grid container>
                        <Grid item container direction={"column"} xs alignItems={"flex-end"} style={{marginRight: "4em"}} >
                            <Typography style={{fontSize: "3em", color: "black"}}>
                                {appState.completedTask}
                            </Typography>
                            <Typography style={{fontSize: "1em", color: "black"}}>
                                Completed Tasks
                            </Typography>
                        </Grid>
                        <Grid item container direction={"column"} xs style={{marginLeft: "4em"}}>
                            <Typography style={{fontSize: "3em", color: "black"}}>
                                {appState.activeTask}
                            </Typography>
                            <Typography style={{fontSize: "1em",color: "black"}}>
                                Active Tasks
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </ListSubheader>

            <Grid container direction={"column"}>

                <Grid item>
                    <Grid container justify={"center"}>
                        <Grid item container className={classes.projectInfoContainer} sm={7} style={{marginRight: "1em"}} direction={"column"}>
                            <Grid item>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography  style={{fontWeight: "bold", marginLeft: "1em" , marginTop: "1em"}} >
                                            Project Description
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid item container >
                                            {/**ASSIGN BUTTON IS FOR IT & RI MANAGER**/}
                                            {(props.assignButton && appState.userInfo.position === "Manager") ? props.assignButton: undefined}

                                            {/**SEND BUTTON IS FOR SM MANAGER**/}
                                            {props.sendButton ? props.sendButton: undefined}

                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item>
                                <Grid container style={{marginTop: "1.5em"}}>
                                    <Grid item container xs justify={"center"} >
                                        <Typography style={{fontWeight: "bold"}}>
                                            Sales Person
                                        </Typography>

                                    </Grid>
                                    <Grid item container xs justify={"center"} >
                                        <Typography style={{fontWeight: "bold"}}>
                                            Start Date
                                        </Typography>
                                    </Grid>
                                    <Grid item container xs justify={"center"} >
                                        <Typography style={{fontWeight: "bold"}}>
                                            End Date
                                        </Typography>
                                    </Grid>
                                    {(props.editProject && appState.userInfo.position === "Manager") ?
                                        <Grid item container xs={1} justify={"center"} >
                                            <Typography style={{fontWeight: "bold"}}>

                                            </Typography>
                                        </Grid>
                                        : undefined}
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Grid item container xs justify={"center"}  alignItems={"center"}>
                                        <Typography >
                                            {/***project.name.length < 20 ? project.name : <span>{project.name.substring(0, 20)}...</span> **/}
                                            { appState.selectedProject.lastname && appState.selectedProject.lastname.length < 20 ? appState.selectedProject.lastname : appState.selectedProject.lastname !== undefined ? <span>{appState.selectedProject.lastname.substring(0, 20)}...</span> : undefined}
                                            {/**                                {value.name && value.name.length < 23 ? value.name : value.name !== null ? <span>{value.name.substring(0, 23)}...</span> : null}
                                             **/}
                                        </Typography>

                                    </Grid>
                                    <Grid item container xs justify={"center"} alignItems={"center"}>
                                        <Typography >
                                            {appState.startDate}
                                        </Typography>
                                    </Grid>
                                    <Grid item container xs justify={"center"} alignItems={"center"}>
                                        <Typography>
                                            {appState.endDate}
                                        </Typography>
                                    </Grid>
                                    {(props.editProject && appState.userInfo.position === "Manager") ? props.editProject : undefined}
                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid item container className={classes.remainingDaysContainer} sm={4} style={{marginLeft: "1em"}}>
                            <Grid container direction={"column"} alignItems={"center"} style={{marginBottom: "1em", marginTop: "0.5em"}}>
                                <Grid item>
                                    <Typography variant={"h1"}>
                                        Remaining Days
                                    </Typography>
                                </Grid>
                                {/**#6ed00c**/}
                                <Grid item style={{marginTop: "1em"}}>
                                    <Typography style={{ fontFamily: "Roboto", fontSize: "4em", color: appState.selectedProject.remainingdays >= 0 ? "#6ed00c" : "red"}}>
                                        {appState.selectedProject.remainingdays}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    {props.completedButton ? props.completedButton : undefined }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item style={{marginTop: "2em", marginBottom: "2em"}}>
                    <Grid item container>
                        <Typography variant={"h1"} style={{fontWeight: "bold" , marginTop: "1em",marginBottom: "1em"}} >
                            Project Activities
                        </Typography>
                    </Grid>
                    <Grid container  className={classes.projectActivities} sm={12} direction={"column"}>

                        <ListSubheader disableGutters style={{zIndex: "0"}}>
                            <Grid item container style={{marginTop: "1.5em"}}>

                                <Grid item container xs justify={"center"} >
                                    <Typography style={{fontWeight: "bold"}}>
                                        Task Name
                                    </Typography>

                                </Grid>
                                <Grid item container xs justify={"center"} >
                                    <Typography style={{fontWeight: "bold"}}>
                                        Assign To
                                    </Typography>
                                </Grid>
                                {/*<Grid item container xs justify={"center"} >*/}
                                {/*    <Typography style={{fontWeight: "bold"}}>*/}
                                {/*        Deadline*/}
                                {/*    </Typography>*/}
                                {/*</Grid>*/}
                                <Grid item container xs justify={"center"} >
                                    <Typography style={{fontWeight: "bold"}}>
                                        Status
                                    </Typography>
                                </Grid>
                                <Grid item container xs justify={"center"} >
                                    <Typography style={{fontWeight: "bold"}}>
                                        Manager
                                    </Typography>
                                </Grid>
                                {(props.editButton && appState.userInfo.position === "Manager") ?
                                    <Grid item container xs={1} justify={"center"} >
                                        <Typography style={{fontWeight: "bold"}}>

                                        </Typography>
                                    </Grid>
                                    : undefined}


                            </Grid>
                        </ListSubheader>


                        {appState.taskList.map((task, index) => (

                            <Grid item container style={{marginBottom: "0.3em"}}>

                                <Grid item container xs justify={"center"} alignItems={"center"}>
                                    <Typography>
                                        {/***project.name.length < 20 ? project.name : <span>{project.name.substring(0, 20)}...</span> **/}
                                        {task.name.length < 20 ? task.name : <span>{task.name.substring(0, 20)}...</span>}
                                    </Typography>

                                </Grid>
                                <Grid item container xs justify={"center"} alignItems={"center"} >
                                    <Typography >
                                        {/***project.name.length < 20 ? project.name : <span>{project.name.substring(0, 20)}...</span> **/}
                                        {task.lastname.length < 20 ? task.lastname : <span>{task.lastname.substring(0, 20)}...</span>}
                                    </Typography>
                                </Grid>
                                {/*<Grid item container xs justify={"center"} alignItems={"center"} >*/}
                                {/*    <Typography>*/}
                                {/*        Deadline*/}
                                {/*    </Typography>*/}
                                {/*</Grid>*/}
                                <Grid item container xs justify={"center"} alignItems={"center"}>
                                    <Typography >
                                        {task.status === '0' ? "In Progress" : task.status === '1' ? "Completed" : task.status === '2' ? "Delayed" : undefined}
                                    </Typography>
                                </Grid>
                                <Grid item container xs justify={"center"} alignItems={"center"}>
                                    <Typography >
                                        {task.departmentid}
                                    </Typography>
                                </Grid>
                                {/*<Grid item container xs={1} justify={"center"} >*/}
                                {/*    <IconButton*/}
                                {/*        onClick={()=> props.openDialog ? props.openDialog(true) : undefined}*/}
                                {/*    >*/}
                                {/*        <EditIcon fontSize="small" htmlColor={"black"}/>*/}
                                {/*    </IconButton>*/}

                                {/*</Grid>*/}
                                {(props.editButton && appState.userInfo.position === "Manager") ? props.editButton : undefined}

                            </Grid>
                        ))}


                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container justify={"center"}>
                        <Typography variant={"h1"}>
                            Project File
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item style={{marginTop: "2em"}}>
                    <Grid container >
                        <Grid item xs={6}>
                            <Grid container justify={"flex-start"} >
                                <Typography variant={"h1"}>
                                    Sales & Marketing
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            {appState.userInfo.departmentid === '2002' ?
                                <Grid container justify={"flex-end"}>
                                    <IconButton
                                        disabled={editSM}
                                        onClick={()=> setEditSM(true)}
                                    >
                                        <EditIcon fontSize="small" htmlColor={editSM ? "grey" : "black"} />
                                    </IconButton>

                                </Grid> : undefined
                            }

                        </Grid>

                    </Grid>
                </Grid>


                <Grid item>
                    <Grid item sm className={classes.textFieldContainer}>
                        <TextField fullWidth
                                   id={"SMDescription"}
                                   variant={"filled"}
                                   disabled={!editSM}
                                   InputProps={{
                                       disableUnderline: true,
                                       autoComplete: 'new-password',
                                       form: {
                                           autoComplete: 'off'
                                       }
                                   }}

                                   label={"Description"}
                                   className={classes.form}
                                   multiline
                                   rows={15}
                                   defaultValue = {appState.SMProjectFile }
                                   onChange={(event) => setSMDescription(event.target.value)}

                        />
                    </Grid>
                </Grid>
                {editSM ? <Grid item>
                    <Grid container justify={"center"}>
                        <Grid item>
                            <Button
                                className={classes.saveButton}
                                onClick={(e)=> {setEditSM(false); saveSMProjectfile()}}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid> : undefined}

                <Grid item style={{marginTop: "2em"}}>
                    <Grid container >
                        <Grid item xs={6}>
                            <Grid container justify={"flex-start"} >
                                <Typography variant={"h1"}>
                                    Research & Innovation
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            {appState.userInfo.departmentid === '2001' ?
                                <Grid container justify={"flex-end"}>
                                    <IconButton
                                        disabled={editRI}
                                        onClick={()=> setEditRI(true)}
                                    >
                                        <EditIcon fontSize="small" htmlColor={editRI ? "grey" : "black"} />
                                    </IconButton>

                                </Grid> : undefined
                            }

                        </Grid>

                    </Grid>
                </Grid>

                <Grid item>
                    <Grid item sm >
                        <TextField fullWidth
                                   id={"RIDescription"}
                                   variant={"filled"}
                                   disabled={!editRI}
                                   InputProps={{
                                       disableUnderline: true,
                                       autoComplete: 'new-password',
                                       form: {
                                           autoComplete: 'off'
                                       },
                                       readOnly: false
                                   }}
                                   label={"Description"}
                                   className={classes.form}
                                   multiline
                                   rows={15}
                                   defaultValue = {appState.RIProjectFile }
                                   onChange={(event) => setRIDescription(event.target.value)}
                        />
                    </Grid>
                </Grid>
                {editRI ? <Grid item>
                    <Grid container justify={"center"}>
                        <Grid item>
                            <Button
                                className={classes.saveButton}
                                onClick={(e)=> {setEditRI(false); saveRIProjectfile()}}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid> : undefined}
                <Grid item style={{marginTop: "2em"}}>
                    <Grid container >
                        <Grid item xs={6}>
                            <Grid container justify={"flex-start"}>
                                <Typography variant={"h1"}>
                                    IT
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            {appState.userInfo.departmentid === '2000' ?
                                <Grid container justify={"flex-end"}>
                                    <IconButton
                                        disabled={editIT}
                                        onClick={()=> setEditIT(true)}
                                    >
                                        <EditIcon fontSize="small" htmlColor={editIT ? "grey" : "black"} />
                                    </IconButton>

                                </Grid> : undefined
                            }

                        </Grid>

                    </Grid>
                </Grid>
                <Grid item >
                    <Grid item sm >
                        <TextField fullWidth
                                   disabled={!editIT}
                                   id={"ITDescription"}
                                   variant={"filled"}
                                   InputProps={{
                                       disableUnderline: true,
                                       autoComplete: 'new-password',
                                       form: {
                                           autoComplete: 'off'
                                       },
                                       readOnly: false
                                   }}
                                   label={"Description"}
                                   className={classes.form}
                                   multiline
                                   rows={15}
                                   defaultValue = {appState.ITProjectFile }
                                   onChange={(event) => setITDescription(event.target.value)}
                        />
                    </Grid>
                </Grid>
                {editIT ? <Grid item style={{marginBottom: "2em"}}>
                    <Grid container justify={"center"}>
                        <Grid item>
                            <Button
                                className={classes.saveButton}
                                onClick={(e)=> {setEditIT(false); saveITProjectfile()}}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid> : undefined}

                <Grid item style={{marginBottom: "2em"}}/>


            </Grid>
        </Fragment>
    ));
}

export default ProjectFile;
