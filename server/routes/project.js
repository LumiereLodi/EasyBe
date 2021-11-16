const express = require("express");

const router = express.Router();
const projectController = require("../controller/projectController")

/**** ROUTES SPECIFIC TO PROJECTS *****/


router.get("/projectlist/:location/:status",projectController.projectList)
router.get("/projectlist/",projectController.projectListAll)
router.get("/defaultproject/",projectController.defaultProject, projectController.defaultCompletedTask,projectController.defaultActiveTask)
router.get("/projectlist/:projectid", projectController.projectDetails, projectController.completedTask,projectController.activeTask)
router.get("/tasklist/:status",projectController.projectList)
router.get("/projectfile/:projectid/:departmentid",projectController.getProjectfileDescription)
router.get("/projectstafflist/staff/:staffid",projectController.projectListStaff)
router.get("/projectstaff/search/:staffid/:wordToSearch",projectController.projectListStaffSearch)
router.get("/sentProject/",projectController.sentProjectList)
router.get("/sentProjectSearch/:wordToSearch",projectController.sentProjectListSearch)
router.get("/stafflist/:departmentid",projectController.stafflist)
router.get("/staffonlylist/:departmentid",projectController.staffonlylist)
router.get("/taskstafflist/:staffid",projectController.taskListStaff)
router.get("/taskstafflist/search/:staffid/:wordToSearch",projectController.taskListStaffSearch)
router.get("/taskDetails/:taskid", projectController.taskDetails)
router.get("/search/:wordToSearch",projectController.projectListSearch)
router.get("/task/status/:taskid",projectController.getTaskStatus)

router.put("/completetask/:taskid", projectController.setCompleteTask)
router.put("/editTask/:taskid/",projectController.updateTask)

router.post("/addTask/:managerid/:projectid/:departmentid",projectController.addTask)
router.post("/projectfile/description/:projectid/:employeeid/:departmentid",projectController.setProjectFile)



module.exports = router