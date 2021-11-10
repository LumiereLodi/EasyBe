import React, {Fragment, useEffect} from 'react';
import ListLayout from "../../Layout/ListLayout"
import Details from "../../Layout/Details"
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import EditIcon from "@material-ui/icons/Edit";
import List from "../List";
import UserOverview from "../UserOverview";
import ObjectInformation from "../ObjectInformation";
import {useAppState} from "../../WithStore";
import axios from "axios";
import ProjectListComponent from "../List";
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
    const appState = useAppState()

    const OverviewHeaders = [
        "Name",
        "Position",
        "Email",
        "Contract "
    ];
    const OverviewData = [
        "Lumiere",
        "Staff",
        "lumiere@gmail.com",
        "Full-time"
    ]

    const InformationHeader = [
        "Num Staff",
        "Created At",
    ];

    const InformationData = [
        appState.selectedDepartment ? appState.selectedDepartment.numberofstaff ? appState.selectedDepartment.numberofstaff : '...' : '...',
        appState.selectedDepartment ? appState.selectedDepartment.createdat ? appState.selectedDepartment.createdat : '...': '...',
    ];

    const handleDepartmentClick = async (departmentid) => {

        console.log("inside handleDepartmentClick")
        try{
            const departmentSelected = await axios.get(`/hr/departmentdetails/${departmentid}`)

            console.log(departmentSelected.data)
            appState.setSelectedDepartment(departmentSelected.data)

            const departmentStaffList = await axios.get(`/hr/alldepartmentemployeelist/${departmentid}`)
            appState.setSelectedDepartmentStaffList(departmentStaffList.data)

            props.setReload(!props.reload);

        }catch (error) {
            console.log(error)
        }

    }

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

    const search = async (wordToSearch) => {


        try{
            if(wordToSearch === ''){
                props.setReloadDrawer(!props.reloadDrawer)

            }else{
                const response = await axios.get(`/hr/admin/department/departmentlist/${wordToSearch}`);
                appState.addDepartmentName(response.data.departmentList);

                if(appState.departmentList[0]){
                    const departmentSelected = await axios.get(`/hr/departmentdetails/${appState.departmentList[0].departmentid}`)
                    appState.setSelectedDepartment(departmentSelected.data)

                    const departmentStaffList = await axios.get(`/hr/alldepartmentemployeelist/${appState.departmentList[0].departmentid}`)
                    appState.setSelectedDepartmentStaffList(departmentStaffList.data)
                }else{
                    appState.setSelectedDepartment({})
                    appState.setSelectedDepartmentStaffList([])
                }
            }

            //props.setReload(!props.reload)

        }catch(e){
            alert(e)
        }

    }

    const list = (
        <Fragment>
            <List search={"Search by name"} list={appState.departmentList} setReload={props.setReload} reload={props.reload} handleClick={handleDepartmentClick} wordToSearch={search}/>

        </Fragment>
    )

    useEffect(()=>{
            appState.setSelectedDepartment(appState.departmentList[0]);
            //console.log(appState.departmentList)
            console.log(appState.selectedDepartment ? appState.selectedDepartment.name : undefined)

    }, [])
    const details = useObserver(()=>(
        <Fragment>
            <ListSubheader disableGutters style={{paddingBottom: "0.5em"}}>
                <Grid container justify={"center"} style={{marginBottom: "2em", marginTop: "1em"}}>
                    <Grid item>
                        <Typography variant={"h1"} style={{fontSize: "2em"}}>
                            {appState.selectedDepartment ? appState.selectedDepartment.name ? appState.selectedDepartment.name : <span>...</span> : <span>...</span>}
                        </Typography>
                    </Grid>
                </Grid>
            </ListSubheader>

            <ObjectInformation InformationHeader={InformationHeader} InformationData={InformationData} title={"Department Information"} editButton={editButton}/>

            {/*<UserOverview OverviewHeaders={OverviewHeaders} title={"Staff Members"} OverviewData={OverviewData}/>*/}

            <div>
                <Grid item container>
                    <Typography variant={"h1"} style={{fontWeight: "bold" , marginTop: "2em"}} >
                        {props.title}
                    </Typography>
                </Grid>
                <Grid container className={classes.customerProjectContainer} style={{marginTop: "2em", marginBottom: "1em"}}>
                    <Grid container  sm={12} direction={"column"}>
                        <ListSubheader disableGutters>
                            <Grid item container style={{marginTop: "1.5em", marginBottom: "1em"}}>

                                {OverviewHeaders.map((headers, index) => (
                                    <Grid item container xs justify={"center"} >
                                        <Typography style={{fontWeight: "bold", color: "black"}} key={index}>
                                            {headers}
                                        </Typography>

                                    </Grid>
                                ))}


                            </Grid>
                        </ListSubheader>



                            {appState.selectedDepartmentStaffList ? appState.selectedDepartmentStaffList.map((staff, index) => (
                                <Grid item container style={{marginBottom: "1em"}}>
                                    <Grid item container xs justify={"center"} alignItems={"center"} key={index}>
                                        <Typography >
                                            {staff.lastname ? staff.lastname : <span>...</span>}
                                        </Typography>

                                    </Grid>
                                    <Grid item container xs justify={"center"} alignItems={"center"} key={index}>
                                        <Typography >
                                        {staff.position ? staff.position : <span>...</span>}
                                        </Typography>

                                    </Grid>
                                    <Grid item container xs justify={"center"} alignItems={"center"} key={index}>
                                        <Typography >
                                        {staff.email ? staff.email : <span>...</span>}
                                        </Typography>

                                    </Grid>
                                    <Grid item container xs justify={"center"} alignItems={"center"} key={index}>
                                        <Typography >
                                        {staff.contract ? staff.contract : <span>...</span>}
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

export default DepartmentList;