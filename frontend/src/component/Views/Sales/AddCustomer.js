import React, {Fragment, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Button} from "@material-ui/core";
import {makeStyles,useTheme} from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useAppState} from "../../WithStore";
import {useFormik} from "formik";
import axios from "axios";
import * as yup from "yup";
import Snackbar from "@material-ui/core/Snackbar";

const phoneNumberCheck = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
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
    addButton: {
        ...theme.typography.login,
        backgroundColor: theme.palette.primary.main,
        height: 32,
        width: 250,
        borderRadius: "10px",
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
            color: "black"
        },
        [theme.breakpoints.down("xs")]: {
            height: 32,
            width: 150,
            marginBottom: "2em"
        }
    },
    snackbar: {
        ...theme.snackbar
    },
    errorSnackbar: {
        ...theme.errorSnackbar
    }
}))

function AddCustomer(props) {

    const classes = useStyles()
    const appState = useAppState()
    const [emailExist, setEmailExist] = useState('')
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("xs"));
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)

    const [projectName, setProjectName] = useState('')

    const formik = useFormik({
        initialValues: {
            name: appState.editSelectedCustomer.name || '',
            contactPerson: appState.editSelectedCustomer.contactpersonname || '',
            postalCode: appState.editSelectedCustomer.postalcode || '',
            phone: appState.editSelectedCustomer.phone || '',
            address: appState.editSelectedCustomer.address || '',
            email: appState.editSelectedCustomer.email || ''
        },
        validationSchema: formValidation,
        onSubmit: async (values, {resetForm}) => {

            try {

                if(JSON.stringify(appState.editSelectedCustomer) !== '{}'){
                    const response = await axios.put(`/Sales/updatecustomer/${appState.userInfo.employeeid}/${appState.editSelectedCustomer.customerid}`,
                        values )

                    props.setReloadDrawer(!props.reloadDrawer)
                    props.setOpenDialog(false)
                    resetForm({})
                }else{
                    const result = await axios.get("/Sales/customer/email/" + formik.values.email);
                    if (result.data.exist) {
                        setEmailExist("Email already exists")
                    } else {
                        console.log("email does not exists")
                        setEmailExist('')

                        const data = JSON.stringify(values)

                        const response = await axios.post("/Sales/addcustomer/" + appState.userInfo.employeeid, data, {
                            withCredentials: true,
                            headers: {
                                'Content-Type': "application/json"
                            }
                        });

                        console.log(response)
                        setProjectName(response.data.name)

                        setOpenSnackbar(true)
                        resetForm({})
                        props.setReloadDrawer(!props.reloadDrawer)

                    }
                }

            } catch (error) {

                setProjectName(formik.values.name)
                setOpenErrorSnackbar(true)
            }
        }
    });

    const errorSnackBarComponent = (
        <Fragment>
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                open={openErrorSnackbar}
                onClose={() => setOpenErrorSnackbar(false)}
                message={`Customer ${projectName} could not be added`}
                autoHideDuration={6000}
                classes={{root: classes.errorSnackbar}}

            />
        </Fragment>
    )
    const snackBarComponent = (
        <Fragment>
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message={`Customer ${projectName} has been added`}
                autoHideDuration={6000}
                classes={{root: classes.snackbar}}

            />
        </Fragment>

    )
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


                <Grid container style={{marginBottom: matches ? 0 : "1em"}}>
                    <Grid item sm xs={12} className={classes.textFieldContainer} style={{marginRight: matches ? 0 : "1em"}}>
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
                    <Grid item sm xs={12} className={classes.textFieldContainer}>
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

                <Grid container style={{marginBottom: matches ? 0 : "1em"}}>
                    <Grid item sm xs={12} className={classes.textFieldContainer} style={{marginRight: matches ? 0 : "1em"}}>
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
                    <Grid item sm xs={12} className={classes.textFieldContainer}>
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
                <Grid container style={{marginBottom: matches ? 0 : "1em"}}>

                    <Grid item sm xs={12} className={classes.textFieldContainer}>
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
                    <Grid item sm xs={12} className={classes.textFieldContainer} style={{marginBottom: matches ? "2em" : "2em"}}>
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
                        <Button className={classes.addButton} type={"submit"}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </Fragment>

    )
    return (
        <div>

            {snackBarComponent}
            {errorSnackBarComponent}

            {details}
        </div>
    );
}

export default AddCustomer;
