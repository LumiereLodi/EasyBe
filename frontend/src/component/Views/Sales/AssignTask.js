import React, {Fragment, useState} from 'react';
import * as yup from "yup";
import {makeStyles} from "@material-ui/styles";
import {useFormik} from "formik";
import axios from "axios";
import {useAppState} from "../../WithStore";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";


const formValidation = yup.object({
    staff: yup.string().required('Select a Sale Person'),
    startDate: yup.string().required('Start Date is required').typeError('Enter a valid Date'),
    endDate: yup.string().required('End Date is required').typeError('Enter a valid Date'),
    name: yup.string().required('Name is required'),

})

const useStyles = makeStyles(theme => ({
    assignButton: {
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
        marginTop: "1em"
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
    completedButtonDisabled: {
        backgroundColor: theme.palette.secondary.light,
        color: "black"
    },
    snackbar: {
        ...theme.snackbar
    },
    errorSnackbar: {
        ...theme.errorSnackbar
    }
}))

function AssignTask(props) {
    const classes = useStyles();
    const [openTaskDialog, setOpenTaskDialog] = useState(false);
    const appState = useAppState();
    const [reload, setReload] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)
    const [openCompleteDialog, setOpenCompleteDialog] = useState(false)
    const [taskName, setTaskName] = useState('')

    const formik = useFormik({
        initialValues: {
            name: appState.editSelectedTask.name || '',
            staff: appState.editSelectedTask.staff || '',
            startDate: appState.editSelectedTask.startdate || new Date(appState.selectedProject.startdate),
            endDate: appState.editSelectedTask.enddate || new Date(appState.selectedProject.enddate),
            description: appState.editSelectedTask.description || ''
        },
        validationSchema: formValidation,
        onSubmit: async (values, {resetForm}) => {

            try{
                const givenStartDate = new Date(values.startDate);
                const givenEndDate = new Date(values.endDate);

                const startDateFormat = givenStartDate.getFullYear() + "-" + parseInt(givenStartDate.getMonth() + 1) + "-" + givenStartDate.getDate();
                const endtDateFormat = givenEndDate.getFullYear() + "-" + parseInt(givenEndDate.getMonth() + 1) + "-" + givenEndDate.getDate();

                const updatedValue = {...values, startDate: startDateFormat,endDate: endtDateFormat}

                if(JSON.stringify(appState.editSelectedTask) !== '{}'){
                    const response = await axios.put(`/project/editTask/${appState.editSelectedTask.taskid}`, updatedValue)

                    setTaskName(response.data.name)

                    setOpenSnackbar(true)
                    resetForm({})
                    props.setOpenTaskDialog(false)

                }else{

                    const response = await axios.post(`/project/addTask/${appState.userInfo.employeeid}/${appState.selectedProject.projectid}/${appState.userInfo.departmentid}`, updatedValue)
                    console.log(response.data)

                    setTaskName(response.data.name)
                    setOpenSnackbar(true)
                    resetForm({})
                }


                props.setReloadDrawer(!props.reloadDrawer)
            }catch (error) {

                console.log(error)
                setTaskName(formik.values.name)
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
                message={`Task ${taskName} could not be assigned`}
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
                message={`Task ${taskName} has been assigned`}
                autoHideDuration={6000}
                classes={{root: classes.snackbar}}

            />
        </Fragment>

    )
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 225,
                width: 250,
            },
        },
    };

    const form = (
        <Fragment>
            <form onSubmit={formik.handleSubmit}>


                <Grid container style={{marginBottom: "0.5em", marginTop: "1em"}}>
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
                                   label={"Task Name"}
                                   className={classes.form}
                                   onChange={formik.handleChange}
                                   value={formik.values.name}
                                   error={Boolean(formik.errors.name)}
                                   helperText={formik.errors.name}
                            //defaultValue={appState.editSelectedTask.name}

                        />
                    </Grid>

                </Grid>
                <Grid container style={{marginBottom: "0.5em", marginTop: "2em"}}>

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
                                minDate={new Date(appState.selectedProject.startdate)}
                                maxDate={formik.values.endDate}
                                autoOk

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
                                maxDate={new Date(appState.selectedProject.enddate)}
                                autoOk

                            />
                        </MuiPickersUtilsProvider>
                    </Grid>

                </Grid>
                <Grid container style={{marginBottom: "0.5em", marginTop: "1em"}}>
                    <Grid item xs className={classes.textFieldContainer}>
                        <FormControl fullWidth
                                     id={"staff"}
                                     variant={"filled"}
                                     className={classes.form}
                                     onChange={formik.handleChange("staff")}
                                     error={Boolean(formik.errors.staff)}

                        >
                            <InputLabel id="staff">Staff</InputLabel>
                            <Select
                                labelId="staff"
                                MenuProps={MenuProps}
                                className={classes.selectInput}
                                onChange={formik.handleChange("staff")}
                                value={formik.values.staff}
                                disableUnderline
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {appState.departmentStaffonlyList.map((staff, index) => (
                                    <MenuItem key={index} value={staff.employeeid}>
                                        {staff.lastname}
                                    </MenuItem>
                                ))}

                            </Select>
                            {Boolean(formik.errors.staff) ?
                                <FormHelperText id="staff">Staff is required</FormHelperText> : undefined}


                        </FormControl>
                    </Grid>

                </Grid>

                <Grid container style={{marginTop: "2em"}}>

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
                                   rows={10}

                        />
                    </Grid>

                </Grid>

                <Grid container justify={"center"} style={{marginTop: "1em"}}>
                    <Grid item>
                        <Button className={classes.assignButton} type={"submit"}>
                            Assign
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
            {form}

        </div>
    );
}

export default AssignTask;
