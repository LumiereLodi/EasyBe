import React, {Fragment, useEffect, useState} from 'react';
import {Drawer} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import TimelineIcon from '@material-ui/icons/Timeline';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/styles/useTheme";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import MenuIcon from "@material-ui/icons/Menu"
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import {Link} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';




import easybeLogo from "../../assets/EasyBe.png";
// import {Dashboard} from "@material-ui/icons";
import TitleBar from "../AppBar";
import Typography from "@material-ui/core/Typography";
import MainLayout from "../Layout";
import Dashboard from "../Dashboard";


function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}
const useStyles = makeStyles(theme =>({
    drawerBackground: {
        backgroundColor: theme.palette.primary.main,
        width: "12.5rem"

    },
    toolbar: theme.mixins.toolbar,

    userId: {
        marginTop: "1rem",
        height: "4rem",
        width: "100%",
        backgroundColor: "#131111",
        color: "white"

    },
    drawerItem: {
        color: "white",
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        }

    },
    menuTitle: {
        fontSize: "17px",
        color: "#878787",
        marginTop: "1rem",
        marginLeft: "auto",
        marginRight: "auto"

    },
    appBar:{
        zIndex: theme.zIndex.modal + 1
    },
    logoContainer:{
        maxWidth: "1px",
        "&:Hover": {
            backgroundColor: "Transparent"
        }
    },
    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "Transparent"
        }
    },
    drawerIcon: {
        color: "white",
        height: "50px",
        width: "50px",

    },
    drawerMargin:{
        marginBottom: "3.5em"
    },
    LogoImage:{
        height: "2.1rem",
        marginLeft: "8.5rem"

    },
    easybeLogo:{
        marginTop: "1.2rem",
        marginBottom: "0.3rem"
    },
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(10),
        paddingRight: theme.spacing(0.5),
        paddingLeft: "210px",
        [theme.breakpoints.down("md")]:{
            paddingLeft: "10px",
            paddingRight: "10px"
        }
    },
    drawerItemSelected:{
        opacity: 1
    }

}))

function AppDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);


    const [openMobileDrawer, setOpenMobileDrawer] = useState();
    const [selectedMenuItem, setSelectedMenuItem] = useState(0);


    const routes = [
        {name: "Dashboard", icon: <ListItemIcon ><DashboardIcon/></ListItemIcon>, link: "/dashboard", activeIndex: 0},
        {name: "Team", icon: <ListItemIcon><GroupIcon/></ListItemIcon>, link: "/", activeIndex: 1},
        {name: "Project", icon:<ListItemIcon><AccountTreeIcon/></ListItemIcon>, link: "/project", activeIndex: 2},
        {name: "Analytics", icon: <ListItemIcon><TimelineIcon/></ListItemIcon>, activeIndex: 3},
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
    const permanentDrawer = (
        <BrowserRouter>
        <Drawer
            variant="permanent"
            anchor="left"
            classes={{paper: classes.drawerBackground}}
            className={classes.drawerPadding}

        >
            {/*// the picture size when you change to button to be fixed later*/}
            {/*<Button component={Link} to="/" className={classes.logoContainer} disableRipple >*/}

            {/*    <img className={classes.easybeLogo} src={easybeLogo} alt="easybe logo"/>*/}
            {/*</Button>*/}
            <img className={classes.easybeLogo} src={easybeLogo} alt="easybe logo"/>

            <div className={classes.userId} >
                <Grid container style={{height: "100%"}}>
                        <Grid item >
                            <Grid container alignItems={"center"} style={{height: "100%"}}>
                                <Grid item>
                                    <Avatar style={{height: "1.5em", width: "1.5em", marginLeft: "0.2em", marginRight: "0.5em"}}>LL</Avatar>
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        Lumiere Lodi
                                    </Typography>
                                    <Typography style={{fontSize: "0.7em",color: "#878787"}}>
                                       SM Manager
                                    </Typography>
                                </Grid>

                            </Grid>

                        </Grid>
                        <Grid item md={3}>
                            <Grid container style={{height: "100%"}} alignItems={"center"} justify={"flex-end"}>
                                <IconButton aria-label="display more actions" edge="end" color="inherit">
                                    <MoreHorizIcon />
                                </IconButton>

                            </Grid>

                        </Grid>
                </Grid>
            </div>
            <div className={classes.menuTitle}>Menu</div>
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

        </Drawer>
        </BrowserRouter>
    )
    const mobileDrawer=(
        <Fragment>



            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                anchor="left"
                classes={{paper: classes.drawerBackground}}
                className={classes.drawer}
                open={openMobileDrawer}
                onClose={() => setOpenMobileDrawer(false)}
                onOpen={() => setOpenMobileDrawer(true)}

            >
                <div className={classes.drawerMargin}/>
                {/*<img src={easybeLogo} alt="easybe logo"/>*/}

                <div className={classes.userId} ></div>
                <div className={classes.menuTitle}>Menu</div>
                <List disablePadding>
                    {routes.map((route, index) => (
                        <Link href={route.link}>
                        <ListItem button className={classes.drawerItem} key={index} onClick={() => setSelectedMenuItem(route.activeIndex)} selected={selectedMenuItem === route.activeIndex}>
                            {route.icon}
                            <ListItemText >{route.name}</ListItemText>
                        </ListItem>
                        </Link>
                    ))}


                </List>

            </SwipeableDrawer>

            <IconButton
                className={classes.drawerIconContainer}
                onClick={() => setOpenMobileDrawer(!openMobileDrawer)}
                disableRipple

            >
                <MenuIcon className={classes.drawerIcon}/>
            </IconButton>
        </Fragment>
    )
    return (
        <div>
            <Grid container>
                <TitleBar/>
                {matches ? <ElevationScroll>
                    <AppBar position="static" className={classes.appBar} >
                        <Toolbar disableGutters>
                            <BrowserRouter>
                                <Button component={Link} to="/" className={classes.logoContainer} disableRipple >

                                    <img className={classes.LogoImage} src={easybeLogo} alt="easybe logo"/>
                                </Button>

                            </BrowserRouter>
                            {mobileDrawer}
                        </Toolbar>
                    </AppBar>
                </ElevationScroll> : permanentDrawer}
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {/*<MainLayout/>*/}
                    <Switch>
                        <Route exact path={"/"} component={()=> <div>Homes</div>}/>
                        <Route path={"/dashboard"} component={Dashboard}/>
                        <Route path={"/project"} component={MainLayout}/>
                    </Switch>
                </main>
            </Grid>


        </div>
    );
}

export default AppDrawer;