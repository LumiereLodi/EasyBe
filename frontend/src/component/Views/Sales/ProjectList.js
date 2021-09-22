import React, {Fragment, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import ListLayout from "../../Layout/ListLayout";
import Details from "../../Layout/Details";
import {makeStyles} from "@material-ui/styles";
import ProjectFile from "../ProjectFile.js"
import ProjectListComponent from "../ProjectList.js";
import Fab from "@material-ui/core/Fab";
import SendIcon from '@material-ui/icons/Send';
import Button from "@material-ui/core/Button";

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
    },

    fab: {
        position: 'fixed',
        top: theme.spacing(19),
        right: theme.spacing(6),
        zIndex: 1320
    },
    sendButton: {
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
        marginTop: "1em",

    },
    sendButtonDisabled: {

            backgroundColor: theme.palette.secondary.light,
            color: "black"

    }
}))

function ProjectList(props) {
    const classes = useStyles()
    const [enableSendButton, setEnableSendButton] = useState(false)
    const list = (
        <ProjectListComponent search={"Search"} filter={"Filter"}/>
    )
    const sendButton=(
        <Fragment>
            {/**ON CLICK WE WILL CHANGE THE STATUS OF THE PROJECT FROM SEND TO SENT
             *WHEN WE CONFIRM THE STATUS HAS BEEN CHANGED, THEN WE WILL DISABLE THE BUTTON
             * THE CURRENT USAGE IS A PLACEHOLDER. NOT THE IMPLEMENTATION
             **/}
            <Button
                disabled={enableSendButton}
                className={classes.sendButton}
                classes={{disabled: classes.sendButtonDisabled}}
                onClick={()=> setEnableSendButton(true)}
            >
                Send
            </Button>
        </Fragment>
    )
    const detail= (
        <Fragment>
            <ProjectFile sendButton={sendButton} />
            {/*<Fab color={"primary"} size={"small"} disabled={false} className={classes.fab} >*/}
            {/*   <SendIcon size={"small"}/>*/}
            {/*</Fab>*/}
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