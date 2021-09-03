const express = require("express")

const router = express.Router();

const searchController = require("../controller/searchController")

/*Searching projects by name route*/
router.get("/projects/projectName/:name", searchController.searchProjectByName)

/*Searching teams by name route*/
router.get("/teams/teamName/:name", searchController.searchTeamByName)

/*searching projects by name under Analytics*/
router.get("/Analytics/projectName/:name", searchController.projectListWithTaskCount)

/*HR: searching Employees by name*/
router.get("/Employees/employeeName/:name", searchController.searchEmployeeByName)

/*HR: searching departments by name */
router.get("/Departmen/departmentName/:name", searchController.searchDepartmentByName)


module.exports = router;