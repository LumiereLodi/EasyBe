const db = require("../Models/db");


module.exports = {

  deleteProject: async (req, res) => {
    try {

      const deleteProject = await db.query("DELETE FROM project WHERE projectID = $1", [
        req.params.projectid
      ]);
      res.json("Project was deleted.");

    } catch (e) {
      console.log(e)
    }
  },


  deleteTask: async (req, res) => {
    try {

      const deleteTeam = await db.query("DELETE FROM task WHERE taskid = $1", [
        req.params.taskid
      ]);
      res.json("Task was deleted.");

    } catch (e) {
      console.log(e)
    }
  },


  deleteDepartment: async (req, res) => {
    try {

      const deleteDepartment = await db.query("DELETE FROM department WHERE departmentid = $1", [
        req.params.departmentid
      ]);
      res.json("Department was deleted.");

    } catch (e) {
      console.log(e)
    }
  },


  deleteEmployee: async (req, res) => {
    try {

      const deleteEmployee = await db.query("DELETE FROM employee WHERE employeeid = $1", [
        req.params.employeeid
      ]);
      res.json("Department was deleted.");

    } catch (e) {
      console.log(e)
    }
  }


}