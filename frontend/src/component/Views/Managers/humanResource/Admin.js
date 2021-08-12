import React, {Fragment, useEffect, useState} from 'react';
import AppBar from "../../../AppBar"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from "../../../Dashboard";
import MainLayout from "../../../Layout";
import RegisterEmployee from "./RegisterEmployee";
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/styles";
import AppDrawer from "../../../Drawer";
import Layout from "../../../Layout"
import DepartmentList from "./DepartmentList";
import EmployeeList from "./EmployeeList";
import {Link} from "react-router-dom"
import AddDepartment from "./AddDepartment";

const useStyles = makeStyles(theme =>({

    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "Transparent"
        }
    },
    tab:{
        ...theme.typography.tab,
        opacity: 1
    }

}))

function Admin(props) {
    const classes = useStyles();

    const [value, setValue] = useState(0)

    const tab = [
        {title: "Department", link: "/admin/departmentList", activeIndexes: 0},
        {title: "Employee", link: "/admin/employeeList",activeIndexes: 1}
    ]
    const addButton=(
        <div style={{marginLeft: "auto"}}>
            <IconButton component={Link} to="/admin/add">
                <AddIcon className={classes.tab} />
            </IconButton>
        </div>
    )

    useEffect(() => {
        if(window.location.pathname === '/admin'){
            window.location.pathname = "/admin/departmentList";
            props.setSelectedMenuItem(4);
        }
    })
    return (
        <div>

            <AppBar tab={tab} addButton={addButton} value={value} setValue={setValue}/>

                <Switch>

                    <Route path={"/admin/registerEmployee"} component={RegisterEmployee}/>
                    <Route path={"/admin/departmentList"} component={DepartmentList}/>
                    <Route path={"/admin/employeeList"} component={EmployeeList}/>
                    <Route path={"/admin/add"} component={()=>
                        <div>
                            { value === 0 ? <AddDepartment/> : <RegisterEmployee/> }
                        </div>

                    }/>
                </Switch>



        </div>
    );
}

export default Admin;