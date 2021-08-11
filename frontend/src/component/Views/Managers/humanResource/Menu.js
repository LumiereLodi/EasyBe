import React, {useEffect, useState} from 'react';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import TimelineIcon from "@material-ui/icons/Timeline";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SettingsIcon from '@material-ui/icons/Settings';

import {Link} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/styles";

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

    const [selectedMenuItem, setSelectedMenuItem] = useState(0);

    const routes = [
        {name: "Dashboard", icon: <ListItemIcon ><DashboardIcon/></ListItemIcon>, link: "/dashboard", activeIndex: 0},
        {name: "Department", icon: <ListItemIcon><TimelineIcon/></ListItemIcon>, link: "/", activeIndex: 1},
        {name: "Employee", icon:<ListItemIcon><PeopleAltIcon/></ListItemIcon>, link: "/project", activeIndex: 2},
        {name: "Projects", icon:<ListItemIcon><AccountTreeIcon/></ListItemIcon>, link: "/client", activeIndex: 2},
        {name: "Admin", icon: <ListItemIcon><SettingsIcon/></ListItemIcon>, activeIndex: 3},

    ]
    useEffect(()=> {

        [...routes].forEach(route => {
            switch(window.location.pathname){
                case `${route.link}`:
                    if(route.activeIndex !== selectedMenuItem){
                        setSelectedMenuItem(route.activeIndex);
                    }
            }
        })

    },[selectedMenuItem]);
    return (
        <div>
            <List disablePadding>
                {routes.map((route, index) => (
                    <Link href={route.link}>
                        <ListItem button
                                  className={selectedMenuItem === route.activeIndex ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}
                                  key={index}
                                  onClick={(e) => { setSelectedMenuItem(route.activeIndex)}}
                                  selected={route.activeIndex===selectedMenuItem}>
                            {route.icon}
                            <ListItemText >{route.name}</ListItemText>
                        </ListItem>
                    </Link>

                ))}

            </List>
        </div>
    );
}

export default Menu;