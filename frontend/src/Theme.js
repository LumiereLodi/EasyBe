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
        tab:{
            color: "black",
            fontSize: "1.3em",
            fontWeight: "bold",
            textTransform: "none"
        }


    },
    overrides: {
        MuiInputLabel: {
            root: {
                color: easyBeige,
                fontSize: "1rem",

            }
        },
        MuiInput: {
            root: {
                color:"white",
                fontWeight: 300,


            },
            underline: {
                //if you use after it will apply when clicked
                "&:before": {
                    borderBottom: `2px solid ${easyBeige}`
                },
                "&:after": {
                    borderBottom: `2px solid ${easyBeige}`
                },
                "&:hover:not($disabled):not($focused):not($error):before": {
                    borderBottom: `2px solid ${easyBeige}`
                }
            }
        }
    }
})