const express = require("express")

const router = express.Router();

const itController = require("../controller/ITController")

router.get("/dashboard/completed/:status", itController.completed)
router.get("/dashboard/active/:status", itController.active)
router.get("/dashboard/backlog", itController.backlog)
router.get("/dashboard/overview/:location", itController.overview)


router.get("/projects/projectList/:location", itController.projectList)
router.get("/projects/projectInformation/:projectID", itController.projectInformation)


router.get("/Analytics/projectList/:location", itController.projectList)
router.get("/Analytics/projectInformation/projectTimeline/:projectid", itController.projectTimeLine)



router.get("/clients/clientInformation/:customerid", itController.clientInformation)


module.exports = router;