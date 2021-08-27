const express = require("express");

const router = express.Router();
const projectController = require("../controller/projectController")

/**** ROUTES SPECIFIC TO PROJECTS *****/


router.get("/projectlist/:location",projectController.projectList)

module.exports = router