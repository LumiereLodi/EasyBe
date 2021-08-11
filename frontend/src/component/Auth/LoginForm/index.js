import React from 'react';
import {
    Grid,
    Paper,
    Typography,
    Divider,
    InputLabel,
    Button,
    InputBase,
    TextField,
    useMediaQuery
} from "@material-ui/core";


import {makeStyles} from "@material-ui/styles";

import easybeLogo from "../../../assets/EasyBe.png";

import * as yup from 'yup';
import { useFormik } from 'formik';

const loginForm = yup.object({
    email: yup.string('Enter email').required('Email is required').email('Enter a valid Email'),
    password: yup.string('Enter Password').required('Password is required')
})
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
        marginBottom: "1em",


    },
    adminLink: {
        backgroundColor: theme.palette.secondary.main,
        height: 29,
        width: 325,
        borderRadius: "10px",
        marginBottom: "2em"

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
    },
    textfield: {
        marginBottom: "2em",
        width: 350
    }
}))


function Index(props) {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginForm,
        onSubmit: values =>  {
            alert(JSON.stringify(values,null,2))
        }
    });
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
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container justify={"center"}>
                                <form onSubmit={formik.handleSubmit}>
                                    <Grid container direction={"column"}>
                                        <Grid item className={classes.textfield}>
                                            <TextField fullWidth
                                                       color={"secondary"}
                                                       id="email"
                                                       label="Email"
                                                       value={formik.values.email}
                                                       onChange={formik.handleChange}
                                                       error={ Boolean(formik.errors.email)}
                                                       helperText={formik.errors.email}
                                            />
                                        </Grid>

                                        <Grid item className={classes.textfield}>
                                            <TextField fullWidth
                                                       color={"secondary"}
                                                       id="password"
                                                       label="Password"
                                                       type={"password"}
                                                       value={formik.values.password}
                                                       onChange={formik.handleChange}
                                                       error={ Boolean(formik.errors.password)}
                                                       helperText={formik.errors.password}
                                            />

                                        </Grid>
                                        <Grid item>
                                            <Grid container justify={"center"}>
                                                <Grid item>
                                                    <Button className={classes.loginButton} type={"submit"}>
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