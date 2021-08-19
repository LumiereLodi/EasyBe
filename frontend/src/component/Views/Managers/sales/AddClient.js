import React, {Fragment, useState} from 'react';
import ListLayout from "../../../Layout/ListLayout";
import Details from "../../../Layout/Details";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useAppState} from "../../../WithStore";
import {useFormik} from "formik";
import axios from "axios";
import * as yup from "yup";

const phoneNumberCheck = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//const phoneNumberCheck = /^\+[1-9]{1}[0-9]{3,14}$/;
const emailCheck = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
const formValidation = yup.object({
    name: yup.string().required('Name is required'),
    contactPerson: yup.string().required('Contact Person is required'),
    postalCode: yup.string()
        .required("Postal Code is required")
        .matches(/^[0-9]+$/, "Enter valid Postal code")
        .min(4, 'Must be exactly 4 digits')
        .max(4, 'Must be exactly 4 digits')
    ,
    phone: yup.string().required('Phone number is required').matches(phoneNumberCheck, "Enter a valid phone number."),
    address: yup.string().required('Address is required'),
    email: yup.string().required('Email is required').matches(emailCheck, "Enter a valid email"),

})

const useStyles = makeStyles(theme => ({

    textFieldContainer: {
        marginTop: "1em",


    },
    form: {
        "& .MuiInputLabel-root": {
            color: theme.palette.primary.main,
        },
        "& .MuiInputBase-root": {
            borderRadius: "0.3em",
            // backgroundColor: "white"
        },
        "& .MuiAutocomplete-root": {
            backgroundColor: "red"
        }
    },
    loginButton: {
        ...theme.typography.login,
        backgroundColor: theme.palette.primary.main,
        height: 32,
        width: 250,
        borderRadius: "10px",
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
            color: "black"
        }
    }
}))

function AddClient(props) {

    const classes = useStyles()
    const appState = useAppState()
    const [emailExist, setEmailExist] = useState('')


    const formik = useFormik({
        initialValues: {
            name: '',
            contactPerson: '',
            postalCode: '',
            phone: '',
            address: '',
            email: ''
        },
        validationSchema: formValidation,
        onSubmit: async (values, {resetForm}) => {

            try {
                const result = await axios.get("http://localhost:3001/customer/email/" + formik.values.email);
                if (result.data.exist) {
                    setEmailExist("Email already exists")
                } else {
                    console.log("email does not exists")
                    setEmailExist('')

                    const data = JSON.stringify(values)

                    const response = await axios.post("http://localhost:3001/addcustomers/" + appState.userInfo.employeeid, data, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': "application/json"
                        }
                    });
                    //use a snackbar to show the admin that the empoyee has been added.
                    alert("Customer " + response.data.name +  " has been added")
                    console.log(response)
                    resetForm({})

                }


            } catch (error) {
                console.log("there was an error")
                alert(error)
            }
        }
    });

    const details = (
        <Fragment>

            <Grid container justify={"center"} style={{marginBottom: "2em", marginTop: "2em"}}>
                <Grid item>
                    <Typography variant={"h1"}>
                        New Customer
                    </Typography>
                </Grid>
            </Grid>
            <form onSubmit={formik.handleSubmit}>


                <Grid container style={{marginBottom: "1em"}}>
                    <Grid item sm className={classes.textFieldContainer} style={{marginRight: "1em"}}>
                        <TextField fullWidth
                                   id={"name"}
                                   variant={"filled"}
                                   InputProps={{
                                       disableUnderline: true,
                                       autoComplete: 'new-password',
                                       form: {
                                           autoComplete: 'off'
                                       }
                                   }}
                                   label={"Company Name"}
                                   className={classes.form}
                                   onChange={formik.handleChange}
                                   value={formik.values.name}
                                   error={Boolean(formik.errors.name)}
                                   helperText={formik.errors.name}
                        />
                    </Grid>
                    <Grid item sm className={classes.textFieldContainer}>
                        <TextField fullWidth variant={"filled"}
                                   id={"contactPerson"}
                                   label={"Contact Person"}
                                   InputProps={{
                                       disableUnderline: true,
                                       autoComplete: 'new-password',
                                       form: {
                                           autoComplete: 'off'
                                       }
                                   }}
                                   className={classes.form}
                                   onChange={formik.handleChange}
                                   value={formik.values.contactPerson}
                                   error={Boolean(formik.errors.contactPerson)}
                                   helperText={formik.errors.contactPerson}
                        />
                    </Grid>

                </Grid>

                <Grid container style={{marginBottom: "1em"}}>
                    <Grid item sm className={classes.textFieldContainer} style={{marginRight: "1em"}}>
                        <TextField fullWidth
                                   id={"phone"}
                                   variant={"filled"}
                                   label={"Phone Number (e.g. 0825551247)"}
                                   className={classes.form}
                                   onChange={formik.handleChange}
                                   value={formik.values.phone}
                                   error={Boolean(formik.errors.phone)}
                                   helperText={formik.errors.phone}
                                   InputProps={{
                                       startAdornment: <InputAdornment position="start">+27</InputAdornment>,
                                       disableUnderline: true,
                                       autoComplete: 'new-password',
                                       form: {
                                           autoComplete: 'off'
                                       }
                                   }}
                        />
                    </Grid>
                    <Grid item sm className={classes.textFieldContainer} >
                        <TextField fullWidth
                                   id={"postalCode"}
                                   variant={"filled"}
                                   label={"Postal Code"}
                                   InputProps={{
                                       disableUnderline: true,
                                       autoComplete: 'new-password',
                                       form: {
                                           autoComplete: 'off'
                                       }
                                   }}
                                   className={classes.form}
                                   onChange={formik.handleChange}
                                   value={formik.values.postalCode}
                                   error={Boolean(formik.errors.postalCode)}
                                   helperText={formik.errors.postalCode}
                        />
                    </Grid>

                </Grid>
                <Grid container style={{marginBottom: "1em"}}>

                    <Grid item sm className={classes.textFieldContainer}>
                        <TextField fullWidth
                                   id={"email"}
                                   variant={"filled"}
                                   InputProps={{
                                       disableUnderline: true,
                                       autoComplete: 'new-password',
                                       form: {
                                           autoComplete: 'off'
                                       }
                                   }}
                                   label={"Email"}
                                   className={classes.form}
                                   onChange={(e) => {
                                       formik.handleChange(e);
                                       setEmailExist('')
                                   }}
                                   value={formik.values.email}
                                   error={emailExist.length === 0 ? Boolean(formik.errors.email) : true}
                                   helperText={emailExist.length === 0 ? formik.errors.email : emailExist}

                        />
                    </Grid>

                </Grid>
                <Grid container>
                    <Grid item sm className={classes.textFieldContainer} style={{marginBottom: "5em"}}>
                        <TextField fullWidth
                                   id={"address"}
                                   variant={"filled"}
                                   label={"Address"}
                                   InputProps={{
                                       disableUnderline: true,
                                       autoComplete: 'new-password',
                                       form: {
                                           autoComplete: 'off'
                                       }
                                   }}
                                   className={classes.form}
                                   onChange={formik.handleChange}
                                   value={formik.values.address}
                                   error={Boolean(formik.errors.address)}
                                   helperText={formik.errors.address}
                        />
                    </Grid>

                </Grid>
                <Grid container justify={"center"}>
                    <Grid item>
                        <Button className={classes.loginButton} type={"submit"}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </Fragment>

    )
    return (
        <div>

            <Grid container>
                <ListLayout text={"Add client"}/>

                <Details details={details}/>
            </Grid>
        </div>
    );
}

export default AddClient;
