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
   
   
}))

function ProjectList(props) {
    const classes = useStyles()

    const filter = [
        "All",
        "Current",
        "Previous"
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
                
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>

                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                <ul>bob the bobo</ul>
                
                
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