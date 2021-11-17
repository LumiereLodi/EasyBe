import React, {Fragment, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import * as yup from "yup";
import {makeStyles} from "@material-ui/styles";
import {useAppState} from "../../WithStore";
import {useFormik} from "formik";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {useObserver} from "mobx-react"
import Snackbar from "@material-ui/core/Snackbar";

const formValidation = yup.object({
    customer: yup.string().required('Select a Customer'),
    staff: yup.string().required('Select a Sale Person'),
    startDate: yup.string().required('Start Date is required').typeError('Enter a valid Date'),
    endDate: yup.string().required('End Date is required').typeError('Enter a valid Date'),
    name: yup.string().required('Name is required'),

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
            disableUnderline: true

        },
        "& .MuiAutocomplete-root": {
            backgroundColor: "red"
        },

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
        marginTop: "2em"
    },
    selectInput: {
        "& .MuiSelect-root": {
            disableUnderline: true
        },
        "& .MuiSelect-underline": {
            "&:after": {
                borderBottom: `2px solid red`
            },
        }
    },

    snackbar: {
        ...theme.snackbar
    },
    errorSnackbar: {
        ...theme.errorSnackbar
    }

}))

function AddProject(props) {

    const classes = useStyles()
    const appState = useAppState()
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)

    const [projectName, setProjectName] = useState('')


    const formik = useFormik({
        initialValues: {
            name: appState.editSelectedProject.name || '',
            customer: appState.editSelectedProject.customerid || '',
            staff: appState.editSelectedProject.staff || '',
            startDate: appState.editSelectedProject.startdate || '',
            endDate: appState.editSelectedProject.enddate || '',
            description: ''
        },
        validationSchema: formValidation,
        onSubmit: async (values, {resetForm}) => {

            try {

                const givenStartDate = new Date(values.startDate);
                const givenEndDate = new Date(values.endDate);
                const startDateFormat = givenStartDate.getFullYear() + "/" + parseInt(givenStartDate.getMonth() + 1) + "/" + givenStartDate.getDate();
                const endtDateFormat = givenEndDate.getFullYear() + "/" + parseInt(givenEndDate.getMonth() + 1) + "/" + givenEndDate.getDate();

                const updatedValue = {...values, startDate: startDateFormat, endDate: endtDateFormat}

                const data = JSON.stringify(updatedValue)


                if(JSON.stringify(appState.editSelectedProject) !== '{}'){
                    const response = await axios.put(`/Sales/updateproject/${appState.userInfo.employeeid}/${appState.editSelectedProject.projectid}`, updatedValue);
                    props.setOpenDialog(false)

                }else{
                    console.log("inside add")

                    const response = await axios.post(`/Sales/addproject/${appState.userInfo.employeeid}/${appState.userInfo.departmentid}`, data, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': "application/json"
                        }
                    });

                    console.log(response.data.newProject)
                    setProjectName(response.data.newProject.name)
                    setOpenSnackbar(true)
                    resetForm({})
                }

            } catch (error) {
                setProjectName(formik.values.name)
                setOpenErrorSnackbar(true)
            }
            console.log("what is the state before: => " + props.reloadDrawer)
            props.setReloadDrawer(!props.reloadDrawer)
            console.log("what is the state after: => " + props.reloadDrawer)
        }
    });
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 225,
                width: 250,
            },
        },
    };

    const errorSnackBarComponent = (
        <Fragment>
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                open={openErrorSnackbar}
                onClose={() => setOpenErrorSnackbar(false)}
                message={`Project ${projectName} could not be added`}
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
                message={`Project ${projectName} has been added`}
                autoHideDuration={6000}
                classes={{root: classes.snackbar}}

            />
        </Fragment>

    )

    const details = useObserver(() => (
        <Fragment>

            <Grid container justify={"center"} style={{marginBottom: "1em", marginTop: "1em"}}>
                <Grid item>
                    <Typography variant={"h1"}>
                        New Project
                    </Typography>
                </Grid>
            </Grid>
            <form onSubmit={formik.handleSubmit}>


                <Grid container style={{marginBottom: "0.5em"}}>
                    <Grid item xs className={classes.textFieldContainer}>
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
                                   label={"Project Name"}
                                   className={classes.form}
                                   onChange={formik.handleChange}
                                   value={formik.values.name}
                                   error={Boolean(formik.errors.name)}
                                   helperText={formik.errors.name}
                        />
                    </Grid>

                </Grid>
                <Grid container style={{marginBottom: "0.5em"}}>
                    <Grid item xs className={classes.textFieldContainer}>
                        <FormControl fullWidth
                                     id={"customer"}
                                     variant={"filled"}
                                     className={classes.form}
                                     onChange={formik.handleChange("customer")}
                                     error={Boolean(formik.errors.customer)}

                        >
                            <InputLabel id="customer">Customer</InputLabel>
                            <Select
                                labelId="customer"
                                MenuProps={MenuProps}
                                className={classes.selectInput}
                                onChange={formik.handleChange("customer")}
                                value={formik.values.customer}
                                disableUnderline
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {appState.customerList.map((customer, index) => (
                                    <MenuItem key={index} value={customer.customerid}>
                                        {customer.name}
                                    </MenuItem>
                                ))}

                            </Select>
                            {Boolean(formik.errors.customer) ?
                                <FormHelperText id="customer">Customer is required</FormHelperText> : undefined}


                        </FormControl>
                    </Grid>

                </Grid>
                <Grid container style={{marginBottom: "0.5em"}}>
                    <Grid item xs className={classes.textFieldContainer}>
                        <FormControl fullWidth
                                     id={"staff"}
                                     variant={"filled"}
                                     className={classes.form}
                                     onChange={formik.handleChange}
                                     value={formik.values.staff}
                                     error={Boolean(formik.errors.staff)}
                                     helperText={formik.errors.staff}
                        >

                            <InputLabel id="salePerson">Sale Person</InputLabel>
                            <Select
                                labelId="staff"
                                MenuProps={MenuProps}
                                onChange={formik.handleChange("staff")}
                                value={formik.values.staff}
                                disableUnderline
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {appState.staffList.map((staff, index) => (
                                    <MenuItem key={index} value={staff.employeeid}>
                                        {staff.givennames.split(" ", 1)[0]} {staff.lastname}
                                    </MenuItem>
                                ))}

                            </Select>
                            {Boolean(formik.errors.staff) ?
                                <FormHelperText id="customer">Sale Person is required</FormHelperText> : undefined}
                        </FormControl>
                    </Grid>

                </Grid>


                <Grid container style={{marginBottom: "0.5em"}}>

                    <Grid item sm className={classes.textFieldContainer} style={{marginRight: "1em"}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                fullWidth
                                name={"startDate"}
                                id={"startDate"}
                                clearable
                                format="dd/MM/yyyy"
                                label="Start Date"
                                inputVariant="filled"
                                InputProps={{disableUnderline: true}}
                                className={classes.form}
                                onChange={option => formik.setFieldValue("startDate", option)}
                                value={formik.values.startDate}
                                error={Boolean(formik.errors.startDate)}
                                helperText={formik.errors.startDate}
                                maxDate={formik.values.endDate}
                                autoOk
                                disabled={false}


                            />
                        </MuiPickersUtilsProvider>

                    </Grid>


                    <Grid item sm className={classes.textFieldContainer}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                fullWidth
                                name={"endDate"}
                                id={"endDate"}
                                clearable
                                format="dd/MM/yyyy"
                                label="End Date"
                                inputVariant="filled"
                                InputProps={{disableUnderline: true}}
                                className={classes.form}
                                onChange={option => formik.setFieldValue("endDate", option)}
                                value={formik.values.endDate}
                                error={Boolean(formik.errors.endDate)}
                                helperText={formik.errors.endDate}
                                minDate={formik.values.startDate}
                                autoOk

                            />
                        </MuiPickersUtilsProvider>
                    </Grid>

                </Grid>

                {JSON.stringify(appState.editSelectedProject) === '{}' ?
                    <Grid container style={{marginBottom: "0.5em"}}>

                        <Grid item sm className={classes.textFieldContainer}>
                            <TextField fullWidth
                                       id={"description"}
                                       variant={"filled"}
                                       InputProps={{
                                           disableUnderline: true,
                                           autoComplete: 'new-password',
                                           form: {
                                               autoComplete: 'off'
                                           }
                                       }}
                                       label={"Description"}
                                       className={classes.form}
                                       onChange={formik.handleChange}
                                       value={formik.values.description}
                                       multiline
                                       rows={5}

                            />
                        </Grid>

                    </Grid> : undefined}

                <Grid container justify={"center"}>
                    <Grid item>
                        <Button className={classes.addButton} type={"submit"}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </Fragment>

    ))
    return useObserver(() => (
        <div>
            {snackBarComponent}
            {errorSnackBarComponent}


            {details}

        </div>
    ));
}

export default AddProject;