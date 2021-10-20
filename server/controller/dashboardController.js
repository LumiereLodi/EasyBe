const db = require("../models/db");

module.exports = {

    //PROJECT THAT HAS BEEN COMPLETED AND ACTIVE PROJECTS

    status: async(req, res)=> {
        try {

            const retrieve = await db.query("SELECT count(*) from project where status =  $1", [req.params.status])

            res.status(200).json(retrieve.rows[0])
        } catch (err) {
            res.status(400).json(err.message)
        }
    },

    //PROJECT THAT HAS A DATE EARLIER THAN TODAY IS BACKLOG
    backlog: async (req, res)=> {
        try {

            const retrieve = await db.query("SELECT count(*) from project where enddate < Now()")

            res.status(200).json(retrieve.rows[0])
        } catch (err) {
            res.status(400).json(err.message)
        }
    },

    //OVERVIEW OF PROJECTS AND TASKS WITHIN THE USER DEPARTMENT
    overview: async(req, res)=> {


        try{
            const result = await db.query("select projects.projectid as projectid, projects.name,totalTasks.totalNumberTasks as Task, (Case when projects.enddate > Now() then 'Delayed' else 'on Track' end) as Status,\n" +
                "         completedTasks.TaskProgress * 100 / totalTasks.totalNumberTasks || '%' as progress from project as projects\n" +
                "         inner join(\n" +
                "           select project.projectid, count(task.taskid) as TaskProgress from task, project\n" +
                "         where " +
                "         project.projectid = task.projectid and\n" +
                "         task.departmentid = $1\n" +
                "\t\tand project.location = $2\n" +
                "         and task.status = '2'  group by project.projectid\n" +
                "\n" +
                "         ) as completedTasks\n" +
                "         on projects.projectid = completedTasks.projectid\n" +
                "\n" +
                "         inner join(\n" +
                "           select project.projectid, count(task.taskid) as totalNumberTasks from task, project\n" +
                "         where " +
                "         project.projectid = task.projectid and\n" +
                "\t\t\t   project.location = $2\n" +
                "         and task.departmentid = $1 group by project.projectid\n" +
                "         ) as totalTasks\n" +
                "         on projects.projectid = totalTasks.projectid \n" +
                "\t\t \n" +
                "\t\t ", [req.params.departmentid,'1'])

            res.status(200).json({data: result.rows})

        }catch (err) {
            res.status(400).json(err.message)
        }
    },
    overviewAdmin: async(req, res)=> {

        console.log("inside hr overview")
        try{
            const result = await db.query("select projects.projectid as projectid, projects.name,totalTasks.totalNumberTasks as Task, (Case when projects.enddate > Now() then 'Delayed' else 'on Track' end) as Status,\n" +
                "         completedTasks.TaskProgress * 100 / totalTasks.totalNumberTasks || '%' as progress from project as projects\n" +
                "         inner join(\n" +
                "           select project.projectid, count(task.taskid) as TaskProgress from task, project\n" +
                "         where " +
                "         project.projectid = task.projectid\n" +
                "\t\t     and project.location = '1'\n" +
                "         and task.status = '2'  group by project.projectid\n" +
                "         ) as completedTasks\n" +
                "         on projects.projectid = completedTasks.projectid\n" +
                "\n" +
                "         inner join(\n" +
                "           select project.projectid, count(task.taskid) as totalNumberTasks from task, project\n" +
                "         where " +
                "         project.projectid = task.projectid and\n" +
                "\t\t\t   project.location = '1'\n" +
                "         group by project.projectid\n" +
                "         ) as totalTasks\n" +
                "         on projects.projectid = totalTasks.projectid ")

            console.log("check check " + result.rows)
            res.status(200).json({data: result.rows})

        }catch (err) {
            res.status(400).json(err.message)
        }
    }
}