const express = require('express');
const router = express.Router();
const managerController = require("../controller/managerController");

router.get("/employeelist/:departmentid",managerController.employeelist);

module.exports = router