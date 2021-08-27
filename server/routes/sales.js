const express = require('express');
const {createTokens, validateToken,salesmanagerValidation} = require('../jwt');

const router = express.Router();
const sales = require("../controller/salesController");

/******* ROUTES FOR THE SALES AND MARKETING MANAGER *******/

router.get("/customer/email/:email",sales.customerEmail);
router.get("/customerlist",salesmanagerValidation, sales.customerList);
router.post("/addcustomer/:managerid", salesmanagerValidation, sales.addCustomer);
router.post("/addproject/:managerid",salesmanagerValidation, sales.addProject);

module.exports = router