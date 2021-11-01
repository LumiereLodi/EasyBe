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
    projectListSearch: async (req, res)=> {
        try {
            const results = await db.query("SELECT * from project where name like '%' || $1 || '%' ORDER BY createdat DESC, name DESC", [req.params.wordToSearch])

            res.json(results.rows);

        } catch (err) {
            console.error(err.message)
        }
    },
    projectListStaff: async (req, res)=> {

        try {
            const results = await db.query("SELECT * from project WHERE staff = $1 ORDER BY createdat DESC, name DESC", [req.params.staffid])
            res.json(results.rows);

        } catch (err) {
            console.error(err.message)
        }
    },
    projectListStaffSearch: async (req, res)=> {

        try {
            const results = await db.query("SELECT * from project WHERE staff = $1 AND name like '%' || $2 || '%' ORDER BY createdat DESC, name DESC", [req.params.staffid, req.params.wordToSearch])
            res.json(results.rows);

        } catch (err) {
            console.error(err.message)
        }
    },
    sentProjectList: async (req, res)=> {

        try {
            const results = await db.query("SELECT * from project WHERE location = '1' ORDER BY createdat DESC, name ASC")
            res.json(results.rows);

        } catch (err) {
            console.error(err.message)
        }
    },
    sentProjectListSearch: async (req, res)=> {

        try {
            const results = await db.query("SELECT * from project WHERE location = '1' AND name like '%' || $1 || '%' ORDER BY createdat DESC, name ASC",[req.params.wordToSearch])
            res.json(results.rows);

        } catch (err) {
            console.error(err.message)
        }
    },

    defaultProject: async (req, res, next)=> {
        try {
            const results = await db.query("select project.*, to_char(startdate, $1) as formatStartdate, to_char(enddate, $1) as formatEnddate, employee.lastname, remainingDays.remainingDays from project\n" +
                "inner join(\n" +
                "\tselect to_char((enddate - Now()), 'dd') as remainingDays, projectid from project ORDER BY createdat DESC, name DESC LIMIT 1\n" +
                ") as remainingDays\n" +
                "on project.projectid = remainingDays.projectid\n" +
                "join employee\n" +
                "on employee.employeeid = project.staff ORDER BY createdat DESC, name DESC LIMIT 1\n" +
                "\n", ['DD/MM/YYYY'])

            //res.json(results.rows);

            req.result = results.rows

            next()

        } catch (err) {
            console.error(err.message)
        }
    },
    projectDetails: async (req, res, next)=> {
        try {
            const results = await db.query("select project.*,to_char(startdate, $2) as formatStartdate, to_char(enddate, $2) as formatEnddate, employee.lastname, remainingDays.remainingDays from project\n" +
                "inner join(\n" +
                "\tselect to_char((enddate - Now()), 'dd') as remainingDays, projectid from project where projectid = $1\n" +
                ") as remainingDays\n" +
                "on project.projectid = remainingDays.projectid\n" +
                "join employee\n" +
                "on employee.employeeid = project.staff where project.projectid = $1\n" +
                "\n", [req.params.projectid, 'DD/MM/YYYY'])

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

                res.status(200).json(result.rows)
            }else{
                res.status(200).json("empty string")
            }

        }catch (err) {
            console.error(err.message)
        }
    },

    stafflist: async (req, res)=> {
        try{
            const activeTask = await db.query("SELECT * FROM employee WHERE departmentid = $1", [req.params.departmentid])
            res.json(activeTask.rows);
        }catch (err) {
            res.json(err)
        }
    },
    addTask: async (req, res)=> {

        try {
            const results = await db.query("INSERT INTO task(name, startdate, enddate, description,staff, projectid, departmentid, createdby) VALUES($1, $2,$3, $4,$5,$6,$7,$8) returning name ",
                [
                    req.body.name,
                    req.body.startDate,
                    req.body.endDate,
                    req.body.description,
                    req.body.staff,
                    req.params.projectid,
                    req.params.departmentid,
                    req.params.managerid
                ])
            res.json(results.rows[0]);

        } catch (err) {
            console.error(err.message)
        }
    },
    taskListStaff: async (req, res)=> {

        try {
            const results = await db.query("SELECT * from task WHERE staff = $1 ORDER BY createdat DESC, name ASC", [req.params.staffid])
            res.json(results.rows);

        } catch (err) {
            console.error(err.message)
        }
    },
    taskListStaffSearch: async (req, res)=> {

        try {
            const results = await db.query("SELECT * from task WHERE staff = $1 AND name like '%' || $1 || '%' ORDER BY createdat DESC, name ASC", [req.params.staffid, req.params.wordToSearch])
            res.json(results.rows);

        } catch (err) {
            console.error(err.message)
        }
    },
    taskDetails: async (req, res, next)=> {
        try {
            const results = await db.query("select task.*,to_char(startdate, $2) as formatStartdate, to_char(enddate, $2) as formatEnddate, to_char((enddate - Now()), 'dd') as remainingDays from task\n" +
                "where taskid = $1\n", [req.params.taskid, 'DD/MM/YYYY'])

           res.json(results.rows)

        } catch (err) {
            console.error(err.message)
        }
    },
    setCompleteTask: async (req, res) => {
        try{
            const result = await db.query("UPDATE task SET status = '1' where taskid = $1 RETURNING *", [req.params.taskid])
            res.status(200).json({editedProject : result.rows[0]})

        }catch (error){
            res.status(400).json(error.message)
        }
    },
    getTaskStatus : async(req, res) => {
        try{
            const result = await db.query("SELECT status from task where taskid = $1", [req.params.taskid])
            res.status(200).json(result.rows[0])

        }catch (error){
            res.status(400).json(error.message)
        }
    },
}