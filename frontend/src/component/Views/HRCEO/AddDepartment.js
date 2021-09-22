import React, {Fragment, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";


/**APP STATE**/
import {useObserver} from "mobx-react"
import {useAppState} from "../../WithStore"


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
    departmentName: yup.string().required('Department Name is required.'),
    managerName: yup.string().required('Manager Name is required.'),
    staffList: yup.string().required('Please Add Staff.'),

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



function AddDepartment(props) {

    const classes = useStyles()
    const appState = useAppState()

    const [emailExist, setEmailExist] = useState('')

    const positions = [
        "Admin",
        "Manager",
        "Staff"
    ]

    const formik = useFormik({
        initialValues: {
            departmentName: '',
            managerName: '',
            staffList: [],

        },
        validationSchema: formValidation,
        onSubmit: async (values, {resetForm}) => {

        }
    });

    const details = (
        <Fragment>

            <Grid container justify={"center"} style={{marginBottom: "0.5em", marginTop: "1em"}}>
                <Grid item>
                    <Typography variant={"h1"}>
                        New Department
                    </Typography>
                </Grid>
            </Grid>
            <form onSubmit={formik.handleSubmit}>


                <Grid container style={{marginBottom: "0.5em"}}>
                    <Grid item sm className={classes.textFieldContainer}>
                        <TextField fullWidth
                                   id={"departmentName"}
                                   variant={"filled"}
                                   InputProps={{
                                       disableUnderline: true,
                                       autoComplete: 'new-password',
                                       form: {
                                           autoComplete: 'off'
                                       }
                                   }}
                                   label={"Department Name"}
                                   className={classes.form}
                                   onChange={formik.handleChange}
                                   value={formik.values.givenNames}
                                   error={Boolean(formik.errors.givenNames)}
                                   helperText={formik.errors.givenNames}
                        />
                    </Grid>

                </Grid>
                <Grid container style={{marginBottom: "0.5em"}}>
                    <Grid item sm className={classes.textFieldContainer} >
                        <TextField fullWidth
                                   id={"managerName"}
                                   variant={"filled"}
                                   InputProps={{disableUnderline: true}}
                                   label={"Manager"}
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

                </Grid>

                <Grid container style={{marginBottom: "2em"}}>
                    <Grid item sm className={classes.textFieldContainer}>
                        <TextField fullWidth
                                   id={"staffList"}
                                   variant={"filled"}
                                   label={"Staff Members"}
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
        <div>
            {details}
        </div>

    ))
}

export default AddDepartment;