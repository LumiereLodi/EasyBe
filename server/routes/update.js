const express = require("express")

const router = express.Router();

const updateController = require("../controllers/updateController")


router.put("/IT/projects/editProject/:projectid", updateController.editingProject);
router.put("/IT/projects/Task/editTask/:taskid", updateController.editingTask);

router.put("/departments/editDepartment/:departmentid", updateController.updateDepartment);

module.exports = router;