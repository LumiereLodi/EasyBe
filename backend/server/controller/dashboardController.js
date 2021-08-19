const db = require("../models/db");

module.exports = {
    status: async(req, res)=> {
        try {

            const retrieve = await db.query("SELECT count(*) from project where status =  $1", [req.params.status])

            res.status(200).json(retrieve.rows[0])
        } catch (err) {
            res.status(400).json(err.message)
        }
    },
    backlog: async (req, res)=> {
        try {

            const retrieve = await db.query("SELECT count(*) from project where enddate > Now()")

            res.status(200).json(retrieve.rows[0])
        } catch (err) {
            res.status(400).json(err.message)
        }
    },

    overview: async(req, res)=> {
        try{
            const result = await db.query("select projects.projectid as projectid, projects.name,totalTasks.totalNumberTasks as Task, (Case when projects.enddate > Now() then 'Delayed' else 'on Track' end) as Status,\n" +
                "         completedTasks.TaskProgress * 100 / totalTasks.totalNumberTasks || '%' as progress from project as projects\n" +
                "         inner join(\n" +
                "           select project.projectid, count(task.taskid) as TaskProgress from task, team, project\n" +
                "         where project.projectid = team.projectid\n" +
                "         and team.teamid = task.teamid\n" +
                "\t\tand project.location = $1\n" +
                "         and task.taskStatus = 'completed'  group by task.teamid, project.projectid\n" +
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
                "\t\t ", [req.params.departmentid])

            res.status(200).json({data: result.rows})

        }catch (err) {
            res.status(400).json(err.message)
        }
    }
}