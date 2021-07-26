import React from "react";
import theme from "./Theme"
import {ThemeProvider} from "@material-ui/styles";
import AppDrawer from "./component/Drawer";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppDrawer/>
        </ThemeProvider>

    );
}

export default App;
