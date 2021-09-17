const express = require("express")

const router = express.Router();

const insertController = require("../controller/insertController")

router.post("/IT/projects/projectInformation/assignTask", insertController.assigningTasks)

module.exports = router;