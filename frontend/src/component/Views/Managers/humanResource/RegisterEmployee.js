import React, {Fragment, useState} from 'react';
import ListLayout from "../../../Layout/ListLayout";
import Details from "../../../Layout/Details";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';

/**APP STATE**/
import {useObserver} from "mobx-react"
import {useAppState} from "../../../WithStore"


import {
    MuiPickersUtilsProvider,
    // KeyboardTimePicker,
    // KeyboardDatePicker,
    DatePicker
} from '@material-ui/pickers';

import {useFormik} from "formik";
import * as yup from 'yup';
import axios from "axios";

const phoneNumberCheck = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//const phoneNumberCheck = /^\+[1-9]{1}[0-9]{3,14}$/;
const emailCheck = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
const formValidation = yup.object({
    givenNames: yup.string().required('Name is required'),
    lastName: yup.string().required('Last Name is required'),
    departmentId: yup.string().required('Department is required'),
    position: yup.string().required('Position is required'),
    contract: yup.string().required('Contract Type is required'),
    dateOfBirth: yup.string().required('Date of Birth is required'),
    phone: yup.string().required('Phone number is required').matches(phoneNumberCheck, "Enter a valid phone number."),
    address: yup.string().required('Address is required'),
    email: yup.string().required('Email is required').matches(emailCheck, "Enter a valid email"),
    password: yup.string().required('Password is required').min(10, "Password too short."),

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

function RegisterEmployee(props) {
    const classes = useStyles()
    const appState = useAppState()

    const [emailExist, setEmailExist] = useState('')

    const positions = [
        "Admin",
        "Manager",
        "Staff"
    ]
    const contract = [
        "Permanent",
        "Part-Time"
    ]


    const formik = useFormik({
        initialValues: {
            givenNames: '',
            lastName: '',
            departmentId: '',
            position: '',
            contract: '',
            dateOfBirth: '',
            phone: '',
            address: '',
            email: '',
            password: ''
        },
        validationSchema: formValidation,
        onSubmit: async (values,{resetForm}) => {
            const formatedDate = values.dateOfBirth.getFullYear() + "/" + parseInt(values.dateOfBirth.getMonth() + 1) + "/" + values.dateOfBirth.getDate();
            const updatedValues = {...values, dateOfBirth: formatedDate}
            try {
                const result = await axios.get("http://localhost:3001/authenticate/email/" + formik.values.email);
                if (result.data.exist) {
                    setEmailExist("Email already exists")
                } else {
                    console.log("email does not exists")
                    setEmailExist('')

                    const data = JSON.stringify(updatedValues)
                    console.log(data);
                    const response = await axios.post("http://localhost:3001/user/register", data, {
                        headers: {
                            'Content-Type': "application/json"
                        }
                    });
                    // use a snackbar to show the admin that the empoyee has been added.
                    alert("The employee " + response.data.data[0].givennames + " " + response.data.data[0].lastname + " has been added")
                    resetForm()

                }


            } catch (error) {
                console.log("there was an error")
                alert(error)
            }
        }
    });

    const details = (
        <Fragment>

            <Grid container justify={"center"} style={{marginBottom: "0.5em", marginTop: "1em"}}>
                <Grid item>
                    <Typography variant={"h1"}>
                        New Employee
                    </Typography>
                </Grid>
            </Grid>
            <form onSubmit={formik.handleSubmit}>


                <Grid container style={{marginBottom: "0.5em"}}>
                    <Grid item sm className={classes.textFieldContainer} style={{marginRight: "1em"}}>
                        <TextField fullWidth
                                   id={"givenNames"}
                                   variant={"filled"}
                                   InputProps={{
                                       disableUnderline: true,
                                       autoComplete: 'new-password',
                                       form: {
                                           autoComplete: 'off'
                                       }
                                   }}
                                   label={"Given Names"}
                                   className={classes.form}
                                   onChange={formik.handleChange}
                                   value={formik.values.givenNames}
                                   error={Boolean(formik.errors.givenNames)}
                                   helperText={formik.errors.givenNames}
                        />
                    </Grid>
                    <Grid item sm className={classes.textFieldContainer}>
                        <TextField fullWidth variant={"filled"}
                                   id={"lastName"}
                                   label={"Last Name"}
                                   InputProps={{
                                       disableUnderline: true,
                                       autoComplete: 'new-password',
                                       form: {
                                           autoComplete: 'off'
                                       }
                                   }}
                                   className={classes.form}
                                   onChange={formik.handleChange}
                                   value={formik.values.lastName}
                                   error={Boolean(formik.errors.lastName)}
                                   helperText={formik.errors.lastName}
                        />
                    </Grid>

                </Grid>
                <Grid container style={{marginBottom: "0.5em"}}>
                    <Grid item sm className={classes.textFieldContainer} style={{marginRight: "1em"}}>
                        <TextField fullWidth
                                   id={"departmentId"}
                                   variant={"filled"}
                                   InputProps={{disableUnderline: true}}
                                   label={"Department"}
                                   className={classes.form}
                                   onChange={formik.handleChange("departmentId")}
                                   value={formik.values.departmentId}
                                   error={Boolean(formik.errors.departmentId)}
                                   helperText={formik.errors.departmentId}
                                   select
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {appState.departmentList.map((department, index) => (
                                <MenuItem key={index} value={department.departmentid}>
                                    {department.departmentname}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item sm className={classes.textFieldContainer}>
                        <TextField fullWidth
                                   id={"position"}
                                   variant={"filled"}
                                   label={"Job Position"}
                                   InputProps={{disableUnderline: true}}
                                   className={classes.form}
                                   select
                                   onChange={formik.handleChange("position")}
                                   value={formik.values.position}
                                   error={Boolean(formik.errors.position)}
                                   helperText={formik.errors.position}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {positions.map((position, index) => (
                                <MenuItem key={index} value={position}>
                                    {position}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                </Grid>
                <Grid container style={{marginBottom: "0.5em"}}>
                    <Grid item sm className={classes.textFieldContainer} style={{marginRight: "1em"}}>
                        <TextField fullWidth
                                   id={"contract"}
                                   variant={"filled"}
                                   InputProps={{disableUnderline: true}}
                                   label={"Contract"}
                                   className={classes.form}
                                   select
                                   onChange={formik.handleChange("contract")}
                                   value={formik.values.contract}
                                   error={Boolean(formik.errors.contract)}
                                   helperText={formik.errors.contract}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {contract.map((contract, index) => (

                                <MenuItem key={index} value={contract}>
                                    {contract}
                                </MenuItem>
                            ))}

                        </TextField>
                    </Grid>
                    <Grid item sm className={classes.textFieldContainer}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                fullWidth
                                name={"dateOfBirth"}
                                id={"dateOfBirth"}
                                disableFuture
                                openTo="year"
                                format="dd/MM/yyyy"
                                label="Date of birth"
                                views={["year", "month", "date"]}
                                inputVariant="filled"
                                InputProps={{disableUnderline: true}}
                                className={classes.form}
                                onChange={option => formik.setFieldValue("dateOfBirth", option)}
                                value={formik.values.dateOfBirth}
                                error={Boolean(formik.errors.dateOfBirth)}
                                helperText={formik.errors.dateOfBirth}

                            />
                        </MuiPickersUtilsProvider>


                        {/*</TextField>*/}
                    </Grid>

                </Grid>
                <Grid container style={{marginBottom: "0.5em"}}>
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
                    <Grid item sm className={classes.textFieldContainer}>
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
                <Grid container style={{marginBottom: "0.5em"}}>
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
                    <Grid item sm className={classes.textFieldContainer} style={{marginBottom: "2em"}}>
                        <TextField fullWidth
                                   id={"password"}
                                   variant={"filled"}
                                   InputProps={{disableUnderline: true}}
                                   label={"Password"}
                                   className={classes.form}
                                   onChange={formik.handleChange}
                                   value={formik.values.password}
                                   error={Boolean(formik.errors.password)}
                                   helperText={formik.errors.password}
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
    return useObserver(() => (
        <div><Grid container>
            <ListLayout text={"Employee List"}/>

            <Details details={details}/>
        </Grid></div>
    ))

}

export default RegisterEmployee;