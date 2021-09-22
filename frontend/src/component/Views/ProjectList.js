import React, {Fragment} from 'react';
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";

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
            fontSize: "1em",


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
        borderRadius: "0.3em",
        [theme.breakpoints.down("xs")]: {
            width: "91%",
        }
    }
}))

function ProjectList(props) {

    const classes = useStyles()

    const filter = [
        "All",
        "Current",
        "Prior",
        "Future"
    ]

    const filterComponent = (
        <Fragment>
            <Grid item xs={4} style={{marginLeft: "0.1em"}}>
                <TextField fullWidth
                           id={"filter"}
                           variant={"filled"}
                           InputProps={{disableUnderline: true}}
                           label={"Filter"}
                           className={classes.form}
                           size={"small"}
                           select
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {filter.map((filter, index) => (
                        <MenuItem key={index} value={index}>
                            {filter}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Fragment>
    )
    return (
        <Fragment>
            <ListSubheader disableGutters>
                <Grid item className={classes.searchContainer}>

                    <Grid container justifyContent={"space-between"}>
                        <Grid item xs style={{marginRight: "0.1em"}}>
                            <FormControl fullWidth
                                         id={"search"}
                                         variant={"filled"}
                                         className={classes.form}
                                         size={"small"}

                            >
                                <InputLabel id="search"  >{props.search ? props.search : undefined}</InputLabel>
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


                        {props.filter ? filterComponent : undefined}
                    </Grid>


                </Grid>

            </ListSubheader>

            {[1,2,3,4,5,8,5,4,5,5,5,5,5,5,55,6].map((value, index)=>(
                <Grid item >

                    <ListItem className={classes.ListContainer} button disableGutters>
                        <Grid container alignItems={"center"} style={{height: "100%"}}>
                            <Typography style={{fontWeight: "bold" }} >

                                {/***project.name.length < 20 ? project.name : <span>{project.name.substring(0, 20)}...</span> **/}
                                Web Redesign
                            </Typography>
                        </Grid>
                    </ListItem>


                </Grid>
            ))}




        </Fragment>
    );
}

export default ProjectList;
