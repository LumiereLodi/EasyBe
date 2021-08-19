require("dotenv").config();
const express = require("express");
const db = require("./models/db")
const app = express();
const cors = require("cors")
const bcrypt = require('bcrypt')
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const {createTokens, validateToken,salesmanagerValidation} = require('./jwt')


const login = require("./routes/login")
const register = require("./routes/register")
const hr = require("./routes/hr")
const auth = require("./routes/auth")
const sales = require("./routes/sales")
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
//MIDDLEWARE TO GET DATA FROM THE BODY. IT CONVERTS THE DATA TO A JAVASCRIPT OBJECT.
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))


/**=====================================REGISTRATION AND LOGIN=================================**/


app.use("/sales", sales)
app.use("/register", register)

app.use("/hr", hr)
app.get("/userinformation/:userid", async (req, res) => {
    try{
        const user = await db.query("SELECT employeeid, " +
            "givennames, lastname, dateofbirth, email,address," +
            "contract, position, members.departmentid, department.departmentname  " +
            "from members " +
            "join department\n" +
            "on members.departmentid = department.departmentid where employeeid = $1", [req.params.userid]);
        res.status(200).json({
            user: user.rows[0]
        })
    }catch (error) {
        res.status(400).json({error: error})
    }
})

app.use("/login",login )

app.use("/authenticate", auth)

/**==========================================================================================**/
app.get("/admin/department/departmentlist", async (req, res) => {
    try {
        const result = await db.query("select * from department");
        await res.status(200).json({
            departmentList: result.rows
        })
    } catch (error) {
        res.status(400).json({
            error: "failed"
        })
    }
})



/*query for  active project*/
app.get("/dashboard/project/:status", async (req, res) => {
    try {

        const retrieve = await db.query("SELECT count(*) from project where status =  $1", [req.params.status])

        res.status(200).json(retrieve.rows[0])
    } catch (err) {
        res.status(400).json(err.message)
    }
})

/*query for backlog project*/
app.get("/dashboard/project/status/backlog", async (req, res) => {
    try {

        const retrieve = await db.query("SELECT count(*) from project where enddate > Now()")

        res.status(200).json(retrieve.rows[0])
    } catch (err) {
        res.status(400).json(err.message)
    }
})

app.get("/dashboard/overview/:departmentid", async(req, res)=> {
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
})

app.get("/customerlist",salesmanagerValidation, async (req, res)=>{

    try{
        const result = await db.query("SELECT customerid, name FROM customer ORDER BY createdat ASC")
        res.status(200).json(result.rows)
    }catch (err) {
        res.status(400).json(err.message)
    }
})

app.get("/employeelist/:departmentid", async(req, res)=>{

    //departmentid might variable
    try{
        const result = await db.query("SELECT employeeid, givennames, lastname FROM members WHERE departmentid = $1 AND position='Staff' ORDER BY createdat DESC", [req.params.departmentid])
        res.status(200).json(result.rows)
    }catch (e) {
        res.status(400).json(err.message)
    }
})
app.get("/logout", (req, res)=>{

        // clear cookie
        res.clearCookie('access-token');
        res.end()

})


app.post("/addcustomers/:managerid",salesmanagerValidation, async(req, res) => {

    try{
        const client = await db.query ("INSERT INTO \n" +
            "customer(customerid,name,\n" +
            "\t\t email, phone,contactpersonname,\n" +
            "\t\t postalcode, address, createdby)\n" +
            "VALUES (nextval('customer_sequence'),$1,$2,$3,$4,$5,$6,$7) RETURNING * ", [
            req.body.name,
            req.body.email,
            req.body.phone,
            req.body.contactPerson,
            req.body.postalCode,
            req.body.address,
            req.params.managerid
        ]);


        res.status(200).json(client.rows[0]);

    }catch(error){
        res.status(400).json(error)
    }
});

app.post("/addprojects/:managerid",salesmanagerValidation, async (req, res) => {

    try {
        const outcome = await db.query("INSERT INTO \n" +
            "project(projectid, name, customerid,\n" +
            "\t\t description,startdate,\n" +
            "\t\t enddate, staff,createdby)\n" +
            "VALUES(nextval('project_sequence'),$1,$2,$3,$4,$5,$6,$7) RETURNING *", [
            req.body.name,
            req.body.customer,
            req.body.description,
            req.body.startDate,
            req.body.endDate,
            req.body.staff,
            req.params.managerid
        ]);

        res.json(outcome.rows[0]);

    } catch (e) {
        console.log(e)
    }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server listening on port ${port}...`)
});
