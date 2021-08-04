import React from 'react';
import {
    Grid,
    Paper,
    Typography,
    Divider,
    InputLabel,
    Button,
    InputBase,
    useMediaQuery
} from "@material-ui/core";


import {makeStyles} from "@material-ui/styles";

import easybeLogo from "../../assets/EasyBe.png";

const useStyles = makeStyles(theme => ({
    mainContainer: {
        marginTop: "5em",

        [theme.breakpoints.down("xs")]: {
            marginTop: 0,
            width: "100%",
            height: "100%"
        }

    },
    paperContainer: {
        backgroundColor: theme.palette.primary.main,
        width: "25em",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            height: "100%"
        },
        minWidth: "120px",
    },
    easybeLogo: {
        marginTop: "1em",
        height: "3em"
    },
    link: {
        ...theme.typography.login,
        color: "black",
        textDecoration: "none",
        fontSize: 14

    },
    textContainer: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "10px",
        height: 29,
        width: 300
    },
    logoContainer: {
        marginBottom: "7em"
    },
    dividerContainer: {
        marginTop: "1.5em",
        marginBottom: "5em",


    },
    adminLink: {
        backgroundColor: theme.palette.secondary.main,
        height: 29,
        width: 325,
        borderRadius: "10px"

    },
    form: {
        "& .MuiInputBase-root": {
            background: "white",
            height: 45,
            width: 325,
            borderRadius: "2.5px"
        },

        marginBottom: "2em"

    },
    input: {
        "& .MuiInputBase-input": {
            background: "white",
            height: 25,
            width: 325,
            borderRadius: "2.5px",
            paddingLeft: "7px"
        },
        "& .MuiInputBase-root": {
            background: "white",
            height: 45,
            width: 325,
            borderRadius: "2.5px"
        },

        marginBottom: "2em"

    },
    formLabel: {
        ...theme.typography.login,
        color: "white",
        marginBottom: "0.5em"
    },
    loginButton: {
        ...theme.typography.login,
        backgroundColor: theme.palette.secondary.main,
        height: 29,
        width: 100,
        borderRadius: "10px",
        marginBottom: "4em",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    }
}))


function Index(props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container direction={"row"} justify={"center"} className={classes.mainContainer}
                  alignItems={"center"}>
                <Paper className={classes.paperContainer}>

                    {/**MAIN GRID**/}

                    <Grid container direction={"column"}>
                        <Grid item>
                            <Grid container justify={"center"}>
                                <Grid item className={classes.logoContainer}>
                                    <img className={classes.easybeLogo} src={easybeLogo} alt="easybe logo"/>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
                                <Grid item className={[classes.adminLink, classes.link]} component={"a"}
                                      href="https://www.gmail.com" rel="noopener noreferer"
                                      target="_blank">
                                    <Typography className={classes.link} align={"center"}>Having issues ? Click here to
                                        contact admin.</Typography>

                                </Grid>
                                <Grid item className={classes.dividerContainer}>
                                    <Divider style={{backgroundColor: "white", height: 1, width: 350}}/>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container justify={"center"}>
                                <form>
                                    <Grid container direction={"column"}>
                                        <Grid item>
                                            <InputLabel className={classes.formLabel}>Email</InputLabel>
                                            <InputBase id="outlined-basic" className={classes.input} disableUnderline/>
                                        </Grid>

                                        <Grid item>
                                            <Grid item>
                                                <InputLabel className={classes.formLabel}>Password</InputLabel>
                                                <InputBase id="outlined-basic" className={classes.input}
                                                           disableUnderline type={"password"}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid container justify={"center"}>
                                                <Grid item>
                                                    <Button className={classes.loginButton}>
                                                        Login
                                                    </Button>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                </form>
                            </Grid>

                        </Grid>


                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}

export default Index;