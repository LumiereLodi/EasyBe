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
router.get("/sentProject/",projectController.sentProjectList)
router.get("/stafflist/:departmentid",projectController.stafflist)


router.post("/projectfile/description/:projectid/:employeeid/:departmentid",projectController.setProjectFile)



module.exports = router