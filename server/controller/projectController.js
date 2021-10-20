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
    projectDetails: async (req, res, next)=> {
        try {
            const results = await db.query("select project.*, employee.lastname, remainingDays.remainingDays from project\n" +
                "inner join(\n" +
                "\tselect to_char((enddate - Now()), 'dd') as remainingDays, projectid from project where projectid = $1\n" +
                ") as remainingDays\n" +
                "on project.projectid = remainingDays.projectid\n" +
                "join employee\n" +
                "on employee.employeeid = project.staff where project.projectid = $1\n" +
                "\n", [req.params.projectid])

            req.result = results.rows
            next()

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
    },
    completedTask: async (req, res, next)=> {

        try{
            const completedTask = await db.query("SELECT count(taskid) AS taskCompleted FROM task WHERE status = '1' AND projectid = $1\n", [req.params.projectid])
            //res.json(...req.result[0], ...completedTask.rows[0]);

            req.completedTasks = completedTask.rows

            next()

        }catch (err) {
            console.error(err.message)
        }



    },
    activeTask: async (req, res)=> {
        try{
            const activeTask = await db.query("SELECT count(taskid) AS taskActive FROM task WHERE status = '0' AND projectid = $1\n", [req.params.projectid])
            res.json({completedTask: req.completedTasks, project:  req.result, activeTask: activeTask.rows});
        }catch (err) {
            console.error(err.message)
        }
    },
    getProjectfileDescription: async (req, res) => {
        try{
            const resultat = await db.query("SELECT  * FROM projectfile WHERE projectid = $1 AND departmentid = $2 ORDER BY createdat DESC LIMIT 1", [req.params.projectid, req.params.departmentid])
            res.json(resultat.rows)

        }catch (err) {
            console.error(err.message)
        }
    },
    setProjectFile: async(req, res)=>{
        try{

            if(req.body.description){
                const result = await db.query("INSERT INTO projectfile (projectid, employeeid, departmentid, description) VALUES($1, $2, $3, $4) RETURNING * ", [

                    req.params.projectid,
                    req.params.employeeid,
                    req.params.departmentid,
                    req.body.description
                ])

                res.json(result.rows)
            }

        }catch (err) {
            console.error(err.message)
        }
    }


}