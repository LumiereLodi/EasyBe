import React, {Fragment} from 'react';
import Grid from "@material-ui/core/Grid";
import ListLayout from "../../../Layout/ListLayout";
import Details from "../../../Layout/Details";
import {makeStyles} from "@material-ui/styles";
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import ListItem from "@material-ui/core/ListItem";

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
            fontSize: "1em"
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
    const list = (
        <Fragment>
            <ListSubheader disableGutters>
                <Grid item className={classes.searchContainer}>

                    <Grid container justifyContent={"space-between"}>
                        <Grid item xs={7} style={{marginRight: "0.1em"}}>
                            <FormControl fullWidth
                                    id={"search"}
                                    variant={"filled"}
                                    className={classes.form}
                                    size={"small"}

                                >
                                <InputLabel id="search"  >Search</InputLabel>
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
                    </Grid>
                    

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
    return (
        <div>
            <Grid container>
               <ListLayout list={list}/>

                <Details details/>
            </Grid>
        </div>
    );
}

export default ProjectList;