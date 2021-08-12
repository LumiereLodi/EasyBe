import React, {Fragment, useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import {Hidden} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
// import {Link} from "@material-ui/core";
import {Link} from "react-router-dom"

const marginLeft = 100;
const drawerWidth = 13.5;

const useStyles = makeStyles(theme => ({

    appBar: {
        width: `calc(100% - ${drawerWidth}em)`,
        marginLeft: marginLeft,
        marginRight: "0.5em",
        marginTop: "0.9em",
        marginBottom: "1em",
        height: "7em"
    },
    title:{
        fontWeight: "bold"
    },
    backgroundStyle: {
        boxShadow: "none"
    },
    tab:{
        ...theme.typography.tab,
        "&:hover":{
            opacity: 1,
        },


    }
}))
function Try(props) {
    const classes = useStyles()
   // const [value, setValue] = useState(0)

    const handleChange=(e, newValue)=>{
        props.setValue(newValue)
    }

    useEffect(()=>{
       [...props.tab].forEach(route =>{
           switch (window.location.pathname) {
               case `${route.link}` :
                   if (props.value !== route.activeIndexes) {
                       props.setValue(route.activeIndexes)
                   }
           }
       })
    })
    return (
        <Fragment>
            <Hidden mdDown>
                <AppBar position="fixed" className={classes.appBar} color="secondary" classes={{root: classes.backgroundStyle}}>
                    <Grid container style={{height: "100%"}} alignItems={"center"}>
                        <Grid item style={{width: "100%"}}>
                            <Toolbar>
                                <Tabs
                                    value={props.value}
                                    onChange={handleChange}
                                    indicatorColor="secondary"

                                >
                                    {props.tab.map((tab, index) => (

                                            <Tab
                                                key={index}
                                                className={classes.tab}
                                                label={tab.title}
                                                component={Link}
                                                to={tab.link}
                                            />


                                    ))}
                                    {/*<Tab label="zero"/>*/}
                                    {/*<Tab label="one"/>*/}
                                    {/*<Tab label="two"/>*/}

                                </Tabs>
                                {props.addButton}
                            </Toolbar>
                        </Grid>
                    </Grid>

                </AppBar>
            </Hidden>

        </Fragment>
    );
}

export default Try;