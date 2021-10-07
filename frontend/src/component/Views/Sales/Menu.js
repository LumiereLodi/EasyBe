import React, {useEffect, useState} from 'react';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import TimelineIcon from "@material-ui/icons/Timeline";
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

import Drawer from "../../Drawer";
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/styles";
import {useAppState} from "../../WithStore";
import {useObserver} from "mobx-react"

const useStyles = makeStyles(theme => ({

    drawerItem: {
        color: "white",
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        }

    },
    drawerItemSelected: {
        opacity: 1
    }

}))

function Menu(props) {
    const classes = useStyles()
    const appState = useAppState()
    const [selectedMenuItem, setSelectedMenuItem] = useState(0);

    const test = 1;
    let routes = [
        {
            name: "Dashboard",
            icon: <ListItemIcon><DashboardIcon/></ListItemIcon>,
            link: "/drawer/dashboard",
            activeIndex: 0
        }

    ]

    if(appState.userInfo.position === "Manager"){
        routes = [
            ...routes,
            {
                name: "Project",
                icon: <ListItemIcon><AccountTreeIcon/></ListItemIcon>,
                link: "/drawer/project",
                activeIndex: 1
            }
        ]
    }
    else{
        routes = [
            ...routes,
            {
                name: "Task",
                icon: <ListItemIcon><AccountTreeIcon/></ListItemIcon>,
                link: "/drawer/project",
                activeIndex: 1
            }
        ]
    }
    if(appState.userInfo.position === "Manager" && appState.userInfo.departmentid === '2002'){
        routes = [
            ...routes,
            {
                name: "Customer",
                icon: <ListItemIcon><BusinessCenterIcon/></ListItemIcon>,
                link: "/drawer/client",
                activeIndex: 2
            },
        ]
    }
    useEffect(() => {



        console.log(routes);

        [...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (route.activeIndex !== selectedMenuItem) {
                        setSelectedMenuItem(route.activeIndex);
                    }
            }
        })
        if (window.location.pathname === "/drawer/client/clientlist" || window.location.pathname === "/drawer/client/addclient") {
            setSelectedMenuItem(2);

        }
        if (window.location.pathname === "/drawer/project/projectlist" || window.location.pathname === "/drawer/project/addproject") {
            setSelectedMenuItem(1);

        }
    }, [selectedMenuItem]);
    return (
        <div>
            <List disablePadding>
                {routes.map((route, index) => (

                    <ListItem button
                              className={selectedMenuItem === route.activeIndex ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}
                              key={index}
                              onClick={(e) => {
                                  setSelectedMenuItem(route.activeIndex);
                                  props.setOpenMobileDrawer(false)
                              }}
                              selected={route.activeIndex === selectedMenuItem}
                              component={Link}
                              to={route.link}
                    >
                        {route.icon}
                        <ListItemText>{route.name}</ListItemText>

                    </ListItem>

                ))}

            </List>
        </div>
    );
}

export default Menu;