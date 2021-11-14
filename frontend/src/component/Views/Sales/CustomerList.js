import React, {Fragment, useState} from 'react';
import ListLayout from "../../Layout/ListLayout";
import Details from "../../Layout/Details";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import EditIcon from "@material-ui/icons/Edit";
import ListComponent from "../List";
import {useAppState} from "../../WithStore";
import {useObserver} from "mobx-react"
import axios from "axios";

const useStyles = makeStyles(theme => ({

    searchContainer: {
        paddingLeft: "1em",
        paddingRight: "1em"
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
            color: "black",
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
        height: "17em",

    },
    customerProjectContainer: {
        backgroundColor: "#FFF8DD",
        borderRadius: "0.3em",
        height: "25em",
        overflow: "auto"
    }
}))


function CustomerList(props) {
    const classes = useStyles()
    const [reload, setReload] = useState(false)
    const appState = useAppState()

    const handleCustomerClick = async (customerid) => {
        try {
            const customer = await axios.get(`/sales/customer/${customerid}`);
            appState.setSelectedCustomer(customer.data)
            console.log(customer.data)

            const customerProject = await axios.get(`/sales/customerproject/${appState.selectedCustomer.customerid}`)

            console.log(customerProject.data)
            appState.setSelectedCustomerProjects(customerProject.data)
        } catch (error) {
            console.log(error)
        }
    }

    const search = async (wordToSearch) => {
        if (wordToSearch === '') {
            props.setReloadDrawer(!props.reloadDrawer)
        } else {
            if (appState.userInfo.departmentid === '2002' && appState.userInfo.position === 'Manager') {

                console.log("came here")
                const response = await axios.get(`/Sales/customerlist/${wordToSearch}`)
                console.log(response.data)
                appState.setCustomerList(response.data)

                if (appState.customerList[0]) {
                    const defaultcustomer = await axios.get(`/sales/customer/${appState.customerList[0].customerid}`);
                    appState.setSelectedCustomer(defaultcustomer.data);
                    console.log(defaultcustomer.data);
                } else {
                    appState.setSelectedCustomer([]);
                }

            }
        }

    }
    const list = (
        <ListComponent search={"Search by name"} filter={"Filter"} list={appState.customerList} setReload={setReload}
                       reload={reload} handleClick={handleCustomerClick} wordToSearch={search}/>
    )

    const handleEditButton = ()=> {
        appState.setEditSelectedCustomer(appState.selectedCustomer);

        console.log(appState.editSelectedCustomer)
    }
    const details = useObserver(() => (
        <Fragment>
            <ListSubheader disableGutters style={{paddingBottom: "0.5em"}}>
                <Grid container justify={"center"} style={{marginBottom: "2em", marginTop: "1em"}}>
                    <Grid item>
                        <Typography variant={"h1"} style={{fontSize: "2em"}}>
                            {appState.selectedCustomer.name ? appState.selectedCustomer.name.toUpperCase() :
                                <span>...</span>}

                        </Typography>
                    </Grid>
                </Grid>
            </ListSubheader>

            <Grid container justifyContent={"center"} className={classes.customerInfoContainer}>
                <Grid item container direction={"column"}>
                    <Grid item container>
                        <Grid item xs style={{marginTop: "1em", marginLeft: "2em"}}>
                            <Typography variant={"h1"}>
                                Customer Information
                            </Typography>
                        </Grid>
                        <Grid item xs style={{marginTop: "1em", marginRight: "2em"}}>
                            <Grid container justifyContent={"flex-end"}>
                                <Grid item>
                                    <IconButton
                                        onClick={() => {
                                            props.setOpenDialog(true);
                                            handleEditButton()
                                        }}

                                    >
                                        <EditIcon fontSize="small" htmlColor={"black"}/>
                                    </IconButton>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container>
                        <Grid item>
                            <Grid container direction={"column"}>
                                <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                    <Typography>
                                        Contact Person:
                                    </Typography>
                                </Grid>
                                <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                    <Typography>
                                        Email:
                                    </Typography>
                                </Grid>
                                <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                    <Typography>
                                        Phone Number:
                                    </Typography>
                                </Grid>
                                <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                    <Typography>
                                        Address:
                                    </Typography>
                                </Grid>
                                <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                    <Typography>
                                        Postal Code:
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item style={{marginLeft: "4em"}}>
                            <Grid container direction={"column"}>
                                <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                    <Typography>
                                        {appState.selectedCustomer.contactpersonname ? appState.selectedCustomer.contactpersonname :
                                            <span>...</span>}
                                    </Typography>
                                </Grid>
                                <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                    <Typography>
                                        {appState.selectedCustomer.email ? appState.selectedCustomer.email :
                                            <span>...</span>}
                                    </Typography>
                                </Grid>
                                <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                    <Typography>
                                        {appState.selectedCustomer.phone ? appState.selectedCustomer.phone :
                                            <span>...</span>}
                                    </Typography>
                                </Grid>
                                <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                    <Typography>
                                        {appState.selectedCustomer.address ? appState.selectedCustomer.address :
                                            <span>...</span>}
                                    </Typography>
                                </Grid>
                                <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                    <Typography>
                                        {appState.selectedCustomer.postalcode ? appState.selectedCustomer.postalcode :
                                            <span>...</span>}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item container>
                <Typography variant={"h1"} style={{fontWeight: "bold", marginTop: "2em"}}>
                    Customer Projects
                </Typography>
            </Grid>
            <Grid container className={classes.customerProjectContainer}
                  style={{marginTop: "2em", marginBottom: "1em"}}>
                <Grid container sm={12} direction={"column"}>

                    <ListSubheader disableGutters style={{zIndex: "0"}}>
                        <Grid item container style={{marginTop: "1.5em"}}>

                            <Grid item container xs justify={"center"}>
                                <Typography style={{fontWeight: "bold"}}>
                                    Project Name
                                </Typography>

                            </Grid>
                            <Grid item container xs justify={"center"}>
                                <Typography style={{fontWeight: "bold"}}>
                                    Sales Person
                                </Typography>
                            </Grid>
                            <Grid item container xs justify={"center"}>
                                <Typography style={{fontWeight: "bold"}}>
                                    Start Date
                                </Typography>
                            </Grid>
                            <Grid item container xs justify={"center"}>
                                <Typography style={{fontWeight: "bold"}}>
                                    End Date
                                </Typography>
                            </Grid>
                            <Grid item container xs justify={"center"}>
                                <Typography style={{fontWeight: "bold"}}>
                                    Status
                                </Typography>
                            </Grid>

                        </Grid>
                    </ListSubheader>

                    {appState.selectedCustomerProjects.length ? appState.selectedCustomerProjects.map((value, index) => (
                        <Grid item container style={{marginBottom: "1em"}}>

                            <Grid item container xs justify={"center"} alignItems={"center"}>
                                <Typography>
                                    {value.name && value.name.length < 20 ? value.name : value.name ?
                                        <span>{value.name.substring(0, 20)}...</span> : <span>...</span>}
                                </Typography>

                            </Grid>
                            <Grid item container xs justify={"center"} alignItems={"center"}>
                                <Typography>
                                    {value.lastname && value.lastname.length < 20 ? value.lastname : value.lastname ?
                                        <span>{value.lastname.substring(0, 20)}...</span> : <span>...</span>}

                                </Typography>
                            </Grid>
                            <Grid item container xs justify={"center"} alignItems={"center"}>
                                <Typography>
                                    {value.formatedstartdate}
                                </Typography>
                            </Grid>
                            <Grid item container xs justify={"center"} alignItems={"center"}>
                                <Typography>
                                    {value.formatedenddate}
                                </Typography>
                            </Grid>
                            <Grid item container xs justify={"center"} alignItems={"center"}>
                                <Typography>
                                    {value.status === '0' ? "TO DO" : value.status === '1' ? "DOING" : value.status === '2' ? "DONE" :
                                        <span>...</span>}
                                </Typography>
                            </Grid>

                        </Grid>
                    )) : undefined}

                </Grid>
            </Grid>

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
export default CustomerList;
