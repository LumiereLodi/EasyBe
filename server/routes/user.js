const express = require("express")

const router = express.Router();
const userController = require("../controller/userController")

/******ROUTES FOR USERS:  STAFF, MANAGER AND ADMIN******/


router.get("/userinformation/:userid",userController.userInfo);
router.get("/logout",userController.logout);

router.post("/login",  userController.login);
router.post("/register/:managerid",userController.register);

router.put("/editemployeeinfo/:managerid/:employeeid", userController.update)



module.exports = router