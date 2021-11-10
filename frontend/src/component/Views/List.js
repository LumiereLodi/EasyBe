import React, {Fragment, useEffect, useState} from 'react';
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";
import {useAppState} from "../WithStore";
import {useObserver} from "mobx-react"
import axios from "axios";

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
    }
}))

function List(props) {

    const classes = useStyles()
    const appState = useAppState()
    const [reload, setReload] = useState(false)
    const [wordToSearch, setWordToSearch] = useState('')

    // const filter = [
    //     "All",
    //     "Current",
    //     "Prior",
    //     "Future"
    // ]

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
    useEffect(()=>{
        //alert("inside View projectList")
    }, [props.reload])
    // const filterComponent = (
    //     <Fragment>
    //         <Grid item xs={4} style={{marginLeft: "0.1em"}}>
    //             <TextField fullWidth
    //                        id={"filter"}
    //                        variant={"filled"}
    //                        InputProps={{disableUnderline: true}}
    //                        label={"Filter"}
    //                        className={classes.form}
    //                        size={"small"}
    //                        select
    //             >
    //                 <MenuItem value="">
    //                     <em>None</em>
    //                 </MenuItem>
    //                 {filter.map((filter, index) => (
    //                     <MenuItem key={index} value={index}>
    //                         {filter}
    //                     </MenuItem>
    //                 ))}
    //             </TextField>
    //         </Grid>
    //     </Fragment>
    // )
    return useObserver(()=> (


        <Fragment>

             <ListSubheader disableGutters>
                <Grid item className={classes.searchContainer}>

                    <Grid container justifyContent={"space-between"}>
                        <Grid item xs style={{marginRight: "0.1em"}}>
                            <FormControl fullWidth
                                         id={"search"}
                                         variant={"filled"}
                                         className={classes.form}
                                         size={"small"}
                                         onChange={(e)=> setWordToSearch(e.target.value)}

                            >
                                <InputLabel id="search"  >{props.search ? props.search : undefined}</InputLabel>
                                <FilledInput
                                    id="search"

                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => props.wordToSearch(wordToSearch)}
                                            >
                                                <SearchIcon/>
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    disableUnderline

                                />
                            </FormControl>
                        </Grid>


                        {/*{props.filter ? filterComponent : undefined}*/}
                    </Grid>


                </Grid>

            </ListSubheader>

            {/*{props.list ? props.list : undefined}*/}

            {appState.userInfo.position === 'Staff' ? appState.userInfo.departmentid !== '2000' && appState.userInfo.departmentid !== '2001' ?
                props.list ? props.list.map((value, index)=>(
                        <Grid item key={index}
                              onClick={()=> (window.location.pathname === '/drawer/project/projectlist' ||
                                  window.location.pathname === '/drawer/researchProject/projectlist') ? props.handleClick(value.projectid)
                                  : window.location.pathname === '/drawer/client/clientlist' ? props.handleClick(value.customerid) : undefined}>

                            <ListItem className={classes.ListContainer} value={value.projectid} button disableGutters >
                                <Grid container alignItems={"center"} style={{height: "100%"}}>
                                    <Typography style={{fontWeight: "bold" }} >
                                        {value.name && value.name.length < 23 ? value.name : value.name !== null ? <span>{value.name.substring(0, 23)}...</span> : null}
                                        {/*{value.name}*/}
                                    </Typography>
                                </Grid>
                            </ListItem>


                        </Grid>
                    )) : undefined
                : props.list ? props.list.map((value, index)=>(
                    <Grid item key={index}
                          onClick={()=> (props.handleClick(value.taskid))}>

                        <ListItem className={classes.ListContainer} value={value.taskid} button disableGutters >
                            <Grid container alignItems={"center"} style={{height: "100%"}}>
                                <Typography style={{fontWeight: "bold" }} >
                                    {value.name && value.name.length < 23 ? value.name : value.name !== null ? <span>{value.name.substring(0, 23)}...</span> : null}
                                    {/*{value.name}*/}
                                </Typography>
                            </Grid>
                        </ListItem>


                    </Grid>
                )) : undefined
                :
                props.list ? props.list.map((value, index)=>(
                    <Grid item key={index}
                          onClick={()=> (window.location.pathname === '/drawer/project/projectlist' ||
                              window.location.pathname === '/drawer/researchProject/projectlist'||
                          window.location.pathname === '/drawer/admin/hrProject' ) ? props.handleClick(value.projectid)
                              : window.location.pathname === '/drawer/client/clientlist' ? props.handleClick(value.customerid)
                                  : window.location.pathname === '/drawer/admin/departmentList' ? props.handleClick(value.departmentid)
                                      : window.location.pathname === '/drawer/admin/employeeList' ? props.handleClick(value.employeeid): undefined}>

                        <ListItem className={classes.ListContainer} value={value.projectid} button disableGutters >
                            <Grid container alignItems={"center"} style={{height: "100%"}}>
                                <Typography style={{fontWeight: "bold" }} >
                                    {value.name && value.name.length < 23 ? value.name : value.name !== null ? <span>{value.name.substring(0, 23)}...</span> : null}
                                    {/*{value.name}*/}
                                </Typography>
                            </Grid>
                        </ListItem>


                    </Grid>
                )) : undefined
            }


            {/*{props.list ? props.list.map((value, index)=>(*/}
            {/*    <Grid item key={index}*/}
            {/*          onClick={()=> (window.location.pathname === '/drawer/project/projectlist' ||*/}
            {/*              window.location.pathname === '/drawer/researchProject/projectlist') ? props.handleClick(value.projectid)*/}
            {/*              : window.location.pathname === '/drawer/client/clientlist' ? props.handleClick(value.customerid) :  undefined}>*/}

            {/*        <ListItem className={classes.ListContainer} value={value.projectid} button disableGutters >*/}
            {/*            <Grid container alignItems={"center"} style={{height: "100%"}}>*/}
            {/*                <Typography style={{fontWeight: "bold" }} >*/}
            {/*                    {value.name && value.name.length < 23 ? value.name : value.name !== null ? <span>{value.name.substring(0, 23)}...</span> : null}*/}
            {/*                    /!*{value.name}*!/*/}
            {/*                </Typography>*/}
            {/*            </Grid>*/}
            {/*        </ListItem>*/}


            {/*    </Grid>*/}
            {/*)) : undefined}*/}




        </Fragment>
    ));
}

export default List;
