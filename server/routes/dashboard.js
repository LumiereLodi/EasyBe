const express = require("express")
const router = express.Router()
const dashboardController = require("../controller/dashboardController")

/*****ROUTES FOR THE DASHBOARD OF ALL USERS******/

router.get("/project/:status", dashboardController.status);
router.get("/project/status/backlog", dashboardController.backlog);
router.get("/overview/:departmentid/", dashboardController.overview);
router.get("/overview/admin/general", dashboardController.overviewAdmin);


module.exports = router