const express = require('express');
const {createTokens, validateToken,salesmanagerValidation} = require('../jwt');

const router = express.Router();
const sales = require("../controller/salesController");

/******* ROUTES FOR THE SALES AND MARKETING MANAGER *******/

router.get("/customer/email/:email",sales.customerEmail);
router.get("/location/:projectid", sales.getLocation)
router.get("/status/:projectid", sales.getStatus)
router.get("/tasks/:projectid/:departmentid", sales.getAllTasks)
router.get("/customerlist",salesmanagerValidation, sales.customerList);
router.get("/defaultcustomer/", sales.defaultCustomer)
router.get("/customerproject/:customerid", sales.getCustomerProject)
router.get("/customer/:customerid", sales.getCustomer)

router.post("/addcustomer/:managerid", salesmanagerValidation, sales.addCustomer);
router.post("/addproject/:managerid/:departmentid",salesmanagerValidation, sales.addProject, sales.projectFile);
router.post("/adddescription/:projectid/:departmentid/:employeeid", sales.projectFile)

router.put("/sendproject/:projectid", sales.sendProject)
router.put("/completeproject/:projectid", sales.completeProject)



module.exports = router