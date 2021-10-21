// import axios from "axios";
// import {useAppState} from "../WithStore";
//
//
// export async function handleProjectCLick (projectid) {
//     const appState = useAppState()
//
//     try{
//            const result = await axios.get(`/project/projectlist/${projectid}`)
//
//            //console.log(result.data)
//            appState.setSelectedProject(result.data.project[0])
//
//            //console.log(appState.selectedProject.givennames)
//
//
//            const startDate = new Date(result.data.project[0].startdate);
//            //console.log(result.data)
//            const startDateFormat = startDate.getDate() + "/" + startDate.getMonth() + "/" + startDate.getFullYear();
//            appState.setStartDate(startDateFormat)
//
//            const endDate = new Date(result.data.project[0].enddate)
//            const endDateFormat = endDate.getDate() + "/" + endDate.getMonth() + "/" + endDate.getFullYear();
//            appState.setEndDate(endDateFormat)
//
//            appState.setCompletedTask(result.data.completedTask[0].taskcompleted)
//            appState.setActiveTask(result.data.activeTask[0].taskactive)
//
//            const activities = await axios.get(`/sales/tasks/${appState.selectedProject.projectid}/${appState.userInfo.departmentid}`)
//            appState.setTaskList(activities.data)
//
//            const status = await axios.get(`/sales/status/${appState.selectedProject.projectid}`)
//            const location = await axios.get(`/sales/location/${appState.selectedProject.projectid}`)
//
//            //enable or disable send button
//            if (location.data.location === '1') {
//         appState.setEnableSendButton(true)
//         //setReload(!reload)
//         //console.log(location.data.location)
//     } else {
//         appState.setEnableSendButton(false)
//         //setReload(!reload)
//     }
//
//     //enable or disable complete button
//
//     if (status.data.status === '2') {
//         appState.setEnableCompletedButton(true)
//         //setReload(!reload)
//     } else {
//         appState.setEnableCompletedButton(false)
//         //setReload(!reload)
//     }
//
//     //GET PROJECT FILE
//
//
//     let SMProjectFile = await axios.get( `/project/projectfile/${appState.selectedProject.projectid}/2002`)
//     let RIProjectFile = await axios.get( `/project/projectfile/${appState.selectedProject.projectid}/2001`)
//     let ITProjectFile = await axios.get( `/project/projectfile/${appState.selectedProject.projectid}/2000`)
//
//     SMProjectFile = SMProjectFile.data[0] ? '\n' + SMProjectFile.data[0].description : '';
//     RIProjectFile = RIProjectFile.data[0] ? '\n' + RIProjectFile.data[0].description : '';
//     ITProjectFile = ITProjectFile.data[0] ? '\n' + ITProjectFile.data[0].description : '';
//
//     console.log(SMProjectFile)
//     console.log(RIProjectFile)
//     console.log(ITProjectFile)
//
//     appState.setSMProjectFile(SMProjectFile);
//     appState.setRIProjectFile(RIProjectFile);
//     appState.setITProjectFile(ITProjectFile);
//
//
//     props.setReload(!props.reload)
//
//
//     }catch (error) {
//         console.log(error)
//     }
//
//
//     //setReload(!reload)
//
//     //CHANGE THE STATE IN ORDER TO RELOAD STATE DATA
//
//     //props.setReload = (!props.reload)
// }