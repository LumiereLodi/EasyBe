import React,{Fragment} from 'react';
import ListLayout from "../../Layout/ListLayout"
import Details from "../../Layout/Details"
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import EditIcon from "@material-ui/icons/Edit";
import ProjectList from "../ProjectList";

import ObjectInformation from "../ObjectInformation";
import UserOverview from "../UserOverview";

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
        "IT",
        "Staff",
        "0820435516",
        "Email",
        "Data Of Birth",
        "Address",
        "Contract",
        "Created At",
        "Created By"
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
    const list = (
        <Fragment>
            <ProjectList search={"Search by name"}/>

        </Fragment>
    )

    const details = (
        <Fragment>
            <ListSubheader disableGutters style={{paddingBottom: "0.5em"}}>
                <Grid container justify={"center"} style={{marginBottom: "2em", marginTop: "1em"}}>
                    <Grid item>
                        <Typography variant={"h1"} style={{fontSize: "2em"}}>
                            Employee Name
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item style={{marginBottom: "1.5em", marginTop: "2em"}}>
                    <Grid container>
                        <Grid item container direction={"column"} xs alignItems={"flex-end"} >
                            <Typography style={{fontSize: "3em", color: "black"}}>
                                739
                            </Typography>
                            <Typography style={{fontSize: "1em", color: "black"}}>
                                Completed On Time
                            </Typography>
                        </Grid>
                        <Grid item container direction={"column"} alignItems={"center"} xs >
                            <Typography style={{fontSize: "3em", color: "black"}}>
                                132
                            </Typography>
                            <Typography style={{fontSize: "1em",color: "black"}}>
                                Completed After Deadline
                            </Typography>
                        </Grid>
                        <Grid item container direction={"column"} xs >
                            <Typography style={{fontSize: "3em", color: "black"}}>
                                165
                            </Typography>
                            <Typography style={{fontSize: "1em",color: "black"}}>
                                Tasks In Progress
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
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