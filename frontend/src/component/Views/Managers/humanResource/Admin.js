import React, {Fragment, useEffect, useState} from 'react';
import AppBar from "../../../AppBar"
import {Link, Redirect, Route, Switch} from "react-router-dom";
import RegisterEmployee from "./RegisterEmployee";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/styles";
import DepartmentList from "./DepartmentList";
import EmployeeList from "./EmployeeList";
import Dialog from "@material-ui/core/Dialog";

import AddDepartment from "./AddDepartment";
import axios from "axios";
import {useAppState} from "../../../WithStore"
import hrProject from "./Project";

const useStyles = makeStyles(theme => ({

    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "Transparent"
        }
    },
    tab: {
        ...theme.typography.tab,
        opacity: 1
    },
    dialogContainer:{
        "& .MuiDialog-paper": {
            width: "70em",
            backgroundColor: theme.palette.secondary.main,
            padding: "1em",
            height: "39em",
            marginLeft: "1em",
            marginRight: "0.3em",
            // border: "2px solid",
            // borderColor: "rgba(35,37,38,0.25)",
            [theme.breakpoints.down("sm")]: {
                marginTop: "2em",
                marginLeft: 0
            },
            [theme.breakpoints.down("xs")]: {
                marginTop: "0.5em",
                marginLeft: 0,
                marginBottom: "1em"
            },
            overflow: "auto",
            paddingLeft: "1em",
            paddingRight: "1em",
            borderRadius: "0.5em",
        },

    }


}))

function Admin(props) {
    const classes = useStyles();
    const appState = useAppState()


    const [value, setValue] = useState(0)
    const [openDepartmentDialog, setOpenDepartmentDialog] = useState(false);
    const [openEmployeeDialog, setOpenEmployeeDialog] = useState(false);

    const handlePlusButton = ()=> {
        if(window.location.pathname === "/drawer/admin/departmentList"){
            setOpenDepartmentDialog(true)
        }
        else{
            setOpenEmployeeDialog(true)
        }
    }
    const tab = [
        {title: "Department", link: "/drawer/admin/departmentList", activeIndexes: 0},
        {title: "Employee", link: "/drawer/admin/employeeList", activeIndexes: 1}
    ]
    const addButton = (
        <div style={{marginLeft: "auto"}}>
            {/*<IconButton component={Link}*/}
            {/*            to={window.location.pathname === "/drawer/admin/departmentList" ? "/drawer/admin/addDepartment" : "/drawer/admin/addEmployee"}>*/}
            {/*    <AddIcon className={classes.tab}/>*/}
            {/*</IconButton>*/}
            <IconButton
                        onClick={()=> handlePlusButton()}
            >
                <AddIcon className={classes.tab}/>
            </IconButton>
        </div>
    )

    const AddDepartmentDialog = (
            <Fragment>
                <Dialog
                     open={openDepartmentDialog}
                     onClose={()=> setOpenDepartmentDialog(false)}
                     className={classes.dialogContainer}
                     fullWidth={true}
                     maxWidth={"xs"}
                     style={{height: "30em"}}
                     >

                    <AddDepartment/>
                </Dialog>
             </Fragment>
    )
    const AddEmployeeDialog = (
        <Fragment>
            <Dialog
                open={openEmployeeDialog}
                onClose={()=> setOpenEmployeeDialog(false)}
                className={classes.dialogContainer}
                fullWidth={true}
                maxWidth={"sm"}
            >
            <RegisterEmployee/>

            </Dialog>
        </Fragment>

    )
    useEffect(async () => {
        try {
            const response = await axios.get("/hr/admin/department/departmentlist");


            appState.addDepartmentName(response.data.departmentList);

        } catch (error) {
            alert(error.response.message)
        }

        if (window.location.pathname === "/drawer/admin/addEmployee") {
            setValue(1)

        }


    }, [])
    return (


        <div>
            {/**this is not the best way to do this operation**/}

            {window.location.pathname === "/drawer/admin/hrProject" ? <AppBar title={"Project"} link={"/drawer/admin/hrProject"}/>
                : <AppBar tab={tab} addButton={addButton} value={value} setValue={setValue} location={"admin"}/> }

            <Switch>
                <Redirect exact from={"/drawer/admin"} to={"/drawer/admin/departmentList"}/>
            </Switch>

            {AddEmployeeDialog}
            {AddDepartmentDialog}
            <Switch>

                <Route path={"/drawer/admin/registerEmployee"} component={RegisterEmployee}/>
                <Route path={"/drawer/admin/departmentList"} render={()=><DepartmentList setOpenDepartmentDialog={setOpenDepartmentDialog}/>}/>

                <Route path={"/drawer/admin/employeeList"} render={()=><EmployeeList setOpenEmployeeDialog={setOpenEmployeeDialog}/>}/>
                {/*<Route path={"/drawer/admin/add"} component={() =>*/}
                {/*    <div>*/}
                {/*        {value === 0 ? <AddDepartment/> : <RegisterEmployee/>}*/}
                {/*    </div>*/}

                {/*}/>*/}
                {/*<Route path={"/drawer/admin/add"} component={() =>*/}
                {/*    <div>*/}
                {/*        {value === 0 ? <AddDepartment/> : AddEmployeeDialog}*/}
                {/*    </div>*/}

                {/*}/>*/}
                <Route path={"/drawer/admin/addDepartment"} component={AddDepartment}/>
                <Route path={"/drawer/admin/addEmployee"} component={RegisterEmployee}/>
                <Route path={"/drawer/admin/hrProject"} component={hrProject}/>

            </Switch>


        </div>
    );
}

export default Admin;