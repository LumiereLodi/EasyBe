const express = require('express');
const router = express.Router();
const sales = require("../controller/salesController")


router.get("/customer/email/:email",sales.customerEmail)

module.exports = router