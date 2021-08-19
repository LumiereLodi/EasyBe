import React, {Fragment, useEffect, useState} from 'react';
import {Drawer} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
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
import ResearchMenu from "../Views/Managers/research/Menu"
 import SalesMenu from "../Views/Managers/sales/Menu"
import HRMenu from "../Views/Managers/humanResource/Menu"
// import RegisterEmployee from "../Views/Managers/humanResource/RegisterEmployee";
import Admin from "../Views/Managers/humanResource/Admin";
import Client from "../Views/Managers/sales/client"
import Project from "../Views/Managers/sales/Project";
import DepartmentList from "../Views/Managers/humanResource/DepartmentList";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";

/**APP STATE**/
import {useObserver} from "mobx-react"
import {useAppState} from "../WithStore"
//import Cookies from 'js-cookie';
import axios from "axios";


const marginLeft = 100;
const drawerWidth = 13.5;

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
    appBarTab:{
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
    },
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


    },
    menu:{
        borderRadius: 0
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
    const [reload, setReload] = useState(false);
    const [initial, setInitial] = useState('')

    const handleChange=(e, newValue)=>{
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

    const logout = async () =>{
        
        try{
            await axios.get("http://localhost:3001/user/logout", {
                withCredentials: true
            })
        }catch (err) {
            alert(err)
        }
       

        //window.location.reload(true)
        setReload(!reload)

    }


    useEffect(()=>{
        async function authenticate(){

            const result = await axios.get("http://localhost:3001/authenticate", {
                withCredentials: true
            })

            if(!result.data.authenticated){
                history.replace('/')
            }else{

                const response = await axios.get(`http://localhost:3001/user/userinformation/${result.data.employeeid}`)
                 appState.setUserInfo(response.data.user)
                 setDepartment(result.data.departmentid)
                 setPosition(result.data.position)
                 setInitial(result.data.givennames)




            }



        }


        authenticate()



    })
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


                <Grid container  className={classes.userId}>
                        <Grid item sm={8}>
                            <Grid container alignItems={"center"} style={{height: "100%"}}>
                                <Grid item>
                                    <Avatar  style={{height: "1.5em", width: "1.5em", marginLeft: "0.2em", marginRight: "0.5em"}}>{initial.charAt(0)}</Avatar>
                                </Grid>
                                <Grid item >
                                    <Typography style={{fontFamily: 'Open Sans Condensed, sans-serif'}}>
                                        {initial.split(" ", 1)[0].length < 11 ? initial.split(" ", 1)[0].charAt(0).toUpperCase()
                                            + initial.split(" ", 1)[0].slice(1)  :
                                            <span>{initial.split(" ", 1)[0].substring(0, 8)}...</span> }
                                    </Typography>
                                    <Typography style={{fontSize: "0.7em",color: "#878787"}}>
                                        {appState.userInfo.departmentname} {appState.userInfo.position}
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
                                    <MoreHorizIcon />
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
                                    onClick={()=> {handleClose(); logout()}}
                                    style={{fontWeight: "bold"}}
                                    >
                                        Log out
                                    </MenuItem>
                                </Menu>

                            </Grid>

                        </Grid>




                </Grid>

            <div className={classes.menuTitle}>Menu</div>
            {/*{(position === "Manager" && department === "2000" ) ?  <HRMenu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem}/> : undefined}*/}
            {(position === "Manager" && department === "2001" ) ?  <ResearchMenu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem}/> : undefined}
            {(position === "Manager" && department === "2002" ) ?  <SalesMenu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem}/> : undefined}
            {/*{(position === "Manager" && department === "2003" ) ?  <HRMenu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem}/> : undefined}*/}
            {(position === "Manager" && department === "2004" ) ?  <HRMenu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem}/> : undefined}

            {/*<HRMenu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem}/>*/}
            {/*{test === 1 ? <HRMenu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem}/> : undefined}*/}


        </Drawer>

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
                <HRMenu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem}/>

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

    return useObserver (()=>(

        <div>
            <Grid container>
                {/*<TopBar tabTitleMain={tab} />*/}

                {matches ? <ElevationScroll>
                    <AppBar position="static" className={classes.appBarTab} >
                        <Toolbar disableGutters>

                                <Button component={Link} to="/" className={classes.logoContainer} disableRipple >

                                    <img className={classes.LogoImage} src={easybeLogo} alt="easybe logo"/>
                                </Button>

                            {mobileDrawer}
                        </Toolbar>
                    </AppBar>
                </ElevationScroll> : permanentDrawer}
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {/*<MainLayout/>*/}

                        <Switch>
                            <Redirect exact from={"/drawer"} to={"/drawer/dashboard"}/>
                        </Switch>


                        <Switch>
                            <Route path={"/drawer/yes"} component={()=><div>YES YES</div>}/>
                            <Route path={"/drawer/dashboard"} component={Dashboard}/>
                            {/*<Route path={"/project"} component={MainLayout}/>*/}
                            {/*<Route path={"/client"} component={RegisterEmployee}/>*/}

                            {/**we dont need to pass the prop to the Admin component. this is for learning purpose***/}
                            <Route path={"/drawer/admin"} render={()=> <Admin setSelectedMenuItem={setSelectedMenuItem} />}/>
                            {/*<Route path={"/admin/departmentList"} component={DepartmentList}/>*/}
                            <Route path={"/drawer/team"} component={()=><div>Team</div>}/>
                            <Route path={"/drawer/project"} component={Project}/>
                            <Route path={"/drawer/client"} component={Client}/>
                            <Route path={"/drawer/analytics"} component={()=><div>Analytics</div>}/>

                        </Switch>


                </main>
            </Grid>


        </div>
    ));
}

export default AppDrawer;