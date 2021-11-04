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
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.name ? appState.selectedEasbeEmployee.name : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.position ? appState.selectedEasbeEmployee.position : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.phonenumber ? appState.selectedEasbeEmployee.phonenumber : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.email ? appState.selectedEasbeEmployee.email : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.dateofbirth ? appState.selectedEasbeEmployee.dateofbirth : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.address ? appState.selectedEasbeEmployee.address : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.contract ? appState.selectedEasbeEmployee.contract : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.createdat ? appState.selectedEasbeEmployee.createdat : '...' : '...',
        appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.createdby ? appState.selectedEasbeEmployee.createdby : '...' : '...',
    ];

    const editButton = (
        <Fragment>
            <Grid item>
                <IconButton
                    onClick={()=> props.setOpenEmployeeDialog(true)}
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


            props.setReload(!props.reload);

        }catch (error) {
            console.log(error)
        }

    }

    const list = (
        <Fragment>
            <List search={"Search by name"} list={appState.allEasybeEmployeeList} handleClick={handleEmployeeClick}/>

        </Fragment>
    )

    const details = (
        <Fragment>
            <ListSubheader disableGutters style={{paddingBottom: "0.5em"}}>
                <Grid container justify={"center"} style={{marginBottom: "2em", marginTop: "1em"}}>
                    <Grid item>
                        <Typography variant={"h1"} style={{fontSize: "2em"}}>
                            {appState.selectedEasbeEmployee ? appState.selectedEasbeEmployee.lastname ? appState.selectedEasbeEmployee.lastname : <span>...</span> : <span>...</span>}
                        </Typography>
                    </Grid>
                </Grid>

                {/*<Grid item style={{marginBottom: "1.5em", marginTop: "2em"}}>*/}
                {/*    <Grid container>*/}
                {/*        <Grid item container direction={"column"} xs alignItems={"flex-end"} >*/}
                {/*            <Typography style={{fontSize: "3em", color: "black"}}>*/}
                {/*                739*/}
                {/*            </Typography>*/}
                {/*            <Typography style={{fontSize: "1em", color: "black"}}>*/}
                {/*                Completed On Time*/}
                {/*            </Typography>*/}
                {/*        </Grid>*/}
                {/*        <Grid item container direction={"column"} alignItems={"center"} xs >*/}
                {/*            <Typography style={{fontSize: "3em", color: "black"}}>*/}
                {/*                132*/}
                {/*            </Typography>*/}
                {/*            <Typography style={{fontSize: "1em",color: "black"}}>*/}
                {/*                Completed After Deadline*/}
                {/*            </Typography>*/}
                {/*        </Grid>*/}
                {/*        <Grid item container direction={"column"} xs >*/}
                {/*            <Typography style={{fontSize: "3em", color: "black"}}>*/}
                {/*                165*/}
                {/*            </Typography>*/}
                {/*            <Typography style={{fontSize: "1em",color: "black"}}>*/}
                {/*                Tasks In Progress*/}
                {/*            </Typography>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
            </ListSubheader>

            <ObjectInformation InformationHeader={InformationHeader} InformationData={InformationData} title={"Employee Information"} editButton={editButton}/>

            <UserOverview OverviewHeaders={OverviewHeaders} title={"Employee Tasks"} OverviewData={OverviewData}/>

        </Fragment>
    )
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