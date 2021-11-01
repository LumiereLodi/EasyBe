import React, {Fragment, useEffect, useState} from 'react';
import {Drawer} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/styles/useTheme";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory} from "react-router-dom"
import MenuIcon from "@material-ui/icons/Menu"
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import {Link} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


import easybeLogo from "../../assets/EasyBe.png";
import Typography from "@material-ui/core/Typography";
import Dashboard from "../Dashboard";

/**MENU**/
import ITRIMenu from "../Views/ITRI/Menu"
import SalesMenu from "../Views/Sales/Menu"
import HRCEOMenu from "../Views/HRCEO/Menu"
import Admin from "../Views/HRCEO/Admin";
import Customer from "../Views/Sales/Customer"
import Project from "../Views/Sales/Project";
import Main from "../Views/ITRI/Main";
/**APP STATE**/
import {useObserver} from "mobx-react"
import {useAppState} from "../WithStore"
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";


const marginLeft = 100;
const drawerWidth = 13.5;

function ElevationScroll(props) {
    const {children} = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 1000
    });

    return React.cloneElement(children, {
        elevation: trigger ? 1 : 0,
    })
}

const useStyles = makeStyles(theme => ({
    drawerBackground: {
        backgroundColor: theme.palette.primary.main,
        width: "12.5rem"

    },
    toolbar: {
        [theme.breakpoints.up("md")]: {
            ...theme.mixins.toolbar,
        }
    },

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
    appBarTab: {
        zIndex: theme.zIndex.modal + 1,
        position: "fixed"
    },
    logoContainer: {
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
    drawerMargin: {
        marginBottom: "3.5em"
    },
    LogoImage: {
        height: "2.1rem",
        marginLeft: "8.5rem"

    },
    easybeLogo: {
        marginTop: "1.2rem",
        marginBottom: "0.3rem"
    },
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(10),
        paddingRight: theme.spacing(0.5),
        paddingLeft: "210px",
        [theme.breakpoints.down("md")]: {
            paddingLeft: "10px",
            paddingRight: "10px"
        },
        [theme.breakpoints.down("xs")]: {
            paddingLeft: "5px",
            paddingRight: "5px"
        }


    },
    drawerItemSelected: {
        opacity: 1
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}em)`,
        marginLeft: marginLeft,
        marginRight: "0.5em",
        marginTop: "0.9em",
        marginBottom: "1em",
        height: "7em"
    },
    title: {
        fontWeight: "bold"
    },
    backgroundStyle: {
        boxShadow: "none"
    },
    tab: {
        ...theme.typography.tab,
        "&:hover": {
            opacity: 1,
        },


    },
    menu: {
        borderRadius: 0
    },
    snackbar: {

        //backgroundColor: "red",
        "& .MuiSnackbarContent-root": {
            backgroundColor: "#6ed00c"
        }

    }

}))

function AppDrawer(props) {

    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const appState = useAppState()
    let history = useHistory()


    const [openMobileDrawer, setOpenMobileDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);

    // const [selectedMenuItem, setSelectedMenuItem] = useState(0);
    const [selectedMenuItem, setSelectedMenuItem] = useState(0);
    const [value, setValue] = useState()
    const [department, setDepartment] = useState('')
    const [position, setPosition] = useState('')
    const [reloadDrawer, setReloadDrawer] = useState(false);
    const [initial, setInitial] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const handleChange = (e, newValue) => {
        setValue(newValue)
    }
    const handleClick = (e) => {

        setAnchorEl(e.currentTarget);
        setOpenMenu(true);

    };
    const handleClose = (e) => {
        setAnchorEl(null);
        setOpenMenu(false);
    };

    const logout = async () => {

        try {
            await axios.get("/user/logout", {
                withCredentials: true
            }).then();
        } catch (err) {
            alert(err)
        }
        setReloadDrawer(!reloadDrawer)

    }


    useEffect(() => {
        async function fetchData() {


            /****AUTHENTICATE******/
            try {
                const result = await axios.get("/authenticate", {
                    withCredentials: true
                })
                if (!result.data.authenticated) {
                    history.replace('/')
                } else {
                    const response = await axios.get(`/user/userinformation/${result.data.employeeid}`)
                    appState.setUserInfo(response.data.user)
                    setDepartment(result.data.departmentid)
                    setPosition(result.data.position)
                    setInitial(result.data.givennames)

                    if(appState.loggedIn){
                        setOpenSnackbar(false)
                        //appState.setLoggedIn(false)
                    }else {
                        setOpenSnackbar(true)
                        appState.setLoggedIn(true)
                    }

                }

                /*** PROJECT LIST ***/

                if(appState.userInfo.position === 'Manager'){

                    if(appState.userInfo.departmentid === '2002' ||
                        appState.userInfo.departmentid === '2003' ||
                        appState.userInfo.departmentid === '2004') {
                        const projectlistAll = await axios.get(`/project/projectlist`);
                        console.log(projectlistAll);
                        appState.setProjectListAll(projectlistAll.data);
                    }
                    else if(appState.userInfo.departmentid === '2000' || appState.userInfo.departmentid === '2001'){
                        const projectlistAll = await axios.get(`/project/sentProject`);
                        console.log(projectlistAll);
                        appState.setProjectListAll(projectlistAll.data);
                    }
                    /********GET DEFAULT VALUES FOR PROJECT********/
                    const defaultproject = await axios.get(`/project/projectlist/${appState.leftList[0].projectid}`);
                    console.log(defaultproject.data.project);
                    appState.setSelectedProject(defaultproject.data.project[0]);
                    appState.setCompletedTask(defaultproject.data.completedTask[0].taskcompleted)
                    appState.setActiveTask(defaultproject.data.activeTask[0].taskactive)

                }else if(appState.userInfo.position === 'Staff'){
                    if(appState.userInfo.departmentid === '2002'){
                        const projectlistAll = await axios.get(`/project/projectstafflist/staff/${appState.userInfo.employeeid}`);
                        console.log(projectlistAll);
                        appState.setProjectListAll(projectlistAll.data);

                        /********GET DEFAULT VALUES FOR PROJECT********/

                        const defaultproject = await axios.get(`/project/projectlist/${appState.leftList[0].projectid}`);
                        console.log(defaultproject.data.project);
                        appState.setSelectedProject(defaultproject.data.project[0]);

                        appState.setCompletedTask(defaultproject.data.completedTask[0].taskcompleted)
                        appState.setActiveTask(defaultproject.data.activeTask[0].taskactive)
                    }
                    else  if(appState.userInfo.departmentid === '2000' || appState.userInfo.departmentid === '2001'){
                        const projectlistAll = await axios.get(`/project/taskstafflist/${appState.userInfo.employeeid}`);
                        console.log(projectlistAll);
                        appState.setProjectListAll(projectlistAll.data);

                        /********GET DEFAULT VALUES FOR TASKS********/

                        const defaultproject = await axios.get(`/project/taskDetails/${appState.leftList[0].taskid}`);
                        console.log(defaultproject.data[0]);
                        appState.setSelectedProject(defaultproject.data[0]);
                    }

                }

                /*** CUSTOMER LIST ***/

                if(appState.userInfo.departmentid === '2002' && appState.userInfo.position === 'Manager'){

                    console.log("came here")
                    const response = await axios.get("/Sales/customerlist", {
                        withCredentials: true
                    })
                    console.log(response.data)
                    appState.setCustomerList(response.data)
                }


                /*** STAFF LIST ***/

                const staff = await axios.get(`/employee/employeelist/${appState.userInfo.departmentid}`)
                console.log(staff.data)
                appState.setStaffList(staff.data)

                /********GET DEFAULT VALUES FOR PROJECT********/

                // const defaultproject = await axios.get(`/project/projectlist/${appState.leftList[0].projectid}`);
                // console.log(defaultproject.data.project);
                // appState.setSelectedProject(defaultproject.data.project[0]);

                // const startDate = new Date(defaultproject.data.project[0].startdate);
                // const startDateFormat = startDate.getDate() + "/" + startDate.getMonth() + "/" + startDate.getFullYear();
                // appState.setStartDate(startDateFormat)
                //
                // const endDate = new Date(defaultproject.data.project[0].enddate)
                // const endDateFormat = endDate.getDate() + "/" + endDate.getMonth() + "/" + endDate.getFullYear();
                // appState.setEndDate(endDateFormat)

                // appState.setCompletedTask(defaultproject.data.completedTask[0].taskcompleted)
                // appState.setActiveTask(defaultproject.data.activeTask[0].taskactive)


                const activities = await axios.get(`/sales/tasks/${appState.selectedProject.projectid}/${appState.userInfo.departmentid}`)
                appState.setTaskList(activities.data)
                console.log(activities.data)

                const status = await axios.get(`/sales/status/${appState.selectedProject.projectid}`)
                const location = await axios.get(`/sales/location/${appState.selectedProject.projectid}`)

                //enable or disable send button
                if (location.data.location === '1') {
                    appState.setEnableSendButton(true)
                    console.log(location.data.location)
                } else {
                    appState.setEnableSendButton(false)

                }

                //enable or disable complete button

                if (status.data.status === '2') {
                    appState.setEnableCompletedButton(true)
                } else {
                    appState.setEnableCompletedButton(false)
                }

                /**** PROJECT FILE *****/
                let SMProjectFile = await axios.get( `/project/projectfile/${appState.selectedProject.projectid}/2002`)
                let RIProjectFile = await axios.get( `/project/projectfile/${appState.selectedProject.projectid}/2001`)
                let ITProjectFile = await axios.get( `/project/projectfile/${appState.selectedProject.projectid}/2000`)

                SMProjectFile = SMProjectFile.data[0] ? '\n' + SMProjectFile.data[0].description : '';
                RIProjectFile = RIProjectFile.data[0] ? '\n' + RIProjectFile.data[0].description : '';
                ITProjectFile = ITProjectFile.data[0] ? '\n' + ITProjectFile.data[0].description : '';

                appState.setSMProjectFile(SMProjectFile);
                appState.setRIProjectFile(RIProjectFile);
                appState.setITProjectFile(ITProjectFile);

                /***** DEFAULT STAFF FOR A SPECIFIC DEPARTMENT ******/
                const departmentStaff = await axios.get(`/project/stafflist/${appState.userInfo.departmentid}`)
                console.log(departmentStaff.data)
                appState.setDepartmentStaffList(departmentStaff.data)

                /******* DEFAULT CUSTOMER VALUES ********/
                if(appState.customerList[0]){
                    const defaultcustomer = await axios.get(`/sales/customer/${appState.customerList[0].customerid}`);
                    appState.setSelectedCustomer(defaultcustomer.data);
                    console.log(defaultcustomer.data);
                }


                const defaultCustomerProject = await axios.get(`/sales/customerproject/${appState.selectedCustomer.customerid}`);

                console.log(defaultCustomerProject.data);
                appState.setSelectedCustomerProjects(defaultCustomerProject.data);

                console.log(appState.selectedCustomerProjects.length);


                if(appState.userInfo.departmentid === '2003' ||
                    appState.userInfo.departmentid === '2004'){

                    const response = await axios.get("/hr/admin/department/departmentlist");
                    appState.addDepartmentName(response.data.departmentList);
                    //appState.setProjectListAll(response.data.departmentList);

                    console.log(response.data.departmentList)

                }

            } catch (error) {
                console.log(error)
            }
        }


        fetchData()


    }, [reloadDrawer])


    const snackBarComponent = (
        <Fragment>
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message={"Successful login"}
                autoHideDuration={3000}
                classes={{root: classes.snackbar}}

            />
        </Fragment>

    )
    const permanentDrawer = (

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


            <Grid container className={classes.userId}>
                <Grid item sm={8}>
                    <Grid container alignItems={"center"} style={{height: "100%"}}>
                        <Grid item>
                            <Avatar style={{
                                height: "1.5em",
                                width: "1.5em",
                                marginLeft: "0.2em",
                                marginRight: "0.5em"
                            }}>{initial.charAt(0)}</Avatar>
                        </Grid>
                        <Grid item>
                            <Typography style={{fontFamily: 'Open Sans Condensed, sans-serif'}}>
                                {initial.split(" ", 1)[0].length < 11 ? initial.split(" ", 1)[0].charAt(0).toUpperCase()
                                    + initial.split(" ", 1)[0].slice(1) :
                                    <span>{initial.split(" ", 1)[0].substring(0, 8)}...</span>}
                            </Typography>
                            <Typography style={{fontSize: "0.7em", color: "#878787"}}>
                                {appState.userInfo.departmentid === '2001' ? "RI" : appState.userInfo.departmentid === '2002' ? 'SM' : appState.userInfo.departmentid === '2004' ? 'HR' : appState.userInfo.name} {appState.userInfo.position}
                            </Typography>
                        </Grid>

                    </Grid>

                </Grid>

                <Grid item sm={4}>
                    <Grid container style={{height: "100%"}} alignItems={"center"} justify={"flex-end"}>
                        <IconButton aria-label="display more actions"
                                    edge="center"
                                    color="inherit"
                                    onClick={(e) => handleClick(e)}
                                    aria-owns={anchorEl ? "logout" : undefined}
                                    aria-haspopup={anchorEl ? true : undefined}

                        >
                            <MoreHorizIcon/>
                        </IconButton>
                        <Menu
                            id={"logout"}
                            open={openMenu}
                            onClose={handleClose}
                            MenuListProps={{onMouseLeave: handleClose}}
                            anchorEl={anchorEl}
                            classes={{paper: classes.menu}}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    logout()
                                }}
                                style={{fontWeight: "bold"}}
                            >
                                Log out
                            </MenuItem>
                        </Menu>

                    </Grid>

                </Grid>


            </Grid>

            <div className={classes.menuTitle}>Menu</div>
            {(department === "2000" || department === "2001") ? <ITRIMenu selectedMenuItem={selectedMenuItem}
                                                                          setSelectedMenuItem={setSelectedMenuItem}
                                                                          setOpenMobileDrawer={setOpenMobileDrawer}/> : undefined}
            {(department === "2002") ?
                <SalesMenu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem}
                           setOpenMobileDrawer={setOpenMobileDrawer}/> : undefined}
            {(department === "2003" || department === "2004") ?
                <HRCEOMenu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem}
                           setOpenMobileDrawer={setOpenMobileDrawer}/> : undefined}
        </Drawer>

    )
    const mobileDrawer = (
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

                <Grid container className={classes.userId}>
                    <Grid item sm={8}>
                        <Grid container alignItems={"center"} style={{height: "100%"}}>
                            <Grid item>
                                <Avatar style={{
                                    height: "1.5em",
                                    width: "1.5em",
                                    marginLeft: "0.2em",
                                    marginRight: "0.5em"
                                }}>{initial.charAt(0)}</Avatar>
                            </Grid>
                            <Grid item>
                                <Typography style={{fontFamily: 'Open Sans Condensed, sans-serif'}}>
                                    {initial.split(" ", 1)[0].length < 11 ? initial.split(" ", 1)[0].charAt(0).toUpperCase()
                                        + initial.split(" ", 1)[0].slice(1) :
                                        <span>{initial.split(" ", 1)[0].substring(0, 8)}...</span>}
                                </Typography>
                                <Typography style={{fontSize: "0.7em", color: "#878787"}}>
                                    {appState.userInfo.departmentid === '2001' ? "RI" : appState.userInfo.departmentid === '2002' ? 'SM' : appState.userInfo.departmentid === '2004' ? 'HR' : undefined} {appState.userInfo.position}
                                </Typography>
                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid item sm={4}>
                        <Grid container style={{height: "100%"}} alignItems={"center"} justify={"flex-end"}>
                            <IconButton aria-label="display more actions"
                                        edge="center"
                                        color="inherit"
                                        onClick={(e) => handleClick(e)}
                                        aria-owns={anchorEl ? "logout" : undefined}
                                        aria-haspopup={anchorEl ? true : undefined}

                            >
                                <MoreHorizIcon/>
                            </IconButton>
                            <Menu
                                id={"logout"}
                                open={openMenu}
                                onClose={handleClose}
                                MenuListProps={{onMouseLeave: handleClose}}
                                anchorEl={anchorEl}
                                classes={{paper: classes.menu}}
                            >
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        logout()
                                    }}
                                    style={{fontWeight: "bold"}}
                                >
                                    Log out
                                </MenuItem>
                            </Menu>

                        </Grid>

                    </Grid>


                </Grid>

                <div className={classes.menuTitle}>Menu</div>
                {(department === "2000" || department === "2001") ? <ITRIMenu selectedMenuItem={selectedMenuItem}
                                                                              setSelectedMenuItem={setSelectedMenuItem}
                                                                              setOpenMobileDrawer={setOpenMobileDrawer}/> : undefined}
                {(department === "2002") ?
                    <SalesMenu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem}
                               setOpenMobileDrawer={setOpenMobileDrawer}/> : undefined}
                {(department === "2003" || department === "2004") ?
                    <HRCEOMenu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem}
                               setOpenMobileDrawer={setOpenMobileDrawer}/> : undefined}
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

    return useObserver(() => (


        <div>
            {snackBarComponent}
            <Grid container>

                {matches ? <ElevationScroll>
                    <AppBar position="static" className={classes.appBarTab}>
                        <Toolbar disableGutters>

                            <Button component={Link} to="/" className={classes.logoContainer} disableRipple>

                                <img className={classes.LogoImage} src={easybeLogo} alt="easybe logo"/>
                            </Button>

                            {mobileDrawer}
                        </Toolbar>
                    </AppBar>
                </ElevationScroll> : permanentDrawer}
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {/*<MainLayout/>*/}

                    <Switch>
                        <Redirect exact from={"/drawer"} to={"/drawer/dashboard"}/>
                    </Switch>


                    <Switch>

                        <Route path={"/drawer/dashboard"} component={Dashboard}/>
                        {/**we dont need to pass the prop to the Admin component. this is for learning purpose***/}
                        <Route path={"/drawer/admin"}
                               render={() => <Admin setSelectedMenuItem={setSelectedMenuItem}/>}/>
                        <Route path={"/drawer/team"} component={() => <div>Team</div>}/>

                        {/**
                         *drawer/project
                         *this will take you to project of Sales & Marketing department.
                         *it is linked to so many routes that changing it will be a lot
                         * other routes to project will be more precise
                         **/}

                        <Route path={"/drawer/project"} render={()=> <Project  reloadDrawer={reloadDrawer} setReloadDrawer={setReloadDrawer} />}/>
                        <Route path={"/drawer/researchProject"} render={()=> <Main reloadDrawer={reloadDrawer} setReloadDrawer={setReloadDrawer}/>}/>
                        <Route path={"/drawer/client"} render={() => <Customer reloadDrawer={reloadDrawer} setReloadDrawer={setReloadDrawer} />}/>
                        <Route path={"/drawer/analytics"} component={() => <div>Analytics</div>}/>

                    </Switch>


                </main>
            </Grid>


        </div>
    ));
}

export default AppDrawer;