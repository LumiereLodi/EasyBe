import React, {useEffect} from 'react';
import AppBar from "../../../AppBar";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {useAppState} from "../../../WithStore";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/styles";
import ProjectList from "./ProjectList";
import AddProject from "./AddProject";
import axios from "axios";

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
    }

}))

function Project(props) {
    const classes = useStyles();
    const appState = useAppState()

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/sales/customerlist", {
                    withCredentials: true
                })
                console.log(response.data)
                appState.setCustomerList(response.data)

                const staff = await axios.get(`/employee/employeelist/${appState.userInfo.departmentid}`)
                console.log(staff.data)
                appState.setStaffList(staff.data)

            } catch (error) {
                alert(error)
            }
        }

        fetchData()
    }, [])


    const addButton = (
        <div style={{marginLeft: "auto"}}>
            <IconButton component={Link} to={"/drawer/project/addproject"}>
                <AddIcon className={classes.tab}/>
            </IconButton>
        </div>
    )
    return (
        <div>

            <AppBar tab={[]} title={"Projects"} addButton={addButton} link={"/drawer/project/projectlist"}/>
            <Switch>
                <Redirect exact from={"/drawer/project"} to={"/drawer/project/projectlist"}/>
            </Switch>

            <Switch>

                <Route path={"/drawer/project/projectlist"} component={ProjectList}/>
                <Route path={"/drawer/project/addproject"} component={AddProject}/>


            </Switch>
        </div>
    );
}

export default Project;