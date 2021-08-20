const db = require("../models/db");
module.exports={


    employeelist: async(req, res)=> {
        try{
            const result = await db.query("SELECT employeeid, givennames, lastname FROM employee WHERE departmentid = $1 AND position='Staff' ORDER BY createdat DESC", [req.params.departmentid])
            res.status(200).json(result.rows)
        }catch (error) {
            res.status(400).json(error.message)
        }
    },
    getTechlead: async(req, res) => {
        try {
            const results = await db.query("SELECT team.teamname, team.createdat,\n" +
                "     employee.lastname\n" +
                "     from team, employee\n" +
                "     where team.techlead = employee.employeeid\n" +
                "     and team.projectid =  $1",
                [req.params.projectid]);

            res.json(results.rows)
        } catch (err) {
            console.error(err.message)
        }
    },

    //WHEN A PROJECT COMES IN A SPECIFIC DEPARTMENT THE MANAGER CAN CREATE TEAMS FOR THE PROJECTS
    //HERE THEY CAN GET ALL THE QUERY OF A SPECIFIC PROJECT IN A SPECIFIC DEPARTMENT CALLED LOCATION.

    //LOCATION BECAUSE OUR PROJECT CHANGES DEPARTMENTS

    getTeams: async(req, res)=> {
        try {
            const results = await db.query("SELECT team.* from team , project\n" +
                "     where project.projectid = team.projectid and project.location = $1", [req.params.location]);

            res.json(results.rows)
        } catch (err) {
            console.error(err.message)
        }
    },
    getTasks: async(req, res)=> {
        try {
            const results = await db.query("SELECT project.name, project.status, count(task.taskid) numberOfTasks\n" +
                "     from task , team, project\n" +
                "     where task.teamid = team.teamid\n" +
                "     and team.projectid = project.projectid\n" +
                "     and project.location = $1 group by project.name, project.status",
                [req.params.location]);

            res.json(results.rows)
        } catch (err) {
            console.error(err.message)
        }
    },
    getTasksStatus: async(req, res)=> {
        try {
            const results = await db.query("SELECT project.name, count(task.taskid) NumberOfTask\n" +
                "     from task , team, project\n" +
                "     where task.teamid = team.teamid\n" +
                "     and team.projectid = project.projectid\n " +
                "     and project.location = $1" +
                "     and task.taskstatus = $2 group by project.name",
                [req.params.location, req.params.status]);

            res.json(results.rows)
        } catch (err) {
            console.error(err.message)
        }
    },

    //TIMELINE DETERMINE OR SAVE THE JOURNEY OF THE PROJECT WITHIN THE DEPARTMENT

    getTimeline: async(req, res)=> {
        try {
            const results = await db.query("SELECT project.startdate, project.enddate,\n" +
                "     (CURRENT_DATE - project.enddate) ||' '|| 'Days'  as Remaining  from project\n" +
                "     where project.projectid = $1 and project.location = $2",
                [req.params.projectid, req.params.location]);

            res.json(results.rows)
        } catch (err) {
            console.error(err.message)
        }
    },


    //ANY PROJECT WITH ENDDATE GREATER THAN TODAY.

    getUpcomingDeadline: async(req, res)=> {
        try {
            const results = await db.query("SELECT employee.lastname,\n" +
                "                 task.taskname, task.taskenddate\n" +
                "                 FROM team, employee, task,project where\n" +
                "                 team.techlead = employee.employeeid\n" +
                "                 AND team.teamid = task.teamid\n" +
                "                AND team.projectid = project.projectid\n" +
                "                 AND team.projectid = $1\n" +
                "                AND project.location = $2\n" +
                "                AND task.taskenddate > NOW()",
                [req.params.projectid, req.params.location]);

            res.json(results.rows)
        } catch (err) {
            console.error(err.message)
        }
    }
}