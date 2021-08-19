const express = require('express');
const {createTokens, validateToken,salesmanagerValidation} = require('../jwt')


const router = express.Router();
const auth = require("../controller/authController")

router.get("/", validateToken, auth.auth);

router.get("/email/:email", auth.email);




module.exports = router