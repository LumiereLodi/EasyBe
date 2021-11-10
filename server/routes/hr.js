const express = require('express');

/******* HR MANAGER IS ALSO CONSIDERED THE ADMIN.
 *RESPONSIBLE FOR ADDING USERS AND DEPARTMENT
 * EDITING INFORMATION AND PROVIDING SYSTEM SUPPORT
 * ***********/
const router = express.Router();

const hr = require('../controller/hrController');

router.get("/admin",hr.admin);

router.get("/admin/department/departmentlist", hr.departmentList);
router.get("/admin/department/departmentlist/:wordToSearch", hr.departmentListSearch);


router.get("/allemployeelist/", hr.getStaffList)
router.get("/alleasybeemployeelist/", hr.getEasybeStaffList)
router.get("/alleasybeemployeelist/:wordToSearch", hr.getEasybeStaffListSearch)

router.get("/alleasybeemployeelistdetails/:employeeid", hr.getEasybeStaffDetails)


router.get("/alldepartmentemployeelist/:departmentid", hr.getDepartmentStaffList)


//departmentDetails

router.get("/departmentdetails/:departmentid", hr.departmentDetails)

router.post("/addDepartment/:createdby", hr.addDepartment, hr.assignManager)


module.exports = router