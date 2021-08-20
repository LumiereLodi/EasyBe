import React, {useEffect, useState} from 'react';
import {
    Grid,
    Paper,
    Typography,
    Button,
    TextField,
} from "@material-ui/core";
import {useAppState} from "../../WithStore"
import {useHistory} from "react-router-dom";

import {makeStyles} from "@material-ui/styles";

import easybeLogo from "../../../assets/EasyBe.png";

import * as yup from 'yup';
import {useFormik} from 'formik';
import axios from "axios";


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
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const appState = useAppState()
    const history = useHistory();

    useEffect(() => {
        async function authenticate() {
            const result = await axios.get("http://localhost:3001/authenticate", {
                withCredentials: true
            })

            if (result.data.authenticated) {
                history.replace('/drawer')
            }
        }

        authenticate()

    }, [])
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginForm,
        onSubmit: async (values) => {
            try {
                const response = await axios.post("http://localhost:3001/user/login",
                    JSON.stringify(values, null, 2), {
                        headers: {
                            'Content-Type': "application/json"
                        },
                        withCredentials: true,
                        //credentials: 'include'
                    });
                console.log(response.data.status)
                if (!response.data.status) {
                    setEmailMessage("Incorrect Information. Try again.");
                    setPasswordMessage("Incorrect Information. Try again.");

                } else {
                    setEmailMessage('');
                    setPasswordMessage('');

                    appState.setAuth(true);
                    history.replace('/drawer')

                }

            } catch (error) {
                console.log(error)
            }

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
                                                       onChange={(e) => {
                                                           formik.handleChange(e);
                                                           setEmailMessage('');
                                                           setPasswordMessage('')
                                                       }}
                                                       error={emailMessage.length === 0 ? Boolean(formik.errors.email) : true}
                                                       helperText={emailMessage.length === 0 ? formik.errors.email : emailMessage}
                                            />
                                        </Grid>

                                        <Grid item className={classes.textfield}>
                                            <TextField fullWidth
                                                       color={"secondary"}
                                                       id="password"
                                                       label="Password"
                                                       type={"password"}
                                                       value={formik.values.password}
                                                       onChange={(e) => {
                                                           formik.handleChange(e);
                                                           setPasswordMessage('');
                                                           setEmailMessage('')
                                                       }}
                                                       error={passwordMessage.length === 0 ? Boolean(formik.errors.password) : true}
                                                       helperText={passwordMessage.length === 0 ? formik.errors.password : passwordMessage}
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