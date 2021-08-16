import React, {useEffect, useState} from 'react';
import {
    Grid,
    Typography,

} from "@material-ui/core";
import {useObserver} from "mobx-react"
import {useAppState} from "../WithStore"
import axios from "axios";


import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme =>({
    projectContainer:{
        marginRight: "0.3em",
        marginBottom: "1em"
    },
    projectStatusContainer:{
        backgroundColor: theme.palette.secondary.main,
        height: "10em"
    },
    projectStatusContainerMargin:{
        marginRight: "1em",
        marginLeft: "1em"
    },
    overviewContainer:{
        //backgroundColor: theme.palette.secondary.main,
        marginRight: "0.3em",
        paddingRight: "1.5em",
        paddingLeft: "1.5em"

    },
    overviewText:{
        ...theme.typography.dashboard
    },
    overviewTitleContainer: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "0.5em",
        height: "2.2em"
    },
    overviewDataContainer:{
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0.5em",
        marginBottom: "1.1em",
        height: "20.4em"

    },
    overviewData:{
        marginTop: "0.3em"
    },
    activityStatus:{
        fontWeight: "bold",
        fontsize: "1em",
        marginBottom: "0.1em",
        marginTop: "1em"
    }
}))
function Index(props) {
    const classes = useStyles();
    const [completedProject, setCompletedProject] = useState(0)
    const [activeProject, setActiveProject] = useState(0)
    const [backlogProject, setBacklogProject] = useState(0)

    useEffect(()=>{
        async function fetchData(){
            
            try{
                const status = "completed";
                const completedProject = await axios.get("http://localhost:3001/dashboard/project/completed");
                setCompletedProject(completedProject.data.count)

                const activeProject = await axios.get("http://localhost:3001/dashboard/project/active")
                setActiveProject(activeProject.data.count)

                const backlogPorject = await axios.get("http://localhost:3001/dashboard/project/status/backlog")
                setBacklogProject(backlogPorject.data.count)
            }catch (e) {
                console.log(e)
            }
                

        }

        fetchData()
    })
    return (
        <div>
            <Grid container direction={"column"}>

                {/**ACTIVE COMPLETED AND BACKLOG**/}
                <Grid item className={classes.projectContainer}>
                    <Grid container jusitfy={"center"} >
                        <Grid item md className={classes.projectStatusContainer} style={{textAlign: "center"}}>
                            <Typography className={classes.activityStatus}>
                                Active Projects
                            </Typography>
                            <Typography style={{fontSize: "4em", color: "green"}}>
                                {activeProject}
                            </Typography>

                        </Grid>
                        <Grid item md className={[classes.projectStatusContainer, classes.projectStatusContainerMargin]}  style={{textAlign: "center"}}>
                            <Typography className={classes.activityStatus}>
                                Completed Projects
                            </Typography>
                            <Typography style={{fontSize: "4em", color: "blue"}}>
                                {completedProject}
                            </Typography>
                        </Grid>
                        <Grid item md className={classes.projectStatusContainer}  style={{textAlign: "center"}}>
                            <Typography className={classes.activityStatus}>
                                Backlog Projects
                            </Typography>
                            <Typography style={{fontSize: "4em", color: "red"}}>
                                {backlogProject}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.overviewContainer}>
                    <Grid container direction={"column"} >
                        <Grid item style={{marginBottom: "1em",marginTop: "0.5em", fontSize: "1em", fontWeight: "bold", fontFamily: "sans-serif"}}>
                            Projects Overview
                        </Grid>
                        <Grid item style={{marginBottom: "1em"}} >
                            <Grid container justify={"center"} className={classes.overviewTitleContainer} alignItems={"center"}>
                                <Grid item sm style={{textAlign: "center"}} className={classes.overviewText}>
                                    Project
                                </Grid>
                                <Grid item sm style={{textAlign: "center"}} className={classes.overviewText}>
                                    Task
                                </Grid>
                                <Grid item sm style={{textAlign: "center"}} className={classes.overviewText}>
                                    Status
                                </Grid>
                                <Grid item sm style={{textAlign: "center"}} className={classes.overviewText}>
                                    Progress
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.overviewDataContainer}>
                            <Grid container justify={"center"} className={classes.overviewData}>
                                <Grid item sm style={{textAlign: "center", color: "white"}}>
                                    Dev front end user managment
                                </Grid>
                                <Grid item sm style={{textAlign: "center", color: "white"}}>
                                    50
                                </Grid>
                                <Grid item sm style={{textAlign: "center",color: "white"}}>
                                    On Track
                                </Grid>
                                <Grid item sm style={{textAlign: "center",color: "white"}}>
                                    85%
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

        </div>
    );
}

export default Index;