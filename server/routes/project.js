const express = require("express");

const router = express.Router();
const projectController = require("../controller/projectController")

/**** ROUTES SPECIFIC TO PROJECTS *****/


router.get("/projectlist/:location/:status",projectController.projectList)
router.get("/projectlist/",projectController.projectListAll)
router.get("/defaultproject/",projectController.defaultProject, projectController.defaultCompletedTask,projectController.defaultActiveTask)
router.get("/projectlist/:projectid", projectController.projectDetails)
router.get("/tasklist/:status",projectController.projectList)


module.exports = router