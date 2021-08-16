import React, {useEffect, useState, Fragment} from 'react';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import TimelineIcon from "@material-ui/icons/Timeline";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SettingsIcon from '@material-ui/icons/Settings';
//import {Link} from "@material-ui/core";
import {Link} from "react-router-dom"
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/styles";
// import axios from "axios";
import {useAppState} from "../../../WithStore"
import Tab from "@material-ui/core/Tab";


const useStyles = makeStyles(theme =>({

    drawerItem: {
        color: "white",
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        }

    },
    drawerItemSelected:{
        opacity: 1
    }

}))

function Menu(props) {
    const classes = useStyles()
    const appState = useAppState()


    // const [selectedMenuItem, setSelectedMenuItem] = useState(0);

    const routes = [
        {name: "Dashboard", icon: <ListItemIcon ><DashboardIcon/></ListItemIcon>, link: "/drawer/dashboard", activeIndex: 0},
        {name: "Department", icon: <ListItemIcon><TimelineIcon/></ListItemIcon>, link: "/drawer/yes", activeIndex: 1},
        {name: "Employee", icon:<ListItemIcon><PeopleAltIcon/></ListItemIcon>, link: "/drawer/employee", activeIndex: 2},
        {name: "Projects", icon:<ListItemIcon><AccountTreeIcon/></ListItemIcon>, link: "/drawer/yesy", activeIndex: 3},
        {name: "Admin", icon: <ListItemIcon><SettingsIcon/></ListItemIcon>,link: "/drawer/admin", activeIndex: 4},

    ]
    useEffect( ()=> {

        [...routes].forEach(route => {
            switch(window.location.pathname){
                case `${route.link}`:
                    if(route.activeIndex !== props.selectedMenuItem){
                        props.setSelectedMenuItem(route.activeIndex);
                    }
            }
        })

        if (window.location.pathname === "/drawer/admin/departmentList" || window.location.pathname === "/drawer/admin/employeeList"
            || window.location.pathname === "/drawer/admin/addDepartment" ||  window.location.pathname=== "/drawer/admin/addEmployee"){
            props.setSelectedMenuItem(4);

        }
        // if(window.location.pathname === "/drawer/dashboard" ){
        //     window.location.pathname = "/drawer/dashboard";
        //     props.setSelectedMenuItem(0);
        // }
        //  if(window.location.pathname === "/drawer/yes"){
        //     window.location.pathname = "/drawer/yes";
        //     props.setSelectedMenuItem(1);
        // }
        // else if(window.location.pathname === "/drawer/employee"){
        //     window.location.pathname = "/drawer/employee"
        //     props.setSelectedMenuItem(2);
        // }
        // else if(window.location.pathname === "/drawer/yesy"){
        //     window.location.pathname = "/drawer/yesy";
        //     props.setSelectedMenuItem(3);
        // }
        // else if(window.location.pathname === "/drawer/admin"){
        //     window.location.pathname = "/drawer/admin";
        //     props.setSelectedMenuItem(4);
        // }





    },[props.selectedMenuItem]);
    return (
        <Fragment>
            <List disablePadding>
                {routes.map((route, index) => (

                        <ListItem button
                                  className={props.selectedMenuItem === route.activeIndex ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}
                                  key={index}
                                  component={Link}
                                  to={route.link}
                                  onClick={(e) => { props.setSelectedMenuItem(route.activeIndex)}}
                                  selected={route.activeIndex===props.selectedMenuItem}>
                            {route.icon}
                            <ListItemText >{route.name}</ListItemText>
                        </ListItem>


                ))}

            </List>
        </Fragment>
    );
}

export default Menu;