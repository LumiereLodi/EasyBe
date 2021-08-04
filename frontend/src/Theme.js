import {createTheme} from "@material-ui/core/styles";

const easyBlue = "#283E56";
const easyBeige = "#eeebe5";
const easyYellow = "#FFF8DD";

export default createTheme({
    palette: {
        primary: {
            main: easyBlue
        },
        secondary: {
            main: easyBeige
        },
        common: {
            yellow: easyYellow
        }

    },
    typography:{
        login:{
            fontFamily: "Roboto",
            fontWeight: "bold"
        },
        dashboard:{
            fontFamily: "Roboto",
            fontWeight: "bold"
        },

    }
})