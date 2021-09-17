const express = require("express")

const router = express.Router();

const itController = require("../controller/ITController")

router.get("/dashboard/completed/:status", itController.completed)
router.get("/dashboard/active/:status", itController.active)
router.get("/dashboard/backlog", itController.backlog)
router.get("/dashboard/overview/:location", itController.overview)


router.get("/projects/projectList/:location", itController.projectList)
router.get("/projects/projectInformation/:projectID", itController.projectInformation)
// router.get("/projects/projectInformation/createATeam/selectTechlead/:departmentid", itController.selectTeachlead)
// router.get("/projects/projectInformation/createdTeam/newTeam/:projectid", itController.newTeam)
// router.get("/Projects/CreateTeam/AssignTask/Tasks/employeeList/:departmentid", itController.assignTaskTo)


// router.get("/teams/teamList/:location", itController.teamList)
// router.get("/teams/teamProjectInformation/:teamid", itController.teamInformation)


router.get("/Analytics/projectList/:location", itController.projectList)
// router.get("/Analytics/projectInformation/completedTaskCount/projectid/:status", itController.numberOfTaskCompleted)
// router.get("/Analytics/projectInformation/pendingTaskCount/projectid/:status", itController.numberOfTaskPending)
router.get("/Analytics/projectInformation/projectTimeline/:projectid", itController.projectTimeLine)
// router.get("/Analytics/projectInformation/upcomingDeadline/:projectid", itController.upComingDeadline)


router.get("/clients/clientInformation/:customerid", itController.clientInformation)


module.exports = router;