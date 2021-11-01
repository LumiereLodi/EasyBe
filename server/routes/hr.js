const express = require('express');

/******* HR MANAGER IS ALSO CONSIDERED THE ADMIN.
 *RESPONSIBLE FOR ADDING USERS AND DEPARTMENT
 * EDITING INFORMATION AND PROVIDING SYSTEM SUPPORT
 * ***********/
const router = express.Router();

const hr = require('../controller/hrController');

router.get("/admin",hr.admin);

router.get("/admin/department/departmentlist", hr.departmentList);

router.post("/addDepartment/:id", hr.addDepartment, hr.assignManager)


module.exports = router