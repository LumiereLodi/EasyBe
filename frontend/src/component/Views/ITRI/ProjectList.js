import React, {Fragment, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import ListLayout from "../../Layout/ListLayout";
import Details from "../../Layout/Details";
import ProjectListComponent from "../List";
import ProjectFile from "../ProjectFile";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import * as yup from "yup";
import {useFormik} from "formik";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {useAppState} from "../../WithStore";

const formValidation = yup.object({
    customer: yup.string().required('Select a Customer'),
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
    dialogContainer:{
        "& .MuiDialog-paper": {
            width: "75em",
            height: "35em",
            backgroundColor: theme.palette.secondary.main,
            padding: "1em"
        }
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
    completedButton: {
        ...theme.typography.login,
        backgroundColor: theme.palette.primary.main,
        height: 32,
        width: 150,
        borderRadius: "10px",
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
            color: "black"
        }
    },
}))

function ProjectList(props) {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const appState = useAppState()


    const formik = useFormik({
        initialValues: {
            name: '',
            customer: '',
            staff: '',
            startDate: '',
            endDate: '',
            description: ''
        },
        validationSchema: formValidation,
        onSubmit: async (values, {resetForm}) => {
        }
    });

    //here we will pass list of project for manager, list of tasks for staff.
    const list = (
        <ProjectListComponent search={"Search by name"} filter={"Filter"}/>
    )
    const assignButton =(
        <Fragment>
            <Button
                className={classes.assignButton}
                onClick={()=> setOpen(true)}
            >
                Assign Task
            </Button>
            
            <Dialog open={open} onClose={()=> setOpen(false)} className={classes.dialogContainer}>
                <DialogTitle id="form-dialog-title">Assign Task</DialogTitle>
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
                                       label={"Project Name"}
                                       className={classes.form}
                                       onChange={formik.handleChange}
                                       value={formik.values.name}
                                       error={Boolean(formik.errors.name)}
                                       helperText={formik.errors.name}
                            />
                        </Grid>

                    </Grid>


                    {/**THE MAX DATE WILL BE THE END DATE OF THE PROJECT AND THE MIN DATE WILL BE THE START DATE OF THE PROJECT***/}

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
                                    minDate={formik.values.startDate }
                                    autoOk

                                />
                            </MuiPickersUtilsProvider>
                        </Grid>

                    </Grid>
                    <Grid container style={{marginBottom: "0.5em", marginTop: "2em"}}>
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
                                       rows={5}

                            />
                        </Grid>

                    </Grid>

                    <Grid container justify={"center"} style={{marginTop: "1em"}}>
                        <Grid item>
                            <Button className={classes.assignButton} type={"submit"}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Dialog>

        </Fragment>
    )

    const completedButton = (

        //The title of the button will come from the Database.
        <Fragment>
            <Button
                className={classes.completedButton}

            >
                COMPLETE
            </Button>
        </Fragment>
    )
    const editButton=(
        <Fragment>
            <Grid item container xs={1} justify={"center"} >
                <IconButton
                    onClick={()=> setOpen(true)}
                >
                    <EditIcon fontSize="small" htmlColor={"black"}/>
                </IconButton>

            </Grid>
        </Fragment>
    )
    const detail= (
        <Fragment>
            <ProjectFile assignButton={appState.userInfo.position === "Manager" ? assignButton : undefined}
                         editButton={appState.userInfo.position === "Manager" ? editButton : undefined} completedButton={completedButton}/>
        </Fragment>

    )



    return (
        <div>
            <Grid container>
                <ListLayout list={list}/>

                <Details details={detail} />
            </Grid>
        </div>
    );
}

export default ProjectList;
