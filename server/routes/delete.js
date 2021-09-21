const express = require("express")

const router = express.Router();

const deleteController = require("../controller/deleteController")

router.delete("/IT/projects/:projectid", deleteController.deleteProject)
router.delete("/IT/projects/taks/:taskid", deleteController.deleteTask)

router.delete("/departments/:departmentid", deleteController.deleteDepartment)
router.delete("/employees/:employeeid", deleteController.deleteEmployee)

module.exports = router;