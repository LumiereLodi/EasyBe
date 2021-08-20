/******** AUTHENTICATION ROUTES  ***********/

//>>>>>>>Checks for existing emails when you load user or customer
//>>>>>>>Check for valid tokens in the cookie

const express = require('express');
const {validateToken} = require('../jwt')


const router = express.Router();
const auth = require("../controller/authController")

router.get("/", validateToken, auth.auth);

router.get("/email/:email", auth.email);




module.exports = router