const express = require("express")
const router = express.Router()
const dashboardController = require("../controller/dashboardController")

router.get("/project/:status", dashboardController.status)
router.get("/project/status/backlog", dashboardController.backlog)
router.get("/overview/:departmentid", dashboardController.overview)


module.exports = router