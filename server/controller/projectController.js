const db = require("../models/db");

module.exports = {

    //NOTE FOR DEV TEAM: project file table will be joined to the project table in the query below.

    projectList: async (req, res)=> {
        try {
                const results = await db.query("SELECT * from project where location = $1 and status = $2 ORDER BY createdat DESC",
                    [req.params.location, req.params.status]);

                res.json(results.rows);

        } catch (err) {
            console.error(err.message)
        }
    },

    projectListAll: async (req, res)=> {
        try {
            const results = await db.query("SELECT * from project ORDER BY createdat DESC, name DESC")

            res.json(results.rows);

        } catch (err) {
            console.error(err.message)
        }
    },

    defaultProject: async (req, res, next)=> {
        try {
            const results = await db.query("select project.*, employee.lastname, remainingDays.remainingDays from project\n" +
                "inner join(\n" +
                "\tselect to_char((enddate - Now()), 'dd') as remainingDays, projectid from project ORDER BY createdat DESC, name DESC LIMIT 1\n" +
                ") as remainingDays\n" +
                "on project.projectid = remainingDays.projectid\n" +
                "join employee\n" +
                "on employee.employeeid = project.staff ORDER BY createdat DESC, name DESC LIMIT 1\n" +
                "\n", [])

            //res.json(results.rows);

            req.result = results.rows

            next()

        } catch (err) {
            console.error(err.message)
        }
    },
    projectDetails: async (req, res)=> {
        try {
            const results = await db.query("select project.*, employee.givennames, remainingDays.remainingDays from project\n" +
                "inner join(\n" +
                "\tselect to_char((enddate - Now()), 'dd') as remainingDays, projectid from project where projectid = $1\n" +
                ") as remainingDays\n" +
                "on project.projectid = remainingDays.projectid\n" +
                "join employee\n" +
                "on employee.employeeid = project.staff where project.projectid = $1\n" +
                "\n", [req.params.projectid])

            res.json(results.rows);


        } catch (err) {
            console.error(err.message)
        }
    },
    defaultCompletedTask: async (req, res, next)=> {

        try{
            const completedTask = await db.query("SELECT count(taskid) AS taskCompleted FROM task WHERE status = '1' AND projectid = $1\n", [req.result[0].projectid])
            //res.json(...req.result[0], ...completedTask.rows[0]);

            req.completedTasks = completedTask.rows

            next()

        }catch (err) {
            console.error(err.message)
        }



    },
    defaultActiveTask: async (req, res)=> {
        try{
            const activeTask = await db.query("SELECT count(taskid) AS taskActive FROM task WHERE status = '2' AND projectid = $1\n", [req.result[0].projectid])
            res.json({completedTask: req.completedTasks, project:  req.result, activeTask: activeTask.rows});
        }catch (err) {
            console.error(err.message)
        }
    }

}