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
import {useFormik} from "formik";
import * as yup from 'yup';
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import Customer from "../Sales/Customer";

const phoneNumberCheck = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//const phoneNumberCheck = /^\+[1-9]{1}[0-9]{3,14}$/;
const emailCheck = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
const formValidation = yup.object({
    departmentName: yup.string().required('Department Name is required.'),
    managerName: yup.string().required('Manager Name is required.'),

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
        marginTop: "1em",
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
            color: "black"
        }
    },
    snackbar: {
        ...theme.snackbar
    },
    errorSnackbar: {
        ...theme.errorSnackbar
    }
}))



function AddDepartment(props) {

    const classes = useStyles()
    const appState = useAppState()

    const [departmentExist, setDepartmentExist] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)

    const [departmentName, setDepartmentName] = useState('')


    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 300,
                width: 250,
            },
        },
    };
    const formik = useFormik({
        initialValues: {
            departmentName: '',
            managerName: '',
        },
        validationSchema: formValidation,
        onSubmit: async (values, {resetForm}) => {
                console.log(values)

            const response = await axios.post(`/hr/addDepartment/${appState.userInfo.employeeid}`, values)

            console.log(response.data)

            if(response.data.status){
                setDepartmentExist("Department name already exists.")
            }
            else{
                setDepartmentExist('')
                setDepartmentName(response.data.departmentname)
                setOpenSnackbar(true)

                props.setReloadDrawer(!props.reloadDrawer)
                resetForm({})
            }


        }
    });

    const errorSnackBarComponent = (
        <Fragment>
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                open={openErrorSnackbar}
                onClose={() => setOpenErrorSnackbar(false)}
                message={`Department ${departmentName} could not be added`}
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
                message={`Department ${departmentName} has been added`}
                autoHideDuration={6000}
                classes={{root: classes.snackbar}}

            />
        </Fragment>

    )

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
                                   value={formik.values.departmentName}
                                   error={departmentExist.length === 0 ? Boolean(formik.errors.departmentName) : true}
                                   helperText={departmentExist.length === 0 ? formik.errors.departmentName : departmentExist}
                        />
                    </Grid>

                </Grid>
                <Grid container style={{marginBottom: "0.5em"}}>
                    <Grid item sm className={classes.textFieldContainer} >
                        <FormControl fullWidth
                                     id={"managerName"}
                                     variant={"filled"}
                                     className={classes.form}
                                     onChange={formik.handleChange("managerName")}
                                     error={Boolean(formik.errors.managerName)}

                        >
                            <InputLabel id="managerName"  >Manager Name</InputLabel>
                            <Select
                                labelId="managerName"
                                MenuProps={MenuProps}
                                className={classes.selectInput}
                                onChange={formik.handleChange("managerName")}
                                value={formik.values.managerName}
                                disableUnderline
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {appState.employeeStaffList.map((customer, index) => (
                                    <MenuItem key={index} value={customer.employeeid}>
                                        {customer.lastname}
                                    </MenuItem>
                                ))}

                            </Select>
                            {Boolean(formik.errors.managerName) ? <FormHelperText id="managerName">Manager Name is required</FormHelperText> : undefined }


                        </FormControl>
                    </Grid>

                </Grid>

                {/*<Grid container style={{marginBottom: "2em"}}>*/}
                {/*    <Grid item sm className={classes.textFieldContainer}>*/}
                {/*        <TextField fullWidth*/}
                {/*                   id={"staffList"}*/}
                {/*                   variant={"filled"}*/}
                {/*                   label={"Staff Members"}*/}
                {/*                   InputProps={{disableUnderline: true}}*/}
                {/*                   className={classes.form}*/}
                {/*                   select*/}
                {/*                   onChange={formik.handleChange("position")}*/}
                {/*                   value={formik.values.position}*/}
                {/*                   error={Boolean(formik.errors.position)}*/}
                {/*                   helperText={formik.errors.position}*/}
                {/*        >*/}
                {/*            <MenuItem value="">*/}
                {/*                <em>None</em>*/}
                {/*            </MenuItem>*/}
                {/*            {positions.map((position, index) => (*/}
                {/*                <MenuItem key={index} value={position}>*/}
                {/*                    {position}*/}
                {/*                </MenuItem>*/}
                {/*            ))}*/}
                {/*        </TextField>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}

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
            {errorSnackBarComponent}
            {snackBarComponent}
            {details}
        </div>

    ))
}

export default AddDepartment;