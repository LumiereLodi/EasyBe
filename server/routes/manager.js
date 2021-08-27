const express = require('express');
const router = express.Router();
const managerController = require("../controller/managerController");

/*****
 * ROUTES FOR MANAGERS:
 * IT MANAGER
 * SM MANAGER
 * RI MANAGER
 * HR
 * CEO
 * *******/

router.get("/employeelist/:departmentid",managerController.employeelist);
router.get("/techlead/:projectid", managerController.getTechlead)
router.get("/teamlist/:location",managerController.getTeams)
router.get("/tasklist/:location",managerController.getTasks)
router.get("/tasklist/:status/:location",managerController.getTasksStatus)
router.get("/timeline/:projectid/:location",managerController.getTimeline)
router.get("/upcomingDeadline/:projectid/:location", managerController.getUpcomingDeadline)



module.exports = router