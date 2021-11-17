import React,{Fragment} from 'react';
import ListLayout from "../../Layout/ListLayout"
import Details from "../../Layout/Details"
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import EditIcon from "@material-ui/icons/Edit";
import List from "../List";

import ObjectInformation from "../ObjectInformation";
import UserOverview from "../UserOverview";
import {useAppState} from "../../WithStore";
import axios from "axios";
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
        borderRadius: "0.2em",
        [theme.breakpoints.down("xs")]: {
            width: "91%",
        }
    },
    customerInfoContainer: {
        //backgroundColor: theme.palette.primary.main,
        backgroundColor: "#FFF8DD",
        borderRadius: "0.3em",
        height: "27em",

    },
    customerProjectContainer: {
        backgroundColor: "#FFF8DD",
        borderRadius: "0.3em",
        height: "25em",
        overflow: "auto"
    }


}))


function EmployeeList(props) {

    const classes = useStyles()
    const appState = useAppState()


    const OverviewHeaders = [
        "Task Name",
        "Start Date",
        "End Date",
        "Status ",
        "Manager"
    ];
    const OverviewData = [
        "Do that",
        "19/09/2021",
        "10/10/2021",
        "On Track",
        "Lumiere"
    ];
    const InformationHeader = [
        "Last Name",
        "First Name",
        "Department",
        "Position",
        "Phone Number",
        "Email",
        "Data Of Birth",
        "Address",
        "Contract",
        "Created At",
        "Created By"
    ];
    const InformationData = [
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.lastname ? appState.selectedEasbeEmployee.lastname : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.givennames ? appState.selectedEasbeEmployee.givennames : '...' : '...',

        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.name ? appState.selectedEasbeEmployee.name : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.position ? appState.selectedEasbeEmployee.position : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.phonenumber ? appState.selectedEasbeEmployee.phonenumber : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.email ? appState.selectedEasbeEmployee.email : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.formateddateofbirth ? appState.selectedEasbeEmployee.formateddateofbirth : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.address ? appState.selectedEasbeEmployee.address : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.contract ? appState.selectedEasbeEmployee.contract : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.createdat ? appState.selectedEasbeEmployee.createdat : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.createdby ? appState.selectedEasbeEmployee.createdby : '...' : '...',
    ];


    const handleClickEdit = () => {
        appState.setEditSelectedEasbeEmployee(appState.selectedEasbeEmployee);
        appState.setEmployeeRegistrationReload(true)

    }
    const editButton = (
        <Fragment>
            <Grid item>
                <IconButton
                    onClick={()=> {
                        props.setOpenEmployeeDialog(true);
                        handleClickEdit()
                    }}
                >
                    <EditIcon fontSize="small" htmlColor={"black"}/>
                </IconButton>
            </Grid>
        </Fragment>
    )

    const handleEmployeeClick = async (employeeid) => {

        console.log("inside handleDepartmentClick")
        try{

                const selectedEasybeEmployee = await axios.get(`/hr/alleasybeemployeelistdetails/${employeeid}`)

                appState.setSelectedEasbeEmployee(selectedEasybeEmployee.data)
                console.log(selectedEasybeEmployee.data)

                const selectedEmployeeTasks = await axios.get(`/hr/alleasybeemployeelistdetails/tasks/${employeeid}`)
                console.log(selectedEmployeeTasks.data)
                appState.setSelecteEmployeeTasks(selectedEmployeeTasks.data)



            props.setReload(!props.reload);

        }catch (error) {
            console.log(error)
        }

    }

    const search = async (wordToSearch) => {

        try{
            if(wordToSearch === ''){
                props.setReloadDrawer(!props.reloadDrawer)

            }else{
                const employeeList = await axios.get(`/hr/alleasybeemployeelist/${wordToSearch}`)
                appState.setAllEasybeEmployeeList(employeeList.data)

                if(appState.allEasybeEmployeeList[0]){
                    const selectedEasybeEmployee = await axios.get(`/hr/alleasybeemployeelistdetails/${appState.allEasybeEmployeeList[0].employeeid}`)

                    appState.setSelectedEasbeEmployee(selectedEasybeEmployee.data)

                    const selectedEmployeeTasks = await axios.get(`/hr/alleasybeemployeelistdetails/tasks/${appState.allEasybeEmployeeList[0].employeeid}`)
                    appState.setSelecteEmployeeTasks(selectedEmployeeTasks.data)
                }else{
                    appState.setSelectedEasbeEmployee({})
                }
            }

        }catch(e){
            alert(e)
        }

    }
    const list = (
        <Fragment>
            <List search={"Search by name"} list={appState.allEasybeEmployeeList} setReload={props.setReload} reload={props.reload}
                  handleClick={handleEmployeeClick} wordToSearch={search}/>

        </Fragment>
    )

    const details = useObserver(()=> (
        <Fragment>
            <ListSubheader disableGutters style={{paddingBottom: "0.5em"}}>
                <Grid container justify={"center"} style={{marginBottom: "2em", marginTop: "1em"}}>
                    <Grid item>
                        <Typography variant={"h1"} style={{fontSize: "2em"}}>
                            {appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.lastname ? appState.selectedEasbeEmployee.lastname : <span>...</span> : <span>...</span>}
                        </Typography>
                    </Grid>
                </Grid>


            </ListSubheader>

            <ObjectInformation InformationHeader={InformationHeader} InformationData={InformationData} title={"Employee Information"} editButton={editButton}/>

            <div>
                <Grid item container>
                    <Typography variant={"h1"} style={{fontWeight: "bold" , marginTop: "2em"}} >
                        Employee Tasks
                    </Typography>
                </Grid>
                <Grid container className={classes.customerProjectContainer} style={{marginTop: "2em", marginBottom: "1em"}}>
                    <Grid container  sm={12} direction={"column"}>
                        <ListSubheader disableGutters>
                            <Grid item container style={{marginTop: "1.5em", marginBottom: "1em"}}>

                                {OverviewHeaders ? OverviewHeaders.map((headers, index) => (
                                    <Grid item container xs justify={"center"} >
                                        <Typography style={{fontWeight: "bold", color: "black"}} key={index}>
                                            {headers}
                                        </Typography>

                                    </Grid>
                                )) : undefined}


                            </Grid>
                        </ListSubheader>



                            {appState.selectedEmployeeTasks ? appState.selectedEmployeeTasks.map((data, index) => (
                                <Grid item container style={{marginBottom: "1em"}}>
                                    <Grid item container xs justify={"center"} alignItems={"center"}>
                                        <Typography >
                                            {data.name && data.name.length < 23 ? data.name : data.name !== null ? <span>{data.name.substring(0, 23)}...</span> : null}
                                        </Typography>

                                    </Grid>
                                    <Grid item container xs justify={"center"} alignItems={"center"}>
                                        <Typography >
                                            {data.formatedstartdate ? data.formatedstartdate : <span>...</span>}
                                        </Typography>

                                    </Grid>
                                    <Grid item container xs justify={"center"} alignItems={"center"}>
                                        <Typography >
                                            {data.formatedenddate ? data.formatedenddate : <span>...</span>}
                                        </Typography>

                                    </Grid>
                                    <Grid item container xs justify={"center"} alignItems={"center"}>
                                        <Typography >
                                            {data.taskstatus ? data.taskstatus : <span>...</span>}
                                        </Typography>

                                    </Grid>
                                    <Grid item container xs justify={"center"} alignItems={"center"}>
                                        <Typography >
                                            {data.createdby ? data.createdby : <span>...</span>}
                                        </Typography>

                                    </Grid>
                                </Grid>
                            )) : undefined}



                    </Grid>
                </Grid>
            </div>

        </Fragment>
    ))
    return (
        <div>
            <Grid container>
                <ListLayout list={list}/>

                <Details details={details}/>
            </Grid>
        </div>
    );
}

export default EmployeeList;