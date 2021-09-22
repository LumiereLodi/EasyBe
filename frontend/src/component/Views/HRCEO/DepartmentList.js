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
import UserOverview from "../UserOverview";
import ObjectInformation from "../ObjectInformation";
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
        height: "13em",

    },
    customerProjectContainer: {
        backgroundColor: "#FFF8DD",
        borderRadius: "0.3em",
        height: "25em",
        overflow: "auto"
    }


}))


function DepartmentList(props) {

    const classes = useStyles()

    const OverviewHeaders = [
        "Name",
        "Position",
        "Email",
        "Contract ",
        "Status"
    ];
    const OverviewData = [
        "Lumiere",
        "Staff",
        "lumiere@gmail.com",
        "Full-time",
        "Active"
    ]

    const InformationHeader = [
        "Manager",
        "Num Staff",
        "Created At",
    ];

    const InformationData = [
        "Lumiere Mondo",
        "7",
        "19/09/2021"
    ];

    const editButton = (
        <Fragment>
            <Grid item>
                <IconButton
                    onClick={()=> props.setOpenDepartmentDialog(true)}
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
                            Department Name
                        </Typography>
                    </Grid>
                </Grid>
            </ListSubheader>

            <ObjectInformation InformationHeader={InformationHeader} InformationData={InformationData} title={"Department Information"} editButton={editButton}/>

            <UserOverview OverviewHeaders={OverviewHeaders} title={"Staff Members"} OverviewData={OverviewData}/>


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

export default DepartmentList;