const express = require('express');
const {createTokens, validateToken,salesmanagerValidation} = require('../jwt')

const router = express.Router();
const sales = require("../controller/salesController")


router.get("/customer/email/:email",sales.customerEmail)
router.get("/customerlist",salesmanagerValidation, sales.customerList)
router.post("/addcustomers/:managerid", salesmanagerValidation, sales.addCustomer)
router.post("/addprojects/:managerid",salesmanagerValidation, sales.addProject)
module.exports = router