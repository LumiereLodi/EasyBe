import React,{Fragment} from 'react';
import ListLayout from "../../../Layout/ListLayout";
import Details from "../../../Layout/Details";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import ListItem from "@material-ui/core/ListItem";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({

    searchContainer: {
        paddingLeft: "1em", 
        paddingRight: "1em",
    
        
    },
    form: {
        marginTop: "1em",
        //marginLeft: "1em",
        
        "& .MuiInputLabel-root": {
            color: theme.palette.primary.main,
            
        },
        "& .MuiInputBase-root": {
            borderRadius: "0.3em",
            // backgroundColor: "white"
            //height: "2.5em"
        },
        "& .MuiInput-formControl": {
            color:"black",
        
        }
        
    },
    ListContainer: {
        width: "90%",
        height: "5em",
        backgroundColor: "#FFF8DD",
        marginLeft: "1em",
        marginRight: "1em",
        marginTop: "0.7em",
        //boxShadow: "0px 0.5px 3px  #888888",
        paddingLeft: "2em",
        borderRadius: "0.2em",
        [theme.breakpoints.down("xs")]: {
            width: "91%",
        }
    },
    customerInfoContainer: {
        //backgroundColor: theme.palette.primary.main,
        backgroundColor: "#FFF8DD",
        borderRadius: "0.3em",
        height: "17em",

    },
    customerProjectContainer: {
        backgroundColor: "#FFF8DD",
        borderRadius: "0.3em",
        height: "25em",
        overflow: "auto"
    }
   
   
}))


function CustomerList(props) {
    const classes = useStyles()

    const list = (
        <Fragment>
            <ListSubheader disableGutters>
                <Grid item className={classes.searchContainer}>

                    
                    <FormControl fullWidth
                            id={"search"}
                            variant={"filled"}
                            className={classes.form}
                            size={"small"}

                        >
                        <InputLabel id="search"  >Search by name</InputLabel>
                        <FilledInput
                                id="search"
                            
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    >
                                    <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>
                                }
                                disableUnderline
                                
                            />
                    </FormControl>

                </Grid>

            </ListSubheader>
                
            {[1,2,3,4,5,8,5,4,5,5,5,5,5,5,55,6].map((value, index)=>(
                    <Grid item >
                    
                    <ListItem className={classes.ListContainer} button disableGutters>
                            <Grid container alignItems={"center"} style={{height: "100%"}}>
                                <Typography style={{fontWeight: "bold" }} >
                                    Web Redesign
                                </Typography>
                            </Grid>
                        </ListItem>
                   
                        
                </Grid>
                ))}

                
                
        </Fragment>
    )

    const details = (
        <Fragment>
            <ListSubheader disableGutters style={{paddingBottom: "0.5em"}}>
                <Grid container justify={"center"} style={{marginBottom: "2em", marginTop: "1em"}}>
                    <Grid item>
                        <Typography variant={"h1"} style={{fontSize: "2em"}}>
                            Customer Name
                        </Typography>
                    </Grid>
                </Grid>
            </ListSubheader>

            <Grid container justifyContent={"center"} className={classes.customerInfoContainer}>
            <Grid item container  direction={"column"}>
                <Grid item container>
                    <Grid item xs style={{marginTop: "1em",marginLeft: "2em"}}>
                            <Typography variant={"h1"}>
                                Customer Information
                            </Typography>
                    </Grid>
                    <Grid item xs style={{marginTop: "1em", marginRight: "2em"}}>
                        <Grid container justifyContent={"flex-end"} >
                            <Grid item>
                                <IconButton
                                    onClick={()=> props.setOpenDialog(true)}
                                >
                                    <EditIcon fontSize="small" htmlColor={"black"}/>
                                </IconButton>
                            </Grid>

                        </Grid>


                    </Grid>
                </Grid>
                <Grid item container>
                    <Grid item>
                        <Grid container direction={"column"}>
                            <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                <Typography>
                                    Contact Person:
                                </Typography>
                            </Grid>
                            <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                <Typography>
                                    Email:
                                </Typography>
                            </Grid>
                            <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                <Typography>
                                    Phone Number:
                                </Typography>
                            </Grid>
                            <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                <Typography>
                                    Address:
                                </Typography>
                            </Grid>
                            <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                <Typography>
                                    Postal Code:
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={{marginLeft: "4em"}}>
                        <Grid container direction={"column"}>
                            <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                <Typography>
                                    Lumiere
                                </Typography>
                            </Grid>
                            <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                <Typography>
                                    lumiere@gmail.com
                                </Typography>
                            </Grid>
                            <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                <Typography>
                                    0820435516
                                </Typography>
                            </Grid>
                            <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                <Typography>
                                    Amarosa Ridge
                                </Typography>
                            </Grid>
                            <Grid item style={{marginLeft: "4em", marginBottom: "1em"}}>
                                <Typography>
                                    1724
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>
        </Grid>

            <Grid item container>
                <Typography variant={"h1"} style={{fontWeight: "bold" , marginTop: "2em"}} >
                    Customer Projects
                </Typography>
            </Grid>
            <Grid container className={classes.customerProjectContainer} style={{marginTop: "2em", marginBottom: "1em"}}>
                <Grid container  sm={12} direction={"column"}>
                    <Grid item container style={{marginTop: "1.5em", marginBottom: "1em"}}>

                        <Grid item container xs justify={"center"} >
                            <Typography style={{fontWeight: "bold"}}>
                                Project Name
                            </Typography>

                        </Grid>
                        <Grid item container xs justify={"center"} >
                            <Typography style={{fontWeight: "bold"}}>
                                Sales Person
                            </Typography>
                        </Grid>
                        <Grid item container xs justify={"center"} >
                            <Typography style={{fontWeight: "bold"}}>
                                Start Date
                            </Typography>
                        </Grid>
                        <Grid item container xs justify={"center"} >
                            <Typography style={{fontWeight: "bold"}}>
                                End Date
                            </Typography>
                        </Grid>
                        <Grid item container xs justify={"center"} >
                            <Typography style={{fontWeight: "bold"}}>
                                Status
                            </Typography>
                        </Grid>

                    </Grid>
                    <Grid item container style={{marginBottom: "0.3em"}}>

                        <Grid item container xs justify={"center"} alignItems={"center"}>
                            <Typography >
                                Web Redesign
                            </Typography>

                        </Grid>
                        <Grid item container xs justify={"center"} alignItems={"center"} >
                            <Typography >
                                Lumiere
                            </Typography>
                        </Grid>
                        <Grid item container xs justify={"center"} alignItems={"center"} >
                            <Typography>
                                19/09/2021
                            </Typography>
                        </Grid>
                        <Grid item container xs justify={"center"} alignItems={"center"}>
                            <Typography >
                                10/10/2021
                            </Typography>
                        </Grid>
                        <Grid item container xs justify={"center"} alignItems={"center"}>
                            <Typography >
                                Completed
                            </Typography>
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>

        </Fragment>
    )
    return (
        <div>
            <Grid container>
                <ListLayout list={list}/>

                <Details details={details}/>
            </Grid>
        </div>
    );
}

export default CustomerList;
