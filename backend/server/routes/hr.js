const express = require('express');


const router = express.Router();

const hr = require('../controller/hrController')

router.get("/admin",hr.admin)

router.get("/admin/department/departmentlist", hr.departmentList)


module.exports = router