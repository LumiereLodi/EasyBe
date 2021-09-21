const express = require("express")

const router = express.Router();

const itController = require("../controller/ITController")

router.get("/dashboard/completed/:status", itController.completed)
router.get("/dashboard/active/:status", itController.active)
router.get("/dashboard/backlog", itController.backlog)
router.get("/dashboard/overview/:location", itController.overview)

router.get("/projects/projectList/:location", itController.projectList)
router.get("/projects/projectInformation/:projectID", itController.projectInformation)
router.get("/Projects/AssignTask/Tasks/employeeList/:departmentid", itController.assignTaskTo)

router.get("/Analytics/projectList/:location", itController.projectList)
router.get("/Analytics/projectInformation/completedTaskCount/projectid/:status", itController.numberOfTaskCompleted)
router.get("/Analytics/projectInformation/pendingTaskCount/projectid/:status", itController.numberOfTaskPending)
router.get("/Analytics/projectInformation/projectTimeline/:projectid", itController.projectTimeLine)
router.get("/Analytics/projectInformation/upcomingDeadline/:projectid", itController.upComingDeadline)

module.exports = router;