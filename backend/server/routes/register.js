const express = require('express');


const router = express.Router();

const loginController = require('../controller/registerController')


router.post("/",loginController.register)

module.exports = router