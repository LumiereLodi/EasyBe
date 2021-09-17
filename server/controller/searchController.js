
const db = require("../Models/db");


module.exports = {

  searchProjectByName: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT name from project where name LIKE '%'||$1||'%' ",
        [req.params.name])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },




  searchEmployeeByName: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT givennames ||' '|| lastname as FullName, position\n" +
        "     from  employee\n" +
        "     where lastname LIKE '%'||$1||'%' ", [req.params.name])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },


  searchDepartmentByName: async (req, res) => {
    try {

      const retrieve = await db.query("select department.departmentname, employee.givennames ||' '|| employee.lastname as Managers\n" +
        "from department, manager, employee\n" +
        "where employee.employeeid = manager.employeeid\n" +
        "and manager.departmentid = department.departmentid and\n" +
        "department.departmentname  LIKE '%'||$1||'%' ", [req.params.name])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },


  projectListWithTaskCount: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT project.name, project.status, count(task.taskid) numberOfTasks\n" +
        "     from task , team, project\n" +
        "     where task.teamid = team.teamid\n" +
        "     and team.projectid = project.projectid\n" +
        "     and project.name LIKE '%'||$1||'%' group by project.name, project.status",
        [req.params.name])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },

}