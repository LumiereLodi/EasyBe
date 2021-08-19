import React, {Fragment, useEffect, useState} from 'react';
import AppBar from "../../../AppBar"
import {Link,Redirect, Route, Switch} from "react-router-dom";
// import Dashboard from "../../../Dashboard";
// import MainLayout from "../../../Layout";
import RegisterEmployee from "./RegisterEmployee";
import AddIcon from '@material-ui/icons/Add';
// import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/styles";
// import AppDrawer from "../../../Drawer";
// import Layout from "../../../Layout"
import DepartmentList from "./DepartmentList";
import EmployeeList from "./EmployeeList";

import AddDepartment from "./AddDepartment";
import axios from "axios";
import {useAppState} from "../../../WithStore"

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
    const appState = useAppState()


    const [value, setValue] = useState(0)

    const tab = [
        {title: "Department", link: "/drawer/admin/departmentList", activeIndexes: 0},
        {title: "Employee", link: "/drawer/admin/employeeList",activeIndexes: 1}
    ]
    const addButton=(
        <div style={{marginLeft: "auto"}}>
            <IconButton component={Link} to={ window.location.pathname ==="/drawer/admin/departmentList" ? "/drawer/admin/addDepartment" : "/drawer/admin/addEmployee" }>
                <AddIcon className={classes.tab} />
            </IconButton>
        </div>
    )

    useEffect( async() => {
            try{
                const response = await axios.get("http://localhost:3001/hr/admin/department/departmentlist");


                appState.addDepartmentName(response.data.departmentList);

            }catch(error){
                alert(error.response.message)
            }

        if(window.location.pathname  === "/drawer/admin/addEmployee"){
            setValue(1)

        }


        // if (window.location.pathname === "/drawer/admin/departmentList" || window.location.pathname === "/drawer/admin/employeeList"
        //     || window.location.pathname === "/drawer/admin/addDepartment" ||  window.location.pathname=== "/drawer/admin/addEmployee"){
        //     props.setSelectedMenuItem(4);
        //
        // }
    },[appState])
    return (
        <div>

            <AppBar tab={tab} addButton={addButton} value={value} setValue={setValue} location={"admin"}/>
            <Switch>
               <Redirect exact from={"/drawer/admin"} to={"/drawer/admin/departmentList"}/>
            </Switch>
                <Switch>

                    <Route path={"/drawer/admin/registerEmployee"} component={RegisterEmployee}/>
                    <Route path={"/drawer/admin/departmentList"} component={DepartmentList}/>

                    <Route path={"/drawer/admin/employeeList"} component={EmployeeList}/>
                    <Route path={"/drawer/admin/add"} component={()=>
                        <div>
                            { value === 0 ? <AddDepartment/> : <RegisterEmployee/> }
                        </div>

                    }/>
                    <Route path={"/drawer/admin/addDepartment"} component={AddDepartment}/>
                    <Route path={"/drawer/admin/addEmployee"} component={RegisterEmployee}/>

                </Switch>



        </div>
    );
}

export default Admin;