import React from "react";
import theme from "./Theme"
import {ThemeProvider} from "@material-ui/styles";
import AppDrawer from "./component/Drawer";
import {BrowserRouter as Router, Route} from "react-router-dom";
// import Grid from "@material-ui/core/Grid";
import LoginForm from "./component/Auth/LoginForm"
import appDrawer from "./component/Drawer";
import admin from "./component/Views/HRCEO/Admin"
import departmentlist from "./component/Views/HRCEO/DepartmentList"
import {useObserver} from "mobx-react"
function App() {
    return (
        <ThemeProvider theme={theme}>
            {/*<Router>*/}
            {/*    <AppDrawer/>*/}
            {/*</Router>*/}

            <Router>
                {/*<LoginForm/>*/}
                <switch>
                    <Route exact path={"/"} component={LoginForm}/>
                    <Route path={"/drawer"} component={appDrawer}/>
                </switch>

            </Router>



        </ThemeProvider>

    );
}

export default App;
