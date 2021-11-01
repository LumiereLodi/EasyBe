import React,{Fragment} from 'react';
import ProjectFile from "../ProjectFile";
import List from "../List";
import Grid from "@material-ui/core/Grid";
import ListLayout from "../../Layout/ListLayout";
import Details from "../../Layout/Details";
import ProjectListComponent from "../List";
import {useAppState} from "../../WithStore";
import axios from "axios";


function Project(props) {
    const appState = useAppState()

    //we will also pass the list here.



    const handleProjectCLick = async (projectid)=> {

        console.log("inside the click")
        try{
            const result = await axios.get(`/project/projectlist/${projectid}`)

            //console.log(result.data)
            appState.setSelectedProject(result.data.project[0])

            //console.log(appState.selectedProject.givennames)


            const startDate = new Date(result.data.project[0].startdate);
            //console.log(result.data)
            const startDateFormat = startDate.getDate() + "/" + startDate.getMonth() + "/" + startDate.getFullYear();
            appState.setStartDate(startDateFormat)

            const endDate = new Date(result.data.project[0].enddate)
            const endDateFormat = endDate.getDate() + "/" + endDate.getMonth() + "/" + endDate.getFullYear();
            appState.setEndDate(endDateFormat)

            appState.setCompletedTask(result.data.completedTask[0].taskcompleted)
            appState.setActiveTask(result.data.activeTask[0].taskactive)

            const activities = await axios.get(`/sales/tasks/${appState.selectedProject.projectid}/${appState.userInfo.departmentid}`)
            appState.setTaskList(activities.data)

            const status = await axios.get(`/sales/status/${appState.selectedProject.projectid}`)
            const location = await axios.get(`/sales/location/${appState.selectedProject.projectid}`)

            //enable or disable send button
            if (location.data.location === '1') {
                appState.setEnableSendButton(true)
                //setReload(!reload)
                //console.log(location.data.location)
            } else {
                appState.setEnableSendButton(false)
                //setReload(!reload)
            }

            //enable or disable complete button

            if (status.data.status === '2') {
                appState.setEnableCompletedButton(true)
                //setReload(!reload)
            } else {
                appState.setEnableCompletedButton(false)
                //setReload(!reload)
            }

            //GET PROJECT FILE


            let SMProjectFile = await axios.get( `/project/projectfile/${appState.selectedProject.projectid}/2002`)
            let RIProjectFile = await axios.get( `/project/projectfile/${appState.selectedProject.projectid}/2001`)
            let ITProjectFile = await axios.get( `/project/projectfile/${appState.selectedProject.projectid}/2000`)

            SMProjectFile = SMProjectFile.data[0] ? '\n' + SMProjectFile.data[0].description : '';
            RIProjectFile = RIProjectFile.data[0] ? '\n' + RIProjectFile.data[0].description : '';
            ITProjectFile = ITProjectFile.data[0] ? '\n' + ITProjectFile.data[0].description : '';

            console.log(SMProjectFile)
            console.log(RIProjectFile)
            console.log(ITProjectFile)

            appState.setSMProjectFile(SMProjectFile);
            appState.setRIProjectFile(RIProjectFile);
            appState.setITProjectFile(ITProjectFile);


            props.setReload(!props.reload)


        }catch (error) {
            console.log(error)
        }

        //setReload(!reload)

        //CHANGE THE STATE IN ORDER TO RELOAD STATE DATA

        //props.setReload = (!props.reload)
    }


    const search = async (wordToSearch) => {



        if(wordToSearch === ''){
            props.setReloadDrawer(!props.reloadDrawer)

        }else{
            if(appState.userInfo.position === 'Manager'){

                if(appState.userInfo.departmentid === '2002' ||
                    appState.userInfo.departmentid === '2003' ||
                    appState.userInfo.departmentid === '2004'){
                    const projectlistAll = await axios.get(`/project/search/${wordToSearch}`);
                    console.log(projectlistAll);
                    appState.setProjectListAll(projectlistAll.data);
                }
                else if(appState.userInfo.departmentid === '2000' || appState.userInfo.departmentid === '2001'){
                    const projectlistAll = await axios.get(`/project/sentProjectSearch/${wordToSearch}`);
                    console.log(projectlistAll);
                    appState.setProjectListAll(projectlistAll.data);
                }
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


            }else if(appState.userInfo.position === 'Staff'){
                if(appState.userInfo.departmentid === '2002'){
                    const projectlistAll = await axios.get(`/project/projectstaff/search/${appState.userInfo.employeeid}/${wordToSearch}`);
                    console.log(projectlistAll);
                    appState.setProjectListAll(projectlistAll.data);

                    /********GET DEFAULT VALUES FOR PROJECT********/

                    const defaultproject = await axios.get(`/project/projectlist/${appState.leftList[0].projectid}`);
                    console.log(defaultproject.data.project);
                    appState.setSelectedProject(defaultproject.data.project[0]);

                    appState.setCompletedTask(defaultproject.data.completedTask[0].taskcompleted)
                    appState.setActiveTask(defaultproject.data.activeTask[0].taskactive)
                }
                else  if(appState.userInfo.departmentid === '2000' || appState.userInfo.departmentid === '2001'){
                    const projectlistAll = await axios.get(`/project/taskstafflist/search/${appState.userInfo.employeeid}/${wordToSearch}`);
                    console.log(projectlistAll);
                    appState.setProjectListAll(projectlistAll.data);

                    /********GET DEFAULT VALUES FOR TASKS********/

                    const defaultproject = await axios.get(`/project/taskDetails/${appState.leftList[0].taskid}`);
                    console.log(defaultproject.data[0]);
                    appState.setSelectedProject(defaultproject.data[0]);
                }

            }
        }



    }

    const list = (
        <List search={"Search by name"} filter={"Filter"} list={appState.leftList} setReload={props.setReload} reload={props.reload} handleClick={handleProjectCLick} wordToSearch={search}/>
    )
    const detail =(
        <Fragment>
            <ProjectFile />
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

export default Project;