import React from "react";
import theme from "./Theme"
import {ThemeProvider} from "@material-ui/styles";
import AppDrawer from "./component/Drawer";
import {BrowserRouter as Router} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LoginForm from "./component/LoginForm"

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <AppDrawer/>
            </Router>
            {/*<LoginForm/>*/}

        </ThemeProvider>

    );
}

export default App;
