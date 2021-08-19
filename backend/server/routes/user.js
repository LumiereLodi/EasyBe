const express = require("express")

const router = express.Router();
const userController = require("../controller/userController")

router.get("/userinformation/:userid",userController.userInfo);
router.post("/login",  userController.login);
router.post("/register",userController.register);
router.get("/logout",userController.logout);


module.exports = router