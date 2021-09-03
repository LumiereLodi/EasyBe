const db = require("../Models/db");


module.exports = {
  completed: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT count(*) from project where status =  $1", [req.params.status])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },


  active: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT count(*) from project where status =  $1", [req.params.status])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },


  backlog: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT count(*) from project where enddate > Now()")

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },


  overview: async (req, res) => {
    try {

      const retrieve = await db.query("select projects.projectid as projectid, projects.name,totalTasks.totalNumberTasks as Task, (Case when projects.enddate > Now() then 'Delayed' else 'on Track' end) as Status,\n" +
        "         completedTasks.TaskProgress * 100 / totalTasks.totalNumberTasks || '%' as progress from project as projects\n" +
        "         inner join(\n" +
        "           select project.projectid, count(task.taskid) as TaskProgress from task, team, project\n" +
        "         where project.projectid = team.projectid\n" +
        "         and team.teamid = task.teamid\n" +
        "\t\tand project.location = $1\n" +
        "         and task.status = 'completed'  group by task.teamid, project.projectid\n" +
        "\n" +
        "         ) as completedTasks\n" +
        "         on projects.projectid = completedTasks.projectid\n" +
        "\n" +
        "         inner join(\n" +
        "           select project.projectid, count(task.taskid) as totalNumberTasks from task, team, project\n" +
        "         where project.projectid = team.projectid\n" +
        "\t\t\t and project.location = $1\n" +
        "         and team.teamid = task.teamid group by task.teamid,project.projectid\n" +
        "         ) as totalTasks\n" +
        "         on projects.projectid = totalTasks.projectid \n" +
        "\t\t \n" +
        "\t\t ", [req.params.location])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },


  projectList: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT name from project where location = $1",
        [req.params.location])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },


  projectInformation: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT name, startdate, enddate, staff from project where projectid = $1",
        [req.params.projectID])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },


  selectTeachlead: async (req, res) => {
    try {

      const retrieve = await db.query("select employee.givenNames\n" +
        "     from employee, department\n" +
        "     where employee.departmentid = department.departmentid\n" +
        "     and department.departmentid = $1",
        [req.params.departmentid])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },

  assignTaskTo: async (req, res) => {
    try {

      const retrieve = await db.query("select employee.givenNames\n" +
        "     from employee, department\n" +
        "     where employee.departmentid = department.departmentid\n" +
        "     and employee.departmentid = $1",
        [req.params.departmentid])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },


  teamList: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT team.name, project.name\n" +
        "     from team , project\n" +
        "     where project.projectid = team.projectid and project.location = $1", [req.params.location])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },


  newTeam: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT team.name, team.createdat,\n" +
        "     employee.lastname\n" +
        "     from team, employee\n" +
        "     where team.techlead = employee.employeeid\n" +
        "     and team.projectid =  $1",
        [req.params.projectid])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },


  teamInformation: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT team.name, project.name, project.startdate,\n" +
        "     project.enddate,team.techlead, task.name, employee.lastname as AssignedTo, task.enddate\n" +
        "     from task , team , employee, project\n" +
        "     where task.teamid = team.teamid\n" +
        "     and team.techlead = employee.employeeid\n" +
        "     and project.projectid = team.projectid and team.teamid= $1",
        [req.params.teamid])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },



  numberOfTaskCompleted: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT project.name, count(task.taskid) completedTasks\n" +
        "     from task , team, project\n" +
        "     where task.teamid = team.teamid\n" +
        "     and team.projectid = project.projectid\n" +
        "     and task.status = $1 group by project.name",
        [req.params.status])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },


  numberOfTaskPending: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT project.name, count(task.taskid) completedTasks\n" +
        "     from task , team, project\n" +
        "     where task.teamid = team.teamid\n" +
        "     and team.projectid = project.projectid\n" +
        "     and task.status = $1 group by project.name",
        [req.params.status])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },


  projectTimeLine: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT project.startdate, project.enddate,\n" +
        "     (CURRENT_DATE - project.enddate) ||' '|| 'Days'  as Remaining  from project\n" +
        "     where project.projectid = $1",
        [req.params.projectid])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },


  upComingDeadline: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT employee.lastname," +
        " task.name, (task.enddate - CURRENT_DATE)  as Deadline" +
        " from team, employee, task where" +
        " team.techlead = employee.employeeid" +
        " and team.teamid = task.teamid" +
        " and team.projectid = $1",
        [req.params.projectid])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },


  clientInformation: async (req, res) => {
    try {

      const retrieve = await db.query("SELECT Name,\n" +
        "    email, phone, contactpersonName,\n" +
        "    postalcode FROM customer where customerid = $1",
        [req.params.customerid])

      res.json(retrieve.rows)
    } catch (err) {
      console.error(err.message)
    }
  },



}