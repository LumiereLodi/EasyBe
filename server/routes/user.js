const express = require("express")

const router = express.Router();
const userController = require("../controller/userController")

/******ROUTES FOR USERS:  STAFF, MANAGER AND ADMIN******/


router.get("/userinformation/:userid",userController.userInfo);
router.post("/login",  userController.login);
router.post("/register/:id",userController.register);
router.get("/logout",userController.logout);



module.exports = router