import React, {Fragment, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import ListLayout from "../../Layout/ListLayout";
import Details from "../../Layout/Details";
import ProjectListComponent from "../List";
import ProjectFile from "../ProjectFile";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import * as yup from "yup";
import {useFormik} from "formik";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {useObserver} from "mobx-react"
import {useAppState} from "../../WithStore";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import AddProject from "../Sales/AddProject"
import Snackbar from "@material-ui/core/Snackbar";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

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
    dialogContainer: {
        "& .MuiDialog-paper": {
            width: "75em",
            height: "40em",
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
        ...theme.completedButton,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
            color: "black"
        }
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

function ProjectList(props) {
    const classes = useStyles();
    const [openTaskDialog, setOpenTaskDialog] = useState(false);
    const appState = useAppState();
    const [reload, setReload] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)
    const [openCompleteDialog, setOpenCompleteDialog] = useState(false)

    const [taskName, setTaskName] = useState('')

    const handleEditButton = (index)=> {
        appState.setEditSelectedTask(appState.taskList[index])

        // console.log(formik.values.name)
        // console.log(appState.editSelectedTask.name)

    }
    const formik = useFormik({
        initialValues: {
            name:appState.test || '',
            staff:appState.editSelectedTask.staff ||  '',
            startDate:appState.editSelectedTask.startdate ||  '',
            endDate:appState.editSelectedTask.enddate ||  '',
            description:appState.editSelectedTask.description ||  ''
        },
        validationSchema: formValidation,
        onSubmit: async (values, {resetForm}) => {

            const startDateFormat = values.startDate.getFullYear() + "-" + parseInt(values.startDate.getMonth() + 1) + "-" + values.startDate.getDate();
            const endtDateFormat = values.endDate.getFullYear() + "-" + parseInt(values.endDate.getMonth() + 1) + "-" + values.endDate.getDate();
            const updatedValue = {...values, startDate: startDateFormat,endDate: endtDateFormat}

            console.log("After date formating")
        try{
            const response = await axios.post(`/project/addTask/${appState.userInfo.employeeid}/${appState.selectedProject.projectid}/${appState.userInfo.departmentid}`, updatedValue)
            console.log(response.data)

            setTaskName(response.data.name)

            setOpenSnackbar(true)
            resetForm({})

            props.setReloadDrawer(!props.reloadDrawer)
        }catch (error) {
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
    const handleProjectCLick = async (id) => {
        try {

            let result;
            if(appState.userInfo.position === 'Manager'){
                 result = await axios.get(`/project/projectlist/${id}`)
                appState.setSelectedProject(result.data.project[0])

                appState.setCompletedTask(result.data.completedTask[0].taskcompleted)
                appState.setActiveTask(result.data.activeTask[0].taskactive)



            }else if(appState.userInfo.position === 'Staff'){
                if(appState.userInfo.departmentid === '2002'){
                    result = await axios.get(`/project/projectlist/${id}`)
                    appState.setSelectedProject(result.data.project[0])

                    appState.setCompletedTask(result.data.completedTask[0].taskcompleted)
                    appState.setActiveTask(result.data.activeTask[0].taskactive)


                }
                else if(appState.userInfo.departmentid === '2000' || appState.userInfo.departmentid === '2001'){

                    console.log(id)
                    const defaultproject = await axios.get(`/project/taskDetails/${id}`);
                    console.log(defaultproject.data[0]);
                    appState.setSelectedProject(defaultproject.data[0]);

                    const status = await axios.get(`/project/task/status/${id}`)

                    console.log(status.data.status)

                    console.log("status task: " + status.data.status)

                    if (status.data.status === '1') {
                        appState.setEnableCompletedButton(true)
                        //props.setReloadDrawer(!props.reloadDrawer)

                    } else {
                        appState.setEnableCompletedButton(false)
                        //props.setReloadDrawer(!props.reloadDrawer)
                    }

                }


            }

            const activities = await axios.get(`/sales/tasks/${appState.selectedProject.projectid}/${appState.userInfo.departmentid}`)
            appState.setTaskList(activities.data)

            //GET PROJECT FILE


            let SMProjectFile = await axios.get(`/project/projectfile/${appState.selectedProject.projectid}/2002`)
            let RIProjectFile = await axios.get(`/project/projectfile/${appState.selectedProject.projectid}/2001`)
            let ITProjectFile = await axios.get(`/project/projectfile/${appState.selectedProject.projectid}/2000`)

            SMProjectFile = SMProjectFile.data[0] ? '\n' + SMProjectFile.data[0].description : '';
            RIProjectFile = RIProjectFile.data[0] ? '\n' + RIProjectFile.data[0].description : '';
            ITProjectFile = ITProjectFile.data[0] ? '\n' + ITProjectFile.data[0].description : '';

            console.log(SMProjectFile)
            console.log(RIProjectFile)
            console.log(ITProjectFile)

            appState.setSMProjectFile(SMProjectFile);
            appState.setRIProjectFile(RIProjectFile);
            appState.setITProjectFile(ITProjectFile);

            const status = await axios.get(`/sales/status/${appState.selectedProject.projectid}`)
            const location = await axios.get(`/sales/location/${appState.selectedProject.projectid}`)

            //enable or disable send button
            if (location.data.location === '1') {
                appState.setEnableSendButton(true)
                console.log(location.data.location)
            }else {
                appState.setEnableSendButton(false)

            }

            //enable or disable complete button

            if (status.data.status === '2') {

                console.log("project: " + appState.selectedProject.projectid + ", is completed with status: " + status.data.status)
                appState.setEnableCompletedButton(true)
            } else {
                console.log("project is NOT completed with status: " + status.data.status)
                appState.setEnableCompletedButton(false)
            }

            props.setReload(!props.reload)


        } catch (error) {
            console.log(error)
        }

    }
    const handleCompleteClick = async () => {
        try {



            await axios.put(`/project/completetask/${appState.selectedProject.taskid}`)
            const status = await axios.get(`/project/task/status/${appState.selectedProject.taskid}`)

            if (status.data.status === '1') {
                appState.setEnableCompletedButton(true)
            } else {
                appState.setEnableCompletedButton(false)
            }

            setOpenCompleteDialog(false)
            props.setReload(!props.reload)

        } catch (error) {
            alert(error)
        }
    }

    const search = async (wordToSearch) => {

        try{
            if(wordToSearch === ''){
                props.setReloadDrawer(!props.reloadDrawer)

            }else{
                if(appState.userInfo.position.toLowerCase() === 'manager'){
                    const projectlistAll = await axios.get(`/project/sentProjectSearch/${wordToSearch}`);
                        console.log(projectlistAll);
                        appState.setProjectListAll(projectlistAll.data);

                    /********GET DEFAULT VALUES FOR PROJECT********/
                    if(appState.leftList[0]){
                        console.log("inside if")
                        const defaultproject = await axios.get(`/project/projectlist/${appState.leftList[0].projectid}`);
                        console.log(defaultproject.data.project);

                        appState.setSelectedProject(defaultproject.data.project[0]);
                        appState.setCompletedTask(defaultproject.data.completedTask[0].taskcompleted)
                        appState.setActiveTask(defaultproject.data.activeTask[0].taskactive)
                    }else{
                        appState.setSelectedProject({});
                        appState.setCompletedTask('')
                        appState.setActiveTask('')
                    }


                }else if(appState.userInfo.position.toLowerCase() === 'staff'){

                    console.log("landed inside staff yall")

                     const projectlistAll = await axios.get(`/project/taskstafflist/search/${appState.userInfo.employeeid}/${wordToSearch}`);
                        console.log(projectlistAll);
                        appState.setProjectListAll(projectlistAll.data);
                        /********GET DEFAULT VALUES FOR TASKS********/
                        if(appState.leftList[0]){
                            const defaultproject = await axios.get(`/project/taskDetails/${appState.leftList[0].taskid}`);
                            console.log(defaultproject.data[0]);
                            appState.setSelectedProject(defaultproject.data[0]);
                        }else{
                            appState.setSelectedProject({});

                        }
                }
            }
        }catch (e) {
            alert(e)
        }


    }

    //here we will pass list of project for manager, list of tasks for staff.
    const list = (
        <ProjectListComponent search={"Search by name"} filter={"Filter"} list={appState.leftList}
                              handleClick={handleProjectCLick} wordToSearch={search}/>
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
                                   // defaultValue={appState.editSelectedTask.name}
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
    const assignButton = (
        <Fragment>
            <Button
                className={classes.assignButton}
                onClick={() => {
                    setOpenTaskDialog(true);
                    appState.setEditSelectedTask({})
                }}
                classes={{disabled: classes.completedButtonDisabled}}
                disabled={appState.enableCompletedButton}
            >
                Assign Task
            </Button>

            <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)} className={classes.dialogContainer}>
                <DialogTitle id="form-dialog-title">Assign Task</DialogTitle>
                {form}
            </Dialog>

        </Fragment>
    )


    const completedButton = (

        //The title of the button will come from the Database.
        <Fragment>
            <Button
                className={classes.completedButton}
                classes={{disabled: classes.completedButtonDisabled}}
                disabled={appState.enableCompletedButton}
                onClick={()=> setOpenCompleteDialog(true)}

            >
                COMPLETE
            </Button>
        </Fragment>
    )


    // const editButton = (
    //     <Fragment>
    //         <Grid item container xs={1} justify={"center"}>
    //             <IconButton
    //                 onClick={() => {
    //                     setOpenTaskDialog(true);
    //                     handleEditButton();
    //                 }}
    //             >
    //                 <EditIcon fontSize="small" htmlColor={"black"}/>
    //             </IconButton>
    //
    //         </Grid>
    //     </Fragment>
    // )
    const detail = (
        <Fragment>
            <ProjectFile assignButton={appState.userInfo.position === "Manager" ? assignButton : undefined}
                         // editButton={appState.userInfo.position === "Manager" ? editButton : undefined}
                         completedButton={appState.userInfo.position === "Staff" ? completedButton : undefined}
                         setOpenTaskDialog={setOpenTaskDialog} handleEditButton={handleEditButton}/>
        </Fragment>

    )


    const alertCompletedProject = (
        <Fragment>
            <Dialog
                open={openCompleteDialog}
                onClose={()=> setOpenCompleteDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"YOU ARE ABOUT TO COMPLETE THIS TASK!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This operation cannot be reversed. Are you sure you want to complete this task?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> handleCompleteClick()} color="primary" variant={"contained"}>
                        Continue
                    </Button>
                    <Button onClick={()=> setOpenCompleteDialog(false)} color="primary" autoFocus variant={"contained"}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )

    return useObserver(()=>(
        <div>
            {errorSnackBarComponent}
            {snackBarComponent}

            {alertCompletedProject}
            <Grid container>
                <ListLayout list={list}/>

                <Details details={detail}/>
            </Grid>
        </div>
    ));
}

export default ProjectList;
